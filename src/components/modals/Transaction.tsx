import { Save } from "@mui/icons-material"
import { Button, Checkbox, FormControl, IconButton, InputAdornment, InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, Stack, Switch, TextField, Typography } from "@mui/material"
import { useState } from "react"
import DateComponent from "../input/DateComponent"
import MoneyTextField from "../input/MoneyTextField"
import SetCreditorOrDebitor from "../input/SetCreditorOrDebitor"
import UserElement from "../design/UserElement"
import UserInteractionWrapper from "../UserInteractionWrapper"
import { TransactionAddDTO, User } from "../../types/types"

export const paymentMethods = [
    "Cash",
    "Bank Transfer",
    "PayPal",
    "Other",
]

type TransactionModalProps = {
    close: ()=>void,
    users: User[],
    input: (transaction: TransactionAddDTO) => void
}

type TransactionUser= {
    user: User,
    amount: number,
    wasEdited: boolean,
    isChecked: boolean
}

function Transaction({close, users, input}:TransactionModalProps) {

    const [whoPaid, setWhoPaid] = useState<string>(users[0].userId.toString())
    const [amount, setNewAmount] = useState<number>(0)
    const [paymentMethod, setPaymentMethod] = useState<string>("")
    const [purpose, setPurpose] = useState("")
    const [date, setDate] = useState(new Date())
    const [percentage, setPercentage] = useState(false)

    const [transactionUsers, setTransactionUsers] = useState<TransactionUser[]>(users.map(user => ({
        user,
        amount: 0,
        wasEdited: false,
        isChecked: true
    })))

    const checkInput = () => {
        return (
            amount > 0 
                && parseInt(paymentMethod)>=0
                && !!purpose
        )
    }
    
    const sendTransaction = () => {

        const userAmountList = new Map()
        for(const user of transactionUsers) {
            userAmountList.set(user.user.userId, user.amount * 100)
        }

        const transaction:TransactionAddDTO = {
            whoPaid: parseInt(whoPaid),
            amount: amount * 100,
            userAmountList: Object.fromEntries(userAmountList),
            date: date.toISOString(),
            groupId: -1,
            paymentMethod: paymentMethods[parseInt(paymentMethod)],
            purpose: purpose,
            repeatingInterval: -1
        }
        input(transaction);
        close();
    }

    /**
     * Toggles the checkbox for a specific user and redistributes their amount to all other users
     * 
     * @param user The user to toggle the checkbox for
     */
    const toggleCheckbox = (user: TransactionUser) => ():void => {
        setTransactionUsers(oldUsers => {

            //if user tries to disable the checkbox
            if(user.isChecked) {
                //if no other user is checked in, this users checkout is disabled because no money could be distributed
                const amountChecked = oldUsers.filter(u => u.isChecked && u !== user).length;
                if(amountChecked === 0) return oldUsers;
            }

            //user is now checked in
            if(!user.isChecked) {
                //list of users who are not yet edited to get money from to distribute equally
                const notEditedUsers = oldUsers.filter( u1 => (u1.isChecked && !u1.wasEdited) || u1 === user)
                
                //accumulate their amount
                let notEditedAmount = 0
                notEditedUsers.forEach(u1 => { notEditedAmount += u1.amount })

                //distribute this amount equally.
                //the last user gets the difference of the amount and accumulated value to prevent cents from being lost
                let acc = 0;
                notEditedUsers.forEach((u1, index) => {
                    const editAmount = index === (notEditedUsers.length - 1) ? 
                        notEditedAmount - acc 
                        :  
                        roundToIntTo2Decimals(notEditedAmount / notEditedUsers.length)
                    u1.amount = roundToIntTo2Decimals(editAmount)
                    acc += editAmount
                })
            } else { //user is now checked out
                
                //the amount of the user to now distribute
                const userAmount = user.amount

                //get list of not edited users to distribute to
                let notEditedUsers = oldUsers.filter( u1 => u1.isChecked && !u1.wasEdited && u1 !== user)

                //no not edited users -> distribute to everyone
                if(notEditedUsers.length === 0) {
                    notEditedUsers = oldUsers.filter(u1 => u1 !== user && u1.isChecked)
                }

                //give money to everyone in equal amounts
                //the last user gets the difference of the amount and accumulated value to prevent cents from being lost
                let acc = 0;
                for(let i = 0; i<notEditedUsers.length; i++) {
                    const notEditedUser = notEditedUsers[i]
                    //give everyone the same value. if is the last one, use the rest (difference between amount and accumulated amount)
                    let editAmount = (i===(notEditedUsers.length - 1 )) ? userAmount - acc : userAmount / notEditedUsers.length
                    editAmount = roundToIntTo2Decimals(editAmount)
                    acc += editAmount
                    notEditedUser.amount += editAmount
                    notEditedUser.amount = roundToIntTo2Decimals(notEditedUser.amount)
                }

                //remove amount from user who is now checked out, as they shouldn't have any money distributed to
                user.amount = 0
            }

            //toggle the checkbox
            user.isChecked = !user.isChecked

            //set new state
            //has to be converted to new object for react to aknowledge the change
            return JSON.parse(JSON.stringify(oldUsers))
        })
    }

   
    /**
     * Switches the input from or to percentage
     */
    const handleSwitchAmounPercentage = () => {
       setPercentage(!percentage)
    }

    /**
     * Parse to two decimals (no rounding, just cutting away)
     * @param input the number to cut
     * @returns the cut number
     */
    const parseToIntTo2Decimals = (input: number):number => {
        return parseInt((input*100).toString()) / 100
    }

    /**
     * Round to two decimals (mathematical rounding)
     * @param input the number to round
     * @returns the rounded number
     */
    const roundToIntTo2Decimals = (input: number):number => {
        return Math.round((input*100)) / 100
    }

    /**
     * Sets a new global amount and resets the users to equal amounts
     * @param newAmount The new amount for this transaction
     */
    const setAmount = (newAmount : number) => {

        //set user amounts
        setTransactionUsers(oldUsers => {

            //checked users
            const amountChecked = oldUsers.filter(u => u.isChecked).length;

            let acc = 0;
            return oldUsers.map((u, index) => {
                //amount to add to user
                //0 if user is not checked in
                let amountToAdd = u.isChecked ? parseToIntTo2Decimals(newAmount / amountChecked) : 0
                if(index === oldUsers.length - 1) {
                    //if is last user -> use difference between real amount and accumulated value
                    //-> lost cents are prevented
                    amountToAdd = parseToIntTo2Decimals(newAmount - acc)
                }
                //set user amount
                u.amount = amountToAdd
                acc += amountToAdd

                //reset edited flag for all users
                u.wasEdited = false
                return u
            })
        })

        //set global amount
        setNewAmount(newAmount)
    }

    /**
     * Set the amount for a specific user
     * @param user The user to set the amount for
     * @param newAmount The new amount for this specific user
     */
    const setInput = (user: TransactionUser, newAmount: number) => {
        setTransactionUsers(oldUsers => {
            //set amount between 0 and max amount
            newAmount = Math.max(0, Math.min(newAmount, amount))

            //the difference between the old and new amount
            const difference = roundToIntTo2Decimals(user.amount - newAmount)

            //get all users who are not yet edited
            let uneditedUsers = oldUsers.filter( u => !u.wasEdited && u.isChecked && u.user.userId!==user.user.userId)

            //get the amount of money these have
            const uneditedUsersAmount = sum(uneditedUsers.map(u => u.amount))

            //if there are no users or the amount is not enough to get the difference from 
            // -> use all users
            if(uneditedUsers.length === 0 || uneditedUsersAmount < -difference) {
                uneditedUsers = oldUsers.filter( u => u.user.userId!==user.user.userId)
            }

            let acc = 0
            //add or subtract amount from users
            //the last user gets the difference of the amount and accumulated value to prevent cents from being lost
            for(let i = 0; i<uneditedUsers.length; i++) {
                const u = uneditedUsers[i]
                let editAmount = (i === (uneditedUsers.length -1)) ? difference - acc : roundToIntTo2Decimals(difference / uneditedUsers.length)
                
                //if amount would be negative
                //-> stop at 0
                if(u.amount + editAmount < 0) {
                    editAmount = -u.amount
                }
                acc += editAmount
                u.amount += editAmount
                u.amount = roundToIntTo2Decimals(u.amount)
            }

            //if at some point a user did not have enough money left to account for the amount, there will be a difference between the real value and the accumulation
            if(acc !== difference) {

                //try every user to subtract this from
                const editAmount = roundToIntTo2Decimals(difference-acc)
                for(const loopUser of uneditedUsers) {
                    if(loopUser.amount+editAmount >= 0) {
                        loopUser.amount += editAmount;
                        loopUser.amount = roundToIntTo2Decimals(loopUser.amount)
                        break;
                    }
                }
            }

            //set the edited flag for this user and the new amount
            user.wasEdited = true
            user.amount = newAmount

            //set new state
            //has to be converted to new object for react to aknowledge the change
            return JSON.parse(JSON.stringify(oldUsers))
        })
    }

    /**
     * Calculates the sum of the given number array
     * @param arr Array consisting of the numbers to sum up
     * @returns the sum of the array
     */
    const sum = (arr: number[]) : number => {
        let accumulator = 0
        for(const number of arr) {
            accumulator += number
        }
        return accumulator;
    }


    return (
        <UserInteractionWrapper onClickAway={close} title="Transaction">
            <SetCreditorOrDebitor 
                label="Who paid" 
                who={whoPaid}
                users={users}
                onChange={(event)=>{
                    setWhoPaid(event.target.value as string)
                }} />
            <MoneyTextField
                amount={amount}
                setAmount={setAmount}/>
            <FormControl variant="standard">
                <InputLabel>Payment method</InputLabel>
                <Select 
                    label="Payment method" 
                    value={paymentMethod} 
                    onChange={(event)=>{
                        setPaymentMethod(event.target.value as string)
                    }}
                >
                    {
                        paymentMethods.map((e, i) => 
                        <MenuItem value={i} key={`pmmth.${i}`}>{e}</MenuItem>)
                    }
                </Select>
            </FormControl>
            <TextField 
                label="Purpose" 
                variant="standard"
                value={purpose}
                onInput={(event)=>{
                    const target = event.target as HTMLInputElement
                    setPurpose(target.value)
                }}
            />
            
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
                <Typography fontWeight="light" fontSize="small">partial amount</Typography>
                    <Switch size="small" onChange={handleSwitchAmounPercentage} color="default"/>
                <Typography fontWeight="light" fontSize="small">percentage</Typography>
            </Stack>
            <List sx={{ width: '100%' }}>
                {transactionUsers.map((user: TransactionUser) => {
                    const labelId = `checkbox-list-label-${user}`
                    const textfieldId = `textfield-${user}`

                    return (
                    <ListItem
                        key={user.user.userId}
                        secondaryAction={
                        <IconButton edge="end" aria-label="comments">
                        </IconButton>
                        }
                        disablePadding
                    >
                        <ListItemButton role={undefined} onClick={toggleCheckbox(user)} dense>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={user.isChecked}
                                    tabIndex={-1}
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            
                            <ListItemText id={labelId} 
                                primary={
                                    <UserElement {...user.user}/>
                                } 
                            />
                        </ListItemButton>
                        <TextField 
                                id={textfieldId}
                                type="number" 
                                label={percentage ? "percentage" : "partial amount"}
                                variant="standard"
                                value={roundToIntTo2Decimals(percentage ? (user.amount / amount)*100 : user.amount).toString()}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end" sx={{width:"10px"}}>{percentage ? "%" : "€"}</InputAdornment>,
                                }}
                                disabled={!user.isChecked}
                                onInput={(event)=>{

                                    const target = event.target as HTMLInputElement
                                    try {
                                        const input = target.value

                                        if(input.includes(".")) {
                                            if(input.length - input.indexOf(".") > 3) return;
                                        }

                                        if(input.includes(",")) {
                                            if(input.length - input.indexOf(",") > 3) return;
                                        }

                                        const inputAmount = parseFloat(input)

                                        if(isNaN(inputAmount)) {
                                            setInput(user, 0)
                                            return;
                                        }
                                        setInput(user, percentage ? ((inputAmount/100)*amount) : inputAmount)
                                        
                                    } catch (e) {
                                        setInput(user, 0)
                                    }
                                }}
                        />
                    </ListItem>
                    );
                })}
            </List>

            <DateComponent 
                label="Date of payment" 
                date={date}
                onChange={(newValue) => {
                    if(newValue == null) newValue = new Date();
                    setDate(newValue)
                }}/>
            <Button 
                startIcon={<Save/>} 
                variant="contained" 
                disabled={!checkInput()}
                onClick={sendTransaction}
            >
                Save
            </Button>
        </UserInteractionWrapper>
    )
}

export default Transaction
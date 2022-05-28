import React from 'react'
import { Save } from "@mui/icons-material";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import { Avatar, Box, Button, Checkbox, FormControl, IconButton, InputAdornment, InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Paper, Select, Stack, Switch, TextField, Typography } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from "react";
import { ModalBackdrop } from "./utils";
import { User } from './Types';

type TransactionModalProps = {
    close: ()=>void,
    users: User[]
}

const TransactionModal:React.FC<TransactionModalProps> = ({close, users}) => {
    return (
        <ModalBackdrop>
            <Transaction close={close} users={users}/>
        </ModalBackdrop>
    )
}
export default TransactionModal


type TransactionUser= {
    user: User,
    amount: number,
    wasEdited: boolean,
    isChecked: boolean
}


function Transaction({close, users}:TransactionModalProps) {

    const [whoPaid, setWhoPaid] = useState<string>("")
    const [amount, setNewAmount] = useState<number>(0)
    const [paymentMethod, setPaymentMethod] = useState<string>('')
    const [purpose, setPurpose] = useState("")
    const [date, setDate] = useState(new Date())
    const [percentage, setPercentage] = useState(false)

    const [transactionUsers, setTransactionUsers] = useState<TransactionUser[]>(users.map(user => ({
        user,
        amount: 0,
        wasEdited: false,
        isChecked: true
    })))

    /**
     * Toggles the checkbox for a specific user and redistributes their amount to all other users
     * 
     * @param user The user to toggle the checkbox for
     */
    const toggleCheckbox = (user: TransactionUser) => ():void => {
        setTransactionUsers((users):TransactionUser[] => {

            //if user tries to disable the checkbox
            if(user.isChecked) {
                //if no other user is checked in, this users checkout is disabled because no money could be distributed
                const amountChecked = users.filter(u => u.isChecked && u !== user).length;
                if(amountChecked === 0) return users;
            }

            //user is now checked in
            if(!user.isChecked) {
                //list of users who are not yet edited to get money from to distribute equally
                const notEditedUsers = users.filter( u1 => (u1.isChecked && !u1.wasEdited) || u1 === user)
                
                //accumulate their amount
                let amount = 0
                notEditedUsers.forEach(u1 => { amount += u1.amount })

                //distribute this amount equally.
                //the last user gets the difference of the amount and accumulated value to prevent cents from being lost
                let acc = 0;
                notEditedUsers.forEach((u1, index) => {
                    const editAmount = index === (notEditedUsers.length - 1) ? amount - acc :  roundToIntTo2Decimals(amount / notEditedUsers.length)
                    u1.amount = roundToIntTo2Decimals(editAmount)
                    acc += editAmount
                })
            } else { //user is now checked out
                
                //the amount of the user to now distribute
                let amount = user.amount

                //get list of not edited users to distribute to
                let notEditedUsers = users.filter( u1 => u1.isChecked && !u1.wasEdited && u1 !== user)

                //no not edited users -> distribute to everyone
                if(notEditedUsers.length === 0) {
                    notEditedUsers = users.filter(u1 => u1 !== user && u1.isChecked)
                }

                //give money to everyone in equal amounts
                //the last user gets the difference of the amount and accumulated value to prevent cents from being lost
                let acc = 0;
                for(let i = 0; i<notEditedUsers.length; i++) {
                    const notEditedUser = notEditedUsers[i]
                    //give everyone the same value. if is the last one, use the rest (difference between amount and accumulated amount)
                    let editAmount = (i===(notEditedUsers.length - 1 )) ? amount - acc : amount / notEditedUsers.length
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
            return JSON.parse(JSON.stringify(users))
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
        setTransactionUsers((users) => {

            //checked users
            const amountChecked = users.filter(u => u.isChecked).length;

            let acc = 0;
            return users.map((u, index) => {
                //amount to add to user
                //0 if user is not checked in
                let amount = u.isChecked ? parseToIntTo2Decimals(newAmount / amountChecked) : 0
                if(index === users.length - 1) {
                    //if is last user -> use difference between real amount and accumulated value
                    //-> lost cents are prevented
                    amount = parseToIntTo2Decimals(newAmount - acc)
                }
                //set user amount
                u.amount = amount
                acc += amount

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
        setTransactionUsers((users):TransactionUser[] => {
            //set amount between 0 and max amount
            newAmount = Math.max(0, Math.min(newAmount, amount))

            //the difference between the old and new amount
            const difference = roundToIntTo2Decimals(user.amount - newAmount)

            //get all users who are not yet edited
            let uneditedUsers = users.filter( u => !u.wasEdited && u.isChecked && u.user.userId!==user.user.userId)

            //get the amount of money these have
            let unediteusersAmount = sum(uneditedUsers.map(u => u.amount))

            //if there are no users or the amount is not enough to get the difference from 
            // -> use all users
            if(uneditedUsers.length === 0 || unediteusersAmount < -difference) {
                uneditedUsers = users.filter( u => u.user.userId!==user.user.userId)
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
                for(let i = 0; i < uneditedUsers.length; i++) {
                    if(uneditedUsers[i].amount+editAmount >= 0) {
                        uneditedUsers[i].amount += editAmount;
                        uneditedUsers[i].amount = roundToIntTo2Decimals(uneditedUsers[i].amount)
                        break;
                    }
                }
            }

            //set the edited flag for this user and the new amount
            user.wasEdited = true
            user.amount = newAmount

            //set new state
            //has to be converted to new object for react to aknowledge the change
            return JSON.parse(JSON.stringify(users))
        })
    }

    /**
     * Calculates the sum of the given number array
     * @param arr Array consisting of the numbers to sum up
     * @returns the sum of the array
     */
    const sum = (arr: number[]) : number => {
        let amount = 0
        for(const number of arr) {
            amount += number
        }
        return amount;
    }


    return (
        <ClickAwayListener 
            onClickAway={close}
            mouseEvent="onMouseDown"
            touchEvent="onTouchStart"
        >
            <Paper sx={{padding: "2em", width: "700px", maxWidth: "100%", overflow: "auto", maxHeight: "100vh"}}>
                
                <Typography variant="h5">Transaction</Typography>
                <FormControl sx={{width: "100%"}}>
                    <form>
                        <Stack direction="column" spacing={2}>
                            <FormControl variant="standard">
                                <InputLabel>Who paid</InputLabel>
                                <Select 
                                    label="Who paid" 
                                    value={whoPaid} 
                                    onChange={(event)=>{
                                        setWhoPaid(event.target.value as string)
                                    }}
                                >
                                    {users.map(e=>(
                                        <MenuItem 
                                            value={e.userId}
                                            key={e.userId}
                                        >
                                            <UserElement {...e}/>
                                        </MenuItem>
                                    ))}
                                    
                                </Select>
                            </FormControl>
                            <TextField 
                                type="number" 
                                label="Amount" 
                                variant="standard"
                                value={amount.toString()}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">€</InputAdornment>,
                                }}
                                onInput={(event)=>{
                                    const target = event.target as HTMLInputElement
                                    try {
                                        const input = target.value
                                        const amount = parseFloat(input)
                                        if(((amount * 100 ) % 1) > 0) return;
                                        if(isNaN(amount)) setAmount(0)
                                        else setAmount(amount)
                                    } catch (e) {
                                        setAmount(0)
                                    }
                                }}
                            />
                            <FormControl variant="standard">
                                <InputLabel>Payment method</InputLabel>
                                <Select 
                                    label="Payment method" 
                                    value={paymentMethod} 
                                    onChange={(event)=>{
                                        setPaymentMethod(event.target.value as string)
                                    }}
                                >
                                    <MenuItem value={0}>lorem</MenuItem>
                                    <MenuItem value={1}>ipsum</MenuItem>
                                    <MenuItem value={2}>solor</MenuItem>
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
 
                            
                            <DatePicker
                                maxDate={new Date()}
                                minDate={new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 30))}
                                value={date}
                                renderInput={(params) => <TextField {...params}/>}
                                onChange={(newValue:(Date | null))=>{
                                    if(newValue == null) newValue = new Date();
                                    setDate(newValue)
                                }}
                                label="Date of payment"
                                mask={"__.__.____"}
                                views={['day']}
                            />
                            <Button startIcon={<Save/>} variant="contained" disabled={amount===0}>Save</Button>
                        </Stack>
                    </form>
                </FormControl>
            </Paper>
        </ClickAwayListener>
    )
}

function UserElement({avatarUrl, username}:User) {
    return (
        <Box>
            <Stack direction="row" spacing={2}>
                <Avatar alt={username} src={avatarUrl ?? undefined}>{!avatarUrl && username[0]}</Avatar>
                <Typography sx={{display: "flex", alignItems: "center"}}>{username}</Typography>
            </Stack>
        </Box>
    )
}
import React from 'react'
import { Save } from "@mui/icons-material";
import ClickAwayListener from "@mui/core/ClickAwayListener";
import { Avatar, Button, Checkbox, FormControl, IconButton, InputAdornment, InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Paper, Select, Stack, Switch, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DatePicker } from '@mui/lab';
import { useState } from "react";
import { ModalBackdrop } from "./utils";

const demoAvatar = "https://upload.wikimedia.org/wikipedia/commons/8/8e/Hauskatze_langhaar.jpg"

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


export const users:User[] = [
    {
        "username": "user-1",
        "id": 1,
        "avatar_url": demoAvatar
    }, {
        "username": "user-2",
        "id": 2,
        "avatar_url": demoAvatar
    }, {
        "username": "user-3",
        "id": 3,
        "avatar_url": undefined
    }, 
]


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
     * Amount und wasEdited wird bei jedem Wechsel partial/percentage zurückgesetzt
     * [
     *  {
     *      "user": {
     *          ...
     *      },
     *      "amount": <amount>,
     *      "wasEdited": <boolean>,
     *      "isChecked": <boolean>
     *  }
     * ]
     */

    const toggleCheckbox = (user: TransactionUser) => () => {
        setTransactionUsers((users):TransactionUser[] => {

            if(user.isChecked) {
                const amountChecked = users.filter(u => u.isChecked && u !== user).length;
                if(amountChecked === 0) return users;
            }

            if(!user.isChecked) {
                //user is now checked in
                let amount = 0
                let acc = 0;
                const notEditedUsers = users.filter( u1 => (u1.isChecked && !u1.wasEdited) || u1 === user)
                notEditedUsers.forEach(u1 => { amount += u1.amount })
                notEditedUsers.forEach((u1, index) => {
                    const editAmount = index === (notEditedUsers.length - 1) ? amount - acc :  roundToIntTo2Decimals(amount / notEditedUsers.length)
                    u1.amount = roundToIntTo2Decimals(editAmount)
                    acc += editAmount
                })
            } else {
                //user is now checked out
                let amount = user.amount
                let notEditedUsers = users.filter( u1 => u1.isChecked && !u1.wasEdited && u1 !== user)
                if(notEditedUsers.length === 0) {
                    notEditedUsers = users.filter(u1 => u1 !== user && u1.isChecked)
                }
                let acc = 0;
                for(let i = 0; i<notEditedUsers.length; i++) {
                    const notEditedUser = notEditedUsers[i]
                    let editAmount = (i===(notEditedUsers.length - 1 )) ? amount - acc : amount / notEditedUsers.length
                    editAmount = roundToIntTo2Decimals(editAmount)
                    acc += editAmount
                    notEditedUser.amount += editAmount
                    notEditedUser.amount = roundToIntTo2Decimals(notEditedUser.amount)
                }
                user.amount = 0
            }

            user.isChecked = !user.isChecked

            return JSON.parse(JSON.stringify(users))
        })
    }

   
    const handleSwitchAmounPercentage = () => {
       setPercentage(!percentage)
    }

    const parseToIntTo2Decimals = (input: number):number => {
        return parseInt((input*100).toString()) / 100
    }

    const roundToIntTo2Decimals = (input: number):number => {
        return Math.round((input*100)) / 100
    }

    const setAmount = (newAmount : number) => {

        const amountChecked = transactionUsers.filter(u => u.isChecked).length;

        setTransactionUsers((users) => {
            let acc:number = 0;
            return users.map((u, index) => {
                let amount = parseToIntTo2Decimals(newAmount / amountChecked)
                if(index === users.length - 1) {
                    amount = parseToIntTo2Decimals(newAmount - acc)
                }
                u.amount = u.isChecked ? amount : 0
                if(u.isChecked) {
                    acc += amount
                }
                u.wasEdited = false
                return u
            })
        })
        setNewAmount(newAmount)
    }

    const setInput = (user: TransactionUser, newAmount: number) => {
        setTransactionUsers((users):TransactionUser[] => {
            newAmount = Math.max(0, Math.min(newAmount, amount))

            const difference = roundToIntTo2Decimals(user.amount - newAmount)

            let uneditedUsers = users.filter( u => !u.wasEdited && u.isChecked && u.user.id!==user.user.id)
            let unediteusersAmount = sum(uneditedUsers.map(u => u.amount))

            if(uneditedUsers.length === 0 || unediteusersAmount < -difference) {
                uneditedUsers = users.filter( u => u.user.id!==user.user.id)
            }

            let acc = 0
            for(let i = 0; i<uneditedUsers.length; i++) {
                const u = uneditedUsers[i]
                let editAmount = (i === (uneditedUsers.length -1)) ? difference - acc : roundToIntTo2Decimals(difference / uneditedUsers.length)
                if(u.amount + editAmount < 0) {
                    editAmount = -u.amount
                }
                acc += editAmount
                u.amount += editAmount
                u.amount = roundToIntTo2Decimals(u.amount)
            }
            if(acc !== difference) {
                const editAmount = roundToIntTo2Decimals(difference-acc)
                for(let i = 0; i < uneditedUsers.length; i++) {
                    if(uneditedUsers[i].amount+editAmount >= 0) {
                        uneditedUsers[i].amount += editAmount;
                        uneditedUsers[i].amount = roundToIntTo2Decimals(uneditedUsers[i].amount)
                        break;
                    }
                }
            }


            user.wasEdited = true
            user.amount = newAmount

            return JSON.parse(JSON.stringify(users))


            //get amount added or subtracted
            //get number of unedited amounts
            //>0
                //divide on this number
            //divide on all
        })
    }

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
                                            value={e.id}
                                            key={e.id}
                                        >
                                            <UserElement username={e.username} avatar_url={e.avatar_url} id={e.id}/>
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
                                    } catch (e) {}
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
                                        key={user.user.id}
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
                                                    <UserElement username={user.user.username} avatar_url={user.user.avatar_url} id={user.user.id}/>
                                                } 
                                            />
                                        </ListItemButton>
                                        <TextField 
                                                id={textfieldId}
                                                type="number" 
                                                label={percentage ? "percentage" : "partial amount"}
                                                variant="standard"
                                                value={(percentage ? (user.amount / amount)*100 : user.amount).toString()}
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
                                                        
                                                    } catch (e) {}
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
                                label="Time of payment"
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

type User = {
    username: string,
    avatar_url?: string,
    id: number
}
function UserElement({avatar_url, username}:User) {
    return (
        <Box>
            <Stack direction="row" spacing={2}>
                <Avatar alt={username} src={avatar_url}>{!avatar_url && username[0]}</Avatar>
                <Typography sx={{display: "flex", alignItems: "center"}}>{username}</Typography>
            </Stack>
        </Box>
    )
}
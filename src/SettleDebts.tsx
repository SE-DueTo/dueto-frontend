import { Save } from "@mui/icons-material";
import { Avatar, Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ModalBackdrop } from "./utils";
import { useState } from "react";
import { User } from "./Types";
import DateComponent from "./components/DateComponent";
import UserInteractionWrapper from "./components/UserInteractionWrapper";

type SettleDebtsModalProps = {
    close: ()=>void,
    users: User[]
}
export default function SetleDebtsModal(props:SettleDebtsModalProps) {
    return (
        <ModalBackdrop>
            <SettleDebts {...props}/>
        </ModalBackdrop>
    )
}

function SettleDebts({close, users}:SettleDebtsModalProps) {

    const [whoSettleDebt, setWhoSettleDebt] = useState<string>("")
    const [amount, setAmount] = useState<number>(0)
    const [paymentMethod, setPaymentMethod] = useState<string>('')
    const [whoReceived, setWhoReceived] = useState<string>("")
    const [date, setDate] = useState(new Date())

    return (
        <UserInteractionWrapper onClickAway={close} title={"Settle Debts"}>
            <FormControl variant="standard">
                <InputLabel>Who gave</InputLabel>
                <Select 
                    label="Who gave" 
                    value={whoSettleDebt} 
                    onChange={(event)=>{
                        setWhoSettleDebt(event.target.value as string)
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
                <InputLabel>Who received</InputLabel>
                <Select 
                    label="Who received" 
                    value={whoReceived} 
                    onChange={(event)=>{
                        setWhoReceived(event.target.value as string)
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

            <DateComponent 
                label="Date of payment" 
                date={date}
                onChange={(newValue) => {
                    if(newValue == null) newValue = new Date();
                    setDate(newValue)
                }}/>
            <Button startIcon={<Save/>} variant="contained">Save</Button>
        </UserInteractionWrapper>
    )
}

function UserElement({avatarUrl, username}:User) {
    return (
        <Box>
            <Stack direction="row" spacing={2}>
                <Avatar alt={username} src={avatarUrl ?? undefined}>{username[0]}</Avatar>
                <Typography sx={{display: "flex", alignItems: "center"}}>{username}</Typography>
            </Stack>
        </Box>
    )
}
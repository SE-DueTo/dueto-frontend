import { Save } from "@mui/icons-material";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import { Avatar, Button, FormControl, InputAdornment, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ModalBackdrop } from "./utils";
import { useState } from "react";
import { User } from "./Types";

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
        <ClickAwayListener 
            onClickAway={close}
            mouseEvent="onMouseDown"
            touchEvent="onTouchStart"
        >
            <Paper sx={{padding: "2em", width: "700px", maxWidth: "100%", overflow: "auto", maxHeight: "100vh"}}>
                <Typography variant="h5">Settle Debts</Typography>
                <FormControl sx={{width: "100%"}}>
                    <form>
                        <Stack direction="column" spacing={2}>
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
                                    } catch (e) {}
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

                            <DatePicker
                                maxDate={new Date()}
                                minDate={new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 30))}
                                value={date}
                                renderInput={(params) => <TextField {...params}/>}
                                onChange={(newValue:(Date | null))=>{
                                    if(newValue == null) newValue = new Date();
                                    setDate(newValue)
                                }}
                                label="Date of settle debt"
                                mask={"__.__.____"}
                                views={['day']}
                            />
                            <Button startIcon={<Save/>} variant="contained">Save</Button>
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
                <Avatar alt={username} src={avatarUrl ?? undefined}>{username[0]}</Avatar>
                <Typography sx={{display: "flex", alignItems: "center"}}>{username}</Typography>
            </Stack>
        </Box>
    )
}
import { Save } from "@mui/icons-material";
import { Avatar, Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DatePicker } from '@mui/lab';
import { useState } from "react";
import { ModalBackdrop } from "./utils";

const demoAvatar = "https://upload.wikimedia.org/wikipedia/commons/8/8e/Hauskatze_langhaar.jpg"

export default function TransactionModal() {
    return (
        <ModalBackdrop>
            <Transaction/>
        </ModalBackdrop>
    )
}

const users:User[] = [
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


function Transaction() {

    const [whoPaid, setWhoPaid] = useState<string>("")
    const [amount, setAmount] = useState<string>("0")
    const [paymentMethod, setPaymentMethod] = useState<string>('')
    const [purpose, setPurpose] = useState("")
    const [date, setDate] = useState(new Date())

    return (
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
                            value={amount}
                            onInput={(event)=>{
                                const target = event.target as HTMLInputElement
                                try {
                                    const input = target.value
                                    const amount = parseFloat(input)
                                    if(((amount * 100 ) % 1) > 0) return;
                                    if(isNaN(amount)) setAmount("")
                                    else setAmount(input)
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
                        
                        {/*TODO AUFTEILUNG*/}

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
                        <Button startIcon={<Save/>} variant="contained">Save</Button>
                    </Stack>
                </form>
            </FormControl>
        </Paper>
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
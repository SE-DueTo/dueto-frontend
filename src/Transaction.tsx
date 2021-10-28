import { Save } from "@mui/icons-material";
import { Avatar, Backdrop, Button, FormControl, InputLabel, MenuItem, Modal, Paper, Select, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DatePicker } from '@mui/lab';
import { useState } from "react";

const demoAvatar = "https://upload.wikimedia.org/wikipedia/commons/8/8e/Hauskatze_langhaar.jpg"

export default function TransactionModal() {
    return (
        <Backdrop open={true} >
            <Modal open={true} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Transaction/>
            </Modal>
        </Backdrop>
    )
}

function Transaction() {

    const [date, setDate] = useState(new Date())

    return (
        <Paper sx={{padding: "2em", width: "700px", maxWidth: "100%", overflow: "auto", maxHeight: "100vh"}}>
            <Typography variant="h5">Transaction</Typography>
            <FormControl sx={{width: "100%"}}>
                <form>
                    <Stack direction="column" spacing={2}>
                        <FormControl variant="standard">
                            <InputLabel>Who paid</InputLabel>
                            <Select label="Who paid">
                                <MenuItem value={0}><User username="Test" avatar_url={demoAvatar} id={198847398}/></MenuItem>
                            </Select>
                        </FormControl>
                        <TextField type="number" label="Amount" variant="standard"/>
                        <FormControl variant="standard">
                            <InputLabel>Payment method</InputLabel>
                            <Select label="Payment method">
                                <MenuItem value={0}>lorem</MenuItem>
                                <MenuItem value={0}>ipsum</MenuItem>
                                <MenuItem value={0}>solor</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField label="Purpose" variant="standard"/>
                        
                        //AUFTEILUNG

                        <DatePicker
                            maxDate={new Date()}
                            value={date}
                            renderInput={(params) => <TextField {...params}/>}
                            onChange={(newValue:(Date | null))=>{
                                if(newValue == null) newValue = new Date();
                                setDate(newValue)
                            }}
                            label="Time of payment"
                            mask={"__.__.____"}
                            views={['day', 'month', 'year']}
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
    avatar_url: string,
    id: number
}
function User({avatar_url, username}:User) {
    return (
        <Box>
            <Stack direction="row" spacing={2}>
                <Avatar alt={username} src={avatar_url}/>
                <Typography sx={{display: "flex", alignItems: "center"}}>username</Typography>
            </Stack>
        </Box>
    )
}
import { Add } from "@mui/icons-material";
import {  Button, Divider,  FormControl,  Paper,  Stack,  TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { GroupUserdataContext } from "./contexts";
import { ModalBackdrop } from "./utils";
import ClickAwayListener from "@mui/base/ClickAwayListener";

export default function UserDashboard() {

    const [isSearchOpen, setSearchOpen] = useState(false)
    const groupUserdata = useContext(GroupUserdataContext)

    return (
        <Box sx={{textAlign: "center"}}>
            <Typography variant="h5">Hallo {groupUserdata.user?.username}</Typography>
            <Typography variant="h2">0€</Typography>
            <Box sx={{marginTop: "10px"}}>
                <Button 
                    variant="outlined" 
                    startIcon={<Add />} 
                    onClick={()=>{setSearchOpen(true)}}
                >
                    New Transaction
                </Button>
                {isSearchOpen && <SearchUserPopup setSearchOpen={setSearchOpen}/>}
            </Box>
            <Divider sx={{margin: "20px 0px"}}/>
            <Box>
            liste mit transationen und settle depths
            </Box>
            

            Hier kommt dann die Tabelle hin
        </Box>
    )
}

type SearchUserPopupProps = {
    setSearchOpen: React.Dispatch<React.SetStateAction<boolean>>
}
function SearchUserPopup({setSearchOpen}:SearchUserPopupProps) {

    const handleClose = ()=>{
        setSearchOpen(false)
    }

    return (
        <ModalBackdrop>
            <ClickAwayListener
                onClickAway={handleClose}
                mouseEvent="onMouseDown"
                touchEvent="onTouchStart"
            >
                <Paper sx={{padding: "2em", width: "700px", maxWidth: "100%", overflow: "auto", maxHeight: "100vh"}}>
                <Typography variant="h5">Search User</Typography>
                    <FormControl sx={{width: "100%"}}>
                        <form>
                            <Stack spacing={2}>
                                <TextField label="Username" variant="standard"/>
                                <Button variant="contained" sx={{width: "100%"}}>New Transaction</Button>
                            </Stack>
                        </form>
                    </FormControl>
                </Paper>
            </ClickAwayListener>
        </ModalBackdrop>
    )
}
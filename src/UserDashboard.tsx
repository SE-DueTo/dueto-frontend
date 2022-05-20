import { Add } from "@mui/icons-material";
import { Button, Divider,  FormControl,  Paper,  Stack,  TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { ModalBackdrop } from "./utils";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import TransactionModal from "./Transaction";
import TransactionTable from "./TransactionTable";
import { DashboardDataContext } from "./context/DashboardDataProvider";

export default function UserDashboard() {

    const [isSearchOpen, setSearchOpen] = useState(false)
    const groupUserdata = useContext(DashboardDataContext)

    return (
        <Box sx={{textAlign: "center", mt: "20px"}}>
            <Typography variant="h5">Hallo {groupUserdata.user?.username}</Typography>
            <Typography variant="h2">{groupUserdata.balance}€</Typography>
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
            <Box sx={{margin: '1em'}}>
                <Typography variant="h6" sx={{textAlign: "left", marginBottom: '1em'}}>Your Transactions:</Typography>
                <TransactionTable></TransactionTable>
            </Box>
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

    
    //TODO remove this code when functional elements are build
    const [isTransactionShown, setTransactionShown] = useState(false)

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
                                <Button variant="contained" sx={{width: "100%"}} onClick={()=>{setTransactionShown(true)}}>New Transaction</Button>
                                {isTransactionShown && <TransactionModal close={() => {setTransactionShown(false); } } users={[]}/>}
                            </Stack>
                        </form>
                    </FormControl>
                </Paper>
            </ClickAwayListener>
        </ModalBackdrop>
    )
}
import { ClickAwayListener } from "@mui/base"
import { Button, FormControl, Paper, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"
import ModalBackdrop from "./ModalBackdrop"
import TransactionModal from "./TransactionModal"

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

export default SearchUserPopup
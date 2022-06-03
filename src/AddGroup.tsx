import React from "react";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import { Button ,Paper, FormControl, Stack, TextField, Typography } from "@mui/material";
import ModalBackdrop from "./ModalBackdrop";

type AddGroupProps = {
    setAddGroupShown: React.Dispatch<React.SetStateAction<boolean>>
}
function AddGroup({setAddGroupShown}:AddGroupProps) {

    const handleClose = ()=>{
        setAddGroupShown(false)
    }

    return (
        <ModalBackdrop>
            <ClickAwayListener onClickAway={handleClose}>
                <Paper sx={{padding: "2em", width: "700px", maxWidth: "100%", overflow: "auto", maxHeight: "100vh"}}>
                    <Typography variant="h5">New Group</Typography>
                    <FormControl sx={{width: "100%"}}>
                        <form>
                            <Stack spacing={2}>
                                <TextField label="Group name" variant="standard"/>
                                <Button variant="contained" sx={{width: "100%"}}>Create</Button>
                            </Stack>
                        </form>
                    </FormControl>
                </Paper>
            </ClickAwayListener>
        </ModalBackdrop>
    )
}

export default AddGroup
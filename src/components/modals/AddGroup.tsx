import React from "react";
import { Button, TextField } from "@mui/material";
import UserInteractionWrapper from "../UserInteractionWrapper";

type AddGroupProps = {
    setAddGroupShown: React.Dispatch<React.SetStateAction<boolean>>
}
function AddGroup({setAddGroupShown}:AddGroupProps) {

    const handleClose = ()=>{
        setAddGroupShown(false)
    }

    return (
        <UserInteractionWrapper 
            onClickAway={handleClose}
            title="New Group"
        >
            <TextField label="Group name" variant="standard"/>
            <Button variant="contained" sx={{width: "100%"}}>Create</Button>
        </UserInteractionWrapper>
    )
}

export default AddGroup
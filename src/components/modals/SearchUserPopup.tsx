import { Button, TextField } from "@mui/material"
import { useState } from "react"
import Transaction from "./Transaction"
import UserInteractionWrapper from "../UserInteractionWrapper"

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
        <UserInteractionWrapper
            onClickAway={handleClose}
            title="Search User"
        >
            <TextField label="Username" variant="standard"/>
            <Button variant="contained" sx={{width: "100%"}} onClick={()=>{setTransactionShown(true)}}>New Transaction</Button>
            {isTransactionShown && <Transaction close={() => {setTransactionShown(false); } } users={[]}/>}
        </UserInteractionWrapper>
    )
}

export default SearchUserPopup
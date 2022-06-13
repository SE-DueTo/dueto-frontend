import { Autocomplete, Button, TextField } from "@mui/material"
import React, { useContext, useState } from "react"
import UserInteractionWrapper from "../UserInteractionWrapper"
import UserElement from "../design/UserElement"
import { defaultUser, User } from "../../types/types"
import { UserInterfaceContext } from "../../context/UserInterfaceProvider"
import { DashboardDataContext } from "../../context/DashboardDataProvider"

type SearchUserPopupProps = {
    setSearchOpen: React.Dispatch<React.SetStateAction<boolean>>
    setUser: (user: User) => void
}
function SearchUserPopup({setSearchOpen, setUser}:SearchUserPopupProps) {

    const handleClose = ()=>{
        setSearchOpen(false)
    }

    const { getUsers } = useContext(UserInterfaceContext)

    let lastTyped = 0
    const [loading, setLoading] = useState(true)
    const searchUsers = async (query: string) => {
        const now = new Date().getTime()
        lastTyped = now
        setTimeout(async () => {
            if(lastTyped === now) {
                setLoading(true)
                const users = (await getUsers(query, 10)).filter(e => e.userId !== user.userId)
                setUsers(users)
                setLoading(false)
            }
        }, 500)
    }

    const [selected, setSelected] = useState<User|null>(null);

    const [users, setUsers] = useState<User[]>([])
    const user = useContext(DashboardDataContext).user || defaultUser

    return (
        <UserInteractionWrapper
            onClickAway={handleClose}
            title="Search User"
        >
            <Autocomplete
                renderInput={(params) => 
                    <TextField {...params} label="Username" variant="standard" onChange={(e)=>{searchUsers(e.target.value)}}/>
                }
                options={users}
                renderOption={(props, option) => <li {...props}> <UserElement {...option} /></li>}
                getOptionLabel={(option)=>option.username}
                onChange={(_, newValue) => {
                    setSelected(newValue);
                }}
                loading={loading}
            />
            <Button 
                variant="contained" 
                sx={{width: "100%"}} 
                onClick={()=>{
                    if(!selected) return
                    setSearchOpen(false)
                    setUser(selected)
                }}
            >
                New Transaction
            </Button>
        </UserInteractionWrapper>
    )
}

export default SearchUserPopup
import { AddCircleOutline } from "@mui/icons-material";
import { Avatar, Box, Button, CircularProgress, Divider, FormControl, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Paper, Stack, TextField, Typography } from "@mui/material"
import React, { useContext, useEffect, useState } from "react";
import { ModalBackdrop } from "./utils";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import { Link, useLocation } from "react-router-dom";
import { DashboardDataContext } from "./context/DashboardDataProvider";

function OverviewElement() {

    const [isAddGroupShown, setAddGroupShown] = useState(false)
    const [url, setUrl] = useState("")
    const groupUserdata = useContext(DashboardDataContext)
    const location = useLocation()

    useEffect(()=>{
        setUrl(location.pathname.substring(location.pathname.lastIndexOf("/")+1))
    }, [location])

    const peopleElements = groupUserdata.groups?.filter(e=>e.groupType==="SPONTANEOUS").map((e, index)=>{

        const otherUser = e.users.filter(user => user.userId !== groupUserdata.user?.userId)[0]

        return (
            <Link to={`/group/${e.groupId}`} key={`pe.${index}`}>
                <ListItemButton key={index} selected={url===`${e.groupId}`}>
                    <ListItemIcon>
                        <Avatar src={otherUser.avatarUrl ?? undefined}>{otherUser.username[0]}</Avatar>
                    </ListItemIcon>
                    <ListItemText primary={otherUser.username} />
                </ListItemButton>
            </Link>
        )
    })

    const groupElements = groupUserdata.groups?.filter(e=>e.groupType==="NORMAL").map((e, index)=>(
        <Link to={`/group/${e.groupId}`} key={`ge.${index}`}>
            <ListItemButton key={index} selected={url===`${e.groupId}`}>
                <ListItemIcon>
                    <Avatar>{e.groupName[0]}</Avatar>
                </ListItemIcon>
                <ListItemText primary={e.groupName} />
            </ListItemButton>
        </Link>
    ))

    const list = (
        <List sx={{padding: 0}}>
            <List
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        You
                    </ListSubheader>
                }
                sx={{'& a': {
                    color: "text.primary",
                    textDecoration: "none"
                }}}
            >
                <Link to="/dashboard">
                    <ListItemButton selected={url==="dashboard"}>
                        <ListItemIcon>
                            <Avatar src={groupUserdata.user?.avatarUrl ?? undefined}>{groupUserdata.user?.username[0]}</Avatar>
                        </ListItemIcon>
                        <ListItemText primary={groupUserdata.user?.username ?? "Loading..."} />
                    </ListItemButton>
                </Link>
            </List>
            <Divider/>
            <List
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        People
                    </ListSubheader>
                }
                sx={{'& a': {
                    color: "text.primary",
                    textDecoration: "none"
                }}}
            >
                {
                    (peopleElements || []).length > 0 ? peopleElements : <Typography sx={{p: 2}}>None</Typography>
                }
            </List>
            <List
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Your Groups
                    </ListSubheader>
                }
                sx={{'& a': {
                    color: "text.primary",
                    textDecoration: "none"
                }}}
            >
                {
                    (groupElements || []).length > 0 ?  groupElements :<Typography sx={{p: 2}}>None</Typography>
                }
                <Button 
                    variant="outlined" 
                    endIcon={<AddCircleOutline />}
                    sx={{width: "calc( 100% - 20px )", margin: "10px"}} 
                    onClick={()=>{setAddGroupShown(true)}}
                >
                    New Group
                </Button>
                
                {isAddGroupShown && <AddGroup setAddGroupShown={setAddGroupShown}/>}
            </List>
        </List>
    )

    return (

        

        <Paper 
            sx={{
                borderRight: "1px solid rgba(255, 255, 255, 0.12)",
                maxWidth: "300px",
                minWidth: "200px",
                '& span': {
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    maxWidth: "100%"
                }
            }}
        >
            { groupUserdata.groups !== null ? 
                list
                : 
                <Box sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                }}>
                    <CircularProgress />
                </Box> 
            }
        </Paper>
    )
}

export default OverviewElement

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
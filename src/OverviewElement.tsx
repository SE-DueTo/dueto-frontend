import { AddCircleOutline } from "@mui/icons-material";
import { Avatar, Button, Divider, FormControl, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Paper, Stack, TextField, Typography } from "@mui/material"
import React, { useContext, useEffect, useState } from "react";
import { GroupType } from "./Types";
import { ModalBackdrop } from "./utils";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { GroupUserdataContext } from "./contexts";

type OverviewProps = {
}
const OverviewElement:React.FC<OverviewProps> = () => {

    const [isAddGroupShown, setAddGroupShown] = useState(false)
    const theme:any = useTheme()
    const [url, setUrl] = useState("")
    //const url = window.location.pathname.substring(window.location.pathname.lastIndexOf("/")+1);
    const groupUserdata = useContext(GroupUserdataContext)
    const location = useLocation()

    useEffect(()=>{
        setUrl(location.pathname.substring(location.pathname.lastIndexOf("/")+1))
    }, [location])

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
                <List sx={{padding: 0}}>
                    <List
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                You
                            </ListSubheader>
                        }
                        sx={{'& a': {
                            color: theme.palette.text.primary,
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
                            color: theme.palette.text.primary,
                            textDecoration: "none"
                        }}}
                    >
                        {
                            groupUserdata.groups.filter(e=>e.type===GroupType.SPONTANEOUS).map((e, index)=>{

                                const otherUser = e.users.filter(e => e.userId !== groupUserdata.user?.userId)[0]

                                return (
                                    <Link to={`/group/${e.groupId}`}>
                                        <ListItemButton key={index} selected={url===`${e.groupId}`}>
                                            <ListItemIcon>
                                                <Avatar src={otherUser.avatarUrl ?? undefined}>{otherUser.username[0]}</Avatar>
                                            </ListItemIcon>
                                            <ListItemText primary={otherUser.username} />
                                        </ListItemButton>
                                    </Link>
                                )
                            })
                        }
                    </List>
                    <List
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Your Groups
                            </ListSubheader>
                        }
                        sx={{'& a': {
                            color: theme.palette.text.primary,
                            textDecoration: "none"
                        }}}
                    >
                        {
                            groupUserdata.groups.filter(e=>e.type===GroupType.NORMAL).map((e, index)=>(
                                <Link to={`/group/${e.groupId}`}>
                                    <ListItemButton key={index} selected={url===`${e.groupId}`}>
                                        <ListItemIcon>
                                            <Avatar>{e.groupname[0]}</Avatar>
                                        </ListItemIcon>
                                        <ListItemText primary={e.groupname} />
                                    </ListItemButton>
                                </Link>
                            ))
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
            </Paper>
    )
}

export default OverviewElement

type AddGroupProps = {
    setAddGroupShown: React.Dispatch<React.SetStateAction<boolean>>
}
const AddGroup:React.FC<AddGroupProps> = ({setAddGroupShown}) => {

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
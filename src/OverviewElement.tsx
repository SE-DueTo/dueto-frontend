import { AddCircleOutline } from "@mui/icons-material";
import { Avatar, Button, Divider, FormControl, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Paper, Stack, TextField, Typography } from "@mui/material"
import React, { useState } from "react";
import { Group, GroupType, User } from "./Types";
import { ModalBackdrop } from "./utils";
import ClickAwayListener from "@mui/core/ClickAwayListener";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";

type OverviewProps = {
    user: User,
    groups: Group[]
}
const OverviewElement:React.FC<OverviewProps> = ({user, groups}:OverviewProps) => {

    const [isAddGroupShown, setAddGroupShown] = useState(false)
    const theme:any = useTheme()
    
    return (
        <Paper 
                sx={{
                    borderRight: "1px solid rgba(255, 255, 255, 0.12)"
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
                            <ListItemButton>
                                <ListItemIcon>
                                    <Avatar src={user.avatar_url ?? undefined}>{user.username[0]}</Avatar>
                                </ListItemIcon>
                                <ListItemText primary={user.username} />
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
                            groups.filter(e=>e.type===GroupType.SPONTANEOUS).map((e, index)=>{

                                const otherUser = e.users.filter(e => e.userId !== user.userId)[0]

                                return (
                                    <Link to={`/group/${e.groupId}`}>
                                        <ListItemButton key={index}>
                                            <ListItemIcon>
                                                <Avatar src={otherUser.avatar_url ?? undefined}>{otherUser.username[0]}</Avatar>
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
                            groups.filter(e=>e.type===GroupType.NORMAL).map((e, index)=>(
                                <Link to={`/group/${e.groupId}`}>
                                    <ListItemButton key={index}>
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
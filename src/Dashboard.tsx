import { TabContext, TabPanel } from "@mui/lab";
import { Avatar, Button, Divider, FormControl, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Menu, MenuItem, Paper, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { ModalBackdrop } from "./utils";
import ClickAwayListener from "@mui/core/ClickAwayListener";
import TransactionModal from "./Transaction";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import SetleDebtsModal from "./SettleDebts";

const groups = ["test_0", "test_1", "test_2"]
const demoAvatar = "https://upload.wikimedia.org/wikipedia/commons/8/8e/Hauskatze_langhaar.jpg"

export default function Dashboard() {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [isAddGroupShown, setAddGroupShown] = useState(false)

    return (
        <Box 
            sx={{
                display: "grid", 
                gridTemplateColumns: "auto 1fr",
            }}
        >
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
                    >
                        <ListItemButton onClick={handleClick} onContextMenu={handleClick}>
                            <ListItemIcon>
                                <Avatar src={demoAvatar}></Avatar>
                            </ListItemIcon>
                            <ListItemText primary={"<username>"} />
                        </ListItemButton>
                        <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>Settings</MenuItem>
                            </Menu>
                    </List>
                    <Divider/>
                    <List
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Your Groups
                            </ListSubheader>
                        }
                    >
                        {
                            groups.map((e, index)=>(
                                <ListItemButton key={index}>
                                    <ListItemIcon>
                                        <Avatar>{e[0]}</Avatar>
                                    </ListItemIcon>
                                    <ListItemText primary={e} />
                                </ListItemButton>
                            ))
                        }
                        <Button 
                            variant="outlined" 
                            endIcon={<AddCircleOutlineIcon />}
                            sx={{width: "calc( 100% - 20px )", margin: "10px"}} 
                            onClick={()=>{setAddGroupShown(true)}}
                        >
                            New Group
                        </Button>
                        
                        {isAddGroupShown && <AddGroup setAddGroupShown={setAddGroupShown}/>}
                    </List>
                </List>
            </Paper>
            <Box>
                <MainSite/>
            </Box>
        </Box>
    )
}

function MainSite() {

    const [value, setValue] = useState(0)
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };    

    //TODO remove this code when functional elements are build
    const [isTransactionShown, setTransactionShown] = useState(false)
    const [isSettleDebtsShown, setSettleDebtsShown] = useState(false)

    return (
        <>
        <TabContext value={value.toString()}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                    <Tab label="Transactions" />
                    <Tab label="Debts" />
                </Tabs>
            </Box>
            
            <TabPanel value="0">
                <Button 
                    variant="outlined" 
                    startIcon={<AddIcon />} 
                    onClick={()=>{setTransactionShown(true)}}
                >
                    Transaction
                </Button>
                {isTransactionShown && <TransactionModal/>}
            </TabPanel>
            <TabPanel value="1">
            <Button 
                    variant="outlined" 
                    onClick={()=>{setSettleDebtsShown(true)}}
                >
                    Settle Debts
                </Button>
                {isSettleDebtsShown && <SetleDebtsModal/>}
            </TabPanel>
        </TabContext>
        </>
    )
}

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
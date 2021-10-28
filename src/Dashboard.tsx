import { Avatar, Button, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, makeStyles, Menu, MenuItem, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { DefaultHeader } from "./Header";
import { HeightWrapper } from "./utils";

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

    return (
        <HeightWrapper>
            <DefaultHeader/>
            <Box sx={{display: "grid", gridTemplateColumns: "auto 1fr"}}>
                <Paper>
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
                                    open={anchorEl!=null}
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
                                groups.map(e=>(
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <Avatar>{e.substring(0, 1)}</Avatar>
                                        </ListItemIcon>
                                        <ListItemText primary={e} />
                                    </ListItemButton>
                                ))
                            }
                            <Button variant="outlined" sx={{width: "calc( 100% - 20px )", margin: "10px"}}>New Group</Button>
                        </List>
                    </List>
                </Paper>
                <Box>
                    //SITE
                </Box>
            </Box>
        </HeightWrapper>
    )
}
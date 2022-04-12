import { TabContext, TabPanel } from "@mui/lab";
import { Button, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import TransactionModal from "./Transaction";
import AddIcon from '@mui/icons-material/Add';
import SetleDebtsModal from "./SettleDebts";
import PaymentIcon from '@mui/icons-material/Payment';
import { Group, GroupType } from "./Types";
import { GroupUserdataContext } from "./contexts";
import { Navigate, useLocation } from "react-router-dom";

export default function GroupDashboard() {

    const [value, setValue] = useState(0)
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }

    const defaultGroup:Group = {groupId: -1, groupname: "Loading...", type: GroupType.NORMAL, users: []}
    
    //TODO remove this code when functional elements are build
    const [isTransactionShown, setTransactionShown] = useState(false)
    const [isSettleDebtsShown, setSettleDebtsShown] = useState(false)
    const [group, setGroup] = useState<Group | null>(defaultGroup);

    const groupUserdata = useContext(GroupUserdataContext)
    const location = useLocation()


    useEffect(()=>{
        const groupId = parseInt(location.pathname.substring(location.pathname.lastIndexOf("/")+1))
        const g = groupUserdata.groups.filter(e => e.groupId === groupId)[0] || null

        setGroup(g || defaultGroup)

    }, [location, groupUserdata])

    if(group===null) {
        return (
            <Navigate to="/dashboard"/>
        )
    }

    

    const groupname = group.type === GroupType.NORMAL ? 
        group.groupname 
        : 
        group.users.filter(e => e.userId !== groupUserdata.user?.userId)[0]?.username

    return (
        <>
        <Box sx={{textAlign: "center"}}>
            <Typography variant="h5" >{groupname}</Typography>
        </Box>
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
                {isTransactionShown && <TransactionModal close={()=>{setTransactionShown(false)}} users={group.users}/>}
            </TabPanel>
            <TabPanel value="1">
            <Button 
                    variant="outlined" 
                    startIcon={<PaymentIcon/>}
                    onClick={()=>{setSettleDebtsShown(true)}}
                >
                    Settle Debts
                </Button>
                {isSettleDebtsShown && <SetleDebtsModal close={()=>setSettleDebtsShown(false)} users={group.users}/>}
            </TabPanel>
        </TabContext>
        </>
    )
}
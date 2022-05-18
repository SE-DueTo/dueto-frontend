import { TabContext, TabPanel } from "@mui/lab";
import { Button, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import TransactionModal from "./Transaction";
import AddIcon from '@mui/icons-material/Add';
import SetleDebtsModal from "./SettleDebts";
import PaymentIcon from '@mui/icons-material/Payment';
import { Navigate, useLocation } from "react-router-dom";
import TransactionTable from "./TransactionTable";
import { Group } from "./types/types";
import { DashboardDataContext } from "./context/DashboardDataProvider";

export default function GroupDashboard() {

    const [value, setValue] = useState(0)
    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }
    
    //TODO remove this code when functional elements are build
    const [isTransactionShown, setTransactionShown] = useState(false)
    const [isSettleDebtsShown, setSettleDebtsShown] = useState(false)
    const [group, setGroup] = useState<Group | null>(null);

    const groupUserdata = useContext(DashboardDataContext)
    const location = useLocation()


    useEffect(()=>{
        const groupId = parseInt(location.pathname.substring(location.pathname.lastIndexOf("/")+1))
        
        const g = groupUserdata?.groups?.filter(e => e.groupId === groupId)[0] || null
        setGroup(g)

    }, [location, groupUserdata])

    if(group===null) {
        return (
            <Navigate to="/dashboard"/>
        )
    }

    

    const groupname = group.groupType === "NORMAL" ? 
        group.groupName 
        : 
        group.users.filter(e => e.userId !== groupUserdata.user?.userId)[0]?.username

    return (
        <>
        <Box sx={{textAlign: "center", mt: "20px", mb: "5px"}}>
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
                <Box sx={{textAlign: "center", marginBottom: "1em"}}>
                    <Button 
                        variant="outlined" 
                        startIcon={<AddIcon />} 
                        onClick={()=>{setTransactionShown(true)}}
                    >
                        Transaction
                    </Button>
                </Box>
                {group.groupType==="SPONTANEOUS" ? 
                    <Typography variant="h6" sx={{textAlign: "left", marginBottom: '1em'}}>Your and {groupname} transactions:</Typography> 
                    : 
                    <Typography variant="h6" sx={{textAlign: "left", marginBottom: '1em'}}>Transactions in Group {groupname}: </Typography> }
                <TransactionTable></TransactionTable>
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
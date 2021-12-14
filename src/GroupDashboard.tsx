import { TabContext, TabPanel } from "@mui/lab";
import { Button, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import TransactionModal from "./Transaction";
import AddIcon from '@mui/icons-material/Add';
import SetleDebtsModal from "./SettleDebts";
import PaymentIcon from '@mui/icons-material/Payment';
import { GroupType } from "./Types";
import { GroupUserdataContext } from "./contexts";
import TransactionTable from "./TransactionTable";

export default function GroupDashboard() {

    const [value, setValue] = useState(0)
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };    

    //TODO remove this code when functional elements are build
    const [isTransactionShown, setTransactionShown] = useState(false)
    const [isSettleDebtsShown, setSettleDebtsShown] = useState(false)

    const groupUserdata = useContext(GroupUserdataContext)
    const groupId = parseInt(window.location.pathname.substring(window.location.pathname.lastIndexOf("/")+1))

    const group = groupUserdata.groups.filter(e => e.groupId === groupId)[0]

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
                <Box sx={{textAlign: "center", marginBottom: "1em"}}>
                    <Button 
                        variant="outlined" 
                        startIcon={<AddIcon />} 
                        onClick={()=>{setTransactionShown(true)}}
                    >
                        Transaction
                    </Button>
                </Box>
                <Typography variant="h6" >Your and {groupname} Transactions:</Typography>
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
import { TabContext, TabPanel } from "@mui/lab";
import { Button, Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import TransactionModal, {users} from "./Transaction";
import AddIcon from '@mui/icons-material/Add';
import SetleDebtsModal from "./SettleDebts";
import PaymentIcon from '@mui/icons-material/Payment';


export default function GroupDashboard() {

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
                {isTransactionShown && <TransactionModal close={()=>{setTransactionShown(false)}} users={users}/>}
            </TabPanel>
            <TabPanel value="1">
            <Button 
                    variant="outlined" 
                    startIcon={<PaymentIcon/>}
                    onClick={()=>{setSettleDebtsShown(true)}}
                >
                    Settle Debts
                </Button>
                {isSettleDebtsShown && <SetleDebtsModal close={()=>setSettleDebtsShown(false)}/>}
            </TabPanel>
        </TabContext>
        </>
    )
}
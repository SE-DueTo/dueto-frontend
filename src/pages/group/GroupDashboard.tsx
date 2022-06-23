import { TabContext, TabPanel } from "@mui/lab";
import { Button, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import PaymentIcon from '@mui/icons-material/Payment';
import { Navigate, useLocation } from "react-router-dom";
import { Group, TransactionAddDTO } from "../../types/types";
import GroupDataProvider, { GroupDataContext, DEFAULT_LIMIT } from "../../context/GroupDataProvider";
import TransactionTable from "../../components/layout/TransactionTable";
import SettleDebts from "../../components/modals/SettleDebts";
import Transaction from "../../components/modals/Transaction";
import { TransactionInterfaceContext } from "../../context/TransactionInterfaceProvider";
import { DashboardDataContext } from "../../context/DashboardDataProvider";

function GroupDashboard() {

    const [value, setValue] = useState(0)
    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    } 
    
    //TODO remove this code when functional elements are build
    const [isTransactionShown, setTransactionShown] = useState(false)
    const [isSettleDebtsShown, setSettleDebtsShown] = useState(false)
    const [group, setGroup] = useState<Group | null | undefined>(undefined);
    const [groupId, setGroupId] = useState(-1)
    const groupData = useContext(GroupDataContext)
    const groupUserdata = useContext(DashboardDataContext)
    const transactionContext = useContext(TransactionInterfaceContext)
    const location = useLocation()
    const arrayLength = (groupData.transactions || []).length;
    const arrayEmpty = arrayLength === 0;
    const arrayFull = arrayLength % DEFAULT_LIMIT === 0;

    useEffect(()=>{
        const groupId = parseInt(location.pathname.substring(location.pathname.lastIndexOf("/")+1))
        setGroupId(groupId)
        const g = groupUserdata?.groups?.filter(e => e.groupId === groupId)[0] || null
        setGroup(g)
        console.log(g, groupId)

    }, [location])

    if(group===null) {
        return (
            <Navigate to="/dashboard"/>
        )
    }

    if(group === undefined) {
        return <></>
    }

    const sendTransaction = async (transaction: TransactionAddDTO) => {
        transaction.groupId = group.groupId;
        transactionContext.addTransaction(transaction)
    }

    const groupname = group.groupType === "NORMAL" ? 
        group.groupName 
        : 
        group.users.filter(e => e.userId !== groupUserdata.user?.userId)[0]?.username

    return (
        <GroupDataProvider groupId={groupId}>
        <GroupDataContext.Consumer> 
            {(groupContext) =>
        <>
        {console.log(groupId)}
        <Box sx={{textAlign: "center", mt: "20px", mb: "5px"}}>
            <Typography variant="h5" >{groupname}</Typography>
            <Typography variant="h5">{((groupContext.groupInfo?.sum || 0) / 100).toFixed(2)}€</Typography>
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
                <TransactionTable data={groupContext.transactions}/>
                {(!arrayEmpty && arrayFull) && <Button onClick={()=>{groupContext.loadMoreTransactions()}}>Load more</Button>}
                {isTransactionShown && <Transaction close={()=>{setTransactionShown(false)}} users={group.users} input={sendTransaction}/>}
            </TabPanel>
            <TabPanel value="1">
            <Button 
                    variant="outlined" 
                    startIcon={<PaymentIcon/>}
                    onClick={()=>{setSettleDebtsShown(true)}}
                >
                    Settle Debts
                </Button>
                {isSettleDebtsShown && <SettleDebts close={()=>setSettleDebtsShown(false)} users={group.users}/>}
            </TabPanel>
        </TabContext>
        </>
        }
        </GroupDataContext.Consumer>
        </GroupDataProvider>
    )
}

export default GroupDashboard
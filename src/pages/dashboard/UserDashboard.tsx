import { Add } from "@mui/icons-material";
import { Box, Button, Divider,  Typography } from "@mui/material";
import { useContext, useState } from "react";
import { DashboardDataContext, DEFAULT_LIMIT } from "../../context/DashboardDataProvider";
import SearchUserPopup from "../../components/modals/SearchUserPopup";
import TransactionTable from "../../components/layout/TransactionTable";
import { defaultUser, Group, TransactionAddDTO, User } from "../../types/types";
import Transaction from "../../components/modals/Transaction";
import { GroupInterfaceContext } from "../../context/GroupInterfaceProvider";
import { TransactionInterfaceContext } from "../../context/TransactionInterfaceProvider";

function UserDashboard() {

    const [isSearchOpen, setSearchOpen] = useState(false)
    const [isTransactionShown, setTransactionShown] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User>(defaultUser)
    const groupUserdata = useContext(DashboardDataContext)
    const groupContext = useContext(GroupInterfaceContext)
    const transactionContext = useContext(TransactionInterfaceContext)
    const arrayLength = (groupUserdata.transactions || []).length;
    const arrayEmpty = arrayLength === 0;
    const arrayFull = arrayLength % DEFAULT_LIMIT === 0;

    const setTransactionUser = (user: User) => {
        setSelectedUser(user)
        setTransactionShown(true)
    }

    const sendTransaction = async (transaction: TransactionAddDTO) => {
        const users = [groupUserdata.user || defaultUser, selectedUser]
        const groups = groupUserdata.groups?.filter(g => g.groupType === "SPONTANEOUS") || []
        let groupId = getGroupId(users, groups)?.groupId
        if(groupId === undefined) {
            groupId = await groupContext.addSpontaneousGroup(users[1].userId)
        }
        transaction.groupId = groupId
        await transactionContext.addTransaction(transaction)
        await groupUserdata.update()
    }

    const getGroupId = (users: User[], groups: Group[]):(Group | undefined) => {
        return groups.filter(group => arraysEqual(users, group.users))[0]
    }

    const arraysEqual = (array1: User[], array2: User[]) => {
        array1.forEach(a1 => {
            array2.forEach(a2 => {
            if(a1.userId === a2.userId) {
                const index = array2.indexOf(a2)
                if(index > -1){
                    array2.splice(index, 1);
                }
            }
            })
            
        });
        return array2.length === 0
    }

    return (
        <Box sx={{textAlign: "center", mt: "20px"}}>
            <Typography variant="h5">Hallo {groupUserdata.user?.username}</Typography>
            <Typography variant="h2">{(groupUserdata.balance / 100).toFixed(2)}€</Typography>
            <Box sx={{marginTop: "10px"}}>
                <Button 
                    variant="outlined" 
                    startIcon={<Add />} 
                    onClick={()=>{setSearchOpen(true)}}
                >
                    New Transaction
                </Button>
                {isSearchOpen && <SearchUserPopup setSearchOpen={setSearchOpen} setUser={setTransactionUser}/>}
                {isTransactionShown && <Transaction close={() => {setTransactionShown(false); } } users={[groupUserdata.user || defaultUser, selectedUser]} input={sendTransaction}/>}
            </Box>
            <Divider sx={{margin: "20px 0px"}}/>
            <Box sx={{margin: '1em'}}>
                <Typography variant="h6" sx={{textAlign: "left", marginBottom: '1em'}}>Your Transactions:</Typography>
                <TransactionTable data={groupUserdata.transactions}/>
                {(!arrayEmpty && arrayFull) && <Button onClick={()=>{groupUserdata.loadMoreTransactions()}}>Load more</Button>}
            </Box>
        </Box>
    )
}

export default UserDashboard
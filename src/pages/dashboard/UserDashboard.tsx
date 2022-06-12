import { Add } from "@mui/icons-material";
import { Box, Button, Divider,  Typography } from "@mui/material";
import { useContext, useState } from "react";
import { DashboardDataContext, DEFAULT_LIMIT } from "../../context/DashboardDataProvider";
import SearchUserPopup from "../../components/modals/SearchUserPopup";
import TransactionTable from "../../components/layout/TransactionTable";
import { defaultUser, User } from "../../types/types";
import Transaction from "../../components/modals/Transaction";

function UserDashboard() {

    const [isSearchOpen, setSearchOpen] = useState(false)
    const [isTransactionShown, setTransactionShown] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User>(defaultUser)
    const groupUserdata = useContext(DashboardDataContext)
    const arrayLength = (groupUserdata.transactions || []).length;
    const arrayEmpty = arrayLength === 0;
    const arrayFull = arrayLength % DEFAULT_LIMIT === 0;

    const setTransactionUser = (user: User) => {
        setSelectedUser(user)
        setTransactionShown(true)
    }

    return (
        <Box sx={{textAlign: "center", mt: "20px"}}>
            <Typography variant="h5">Hallo {groupUserdata.user?.username}</Typography>
            <Typography variant="h2">{groupUserdata.balance}€</Typography>
            <Box sx={{marginTop: "10px"}}>
                <Button 
                    variant="outlined" 
                    startIcon={<Add />} 
                    onClick={()=>{setSearchOpen(true)}}
                >
                    New Transaction
                </Button>
                {isSearchOpen && <SearchUserPopup setSearchOpen={setSearchOpen} setUser={setTransactionUser}/>}
                {isTransactionShown && <Transaction close={() => {setTransactionShown(false); } } users={[groupUserdata.user || defaultUser, selectedUser]}/>}
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
import { Add } from "@mui/icons-material";
import { Box, Button, Divider,  Typography } from "@mui/material";
import { useContext, useState } from "react";
import TransactionTable from "../../TransactionTable";
import { DashboardDataContext, DEFAULT_LIMIT } from "../../context/DashboardDataProvider";
import SearchUserPopup from "../../SearchUserPopup";

function UserDashboard() {

    const [isSearchOpen, setSearchOpen] = useState(false)
    const groupUserdata = useContext(DashboardDataContext)
    const arrayLength = (groupUserdata.transactions || []).length;
    const arrayEmpty = arrayLength === 0;
    const arrayFull = arrayLength % DEFAULT_LIMIT === 0;

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
                {isSearchOpen && <SearchUserPopup setSearchOpen={setSearchOpen}/>}
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
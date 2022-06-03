import { Avatar, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useContext } from 'react';
import { DashboardDataContext } from '../../context/DashboardDataProvider';
import { Transaction } from '../../types/types';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));




type TransactionTableProps ={
    data?: Transaction[] | null
}
function TransactionTable({data}:TransactionTableProps) {

    const groupUserdata = useContext(DashboardDataContext)
    
    if(!data || data.length === 0) {
        return (
            <Typography>No Transactions</Typography>
        )
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Transactor</StyledTableCell>
                        <StyledTableCell align="right">Amount</StyledTableCell>
                        <StyledTableCell align="right">Purpose</StyledTableCell>
                        <StyledTableCell align="right">Payment Method</StyledTableCell>
                        <StyledTableCell align="right">Date of Payment</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, i) => {

                        const isSpontaneous = row.group.groupType === "SPONTANEOUS"
                        let otherUser;
                        let url;
                        let groupName;
                        if(isSpontaneous) {
                            otherUser = row.group.users.filter(e => e.userId !== groupUserdata.user?.userId)[0]
                            url = otherUser.avatarUrl
                            groupName = otherUser.username                
                        }

                        return (
                            <StyledTableRow key={`row.${i}`}>
                                <StyledTableCell component="th" scope="row">
                                    <Avatar src={url ?? undefined}>{groupName}</Avatar>
                                    {groupName}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.amount} €</StyledTableCell>
                                <StyledTableCell align="right">{row.purpose}</StyledTableCell>
                                <StyledTableCell align="right">{row.paymentMethod}</StyledTableCell>
                                <StyledTableCell align="right">{row.date}</StyledTableCell>
                            </StyledTableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TransactionTable
import { Avatar, Box, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
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



const dateToString = (date: string) => {
    const d = new Date(date)
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`
}

type TransactionTableProps ={
    data?: Transaction[] | null
}
function TransactionTable({data}:TransactionTableProps) {
    
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
                        let url;
                        let groupName = row.group.groupName;
                        if(isSpontaneous) {
                            const otherUser = row.whoPaid
                            url = otherUser.avatarUrl
                            groupName = otherUser.username                
                        }

                        return (
                            <StyledTableRow key={`row.${i}`}>
                                <StyledTableCell component="th" scope="row">
                                    <Box sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        flexWrap: "wrap",
                                        alignItems: "center",
                                        gap: "10px",
                                    }}>
                                        <Avatar src={url ?? undefined}>{(groupName||"")[0]}</Avatar>
                                        {row.whoPaid.username}
                                    </Box>
                                </StyledTableCell>
                                <StyledTableCell align="right">{(row.amount / 100).toFixed(2)} €</StyledTableCell>
                                <StyledTableCell align="right">{row.purpose}</StyledTableCell>
                                <StyledTableCell align="right">{row.paymentMethod}</StyledTableCell>
                                <StyledTableCell align="right">{dateToString(row.date)}</StyledTableCell>
                            </StyledTableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TransactionTable

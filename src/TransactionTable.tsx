import { Box, IconButton, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, useTheme } from '@mui/material'


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
  
  function createData(
    avatarUrl: string | null,
    name: string,
    amount: number,
    purpose: string,
    paymentMethod: string,
    dateOfPayment: string,
  ) {
    return { avatarUrl, name, amount, purpose, paymentMethod, dateOfPayment };
  }
  
  const rows = [
    createData('Hallo', 'Hans', 159, '6.0', '24', '4.0'),
    createData('Test', 'Gruppe', 237, '9.0', '37', '4.3')
  ];

export default function TransactionTable() {

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
              {rows.map((row) => (
                <StyledTableRow key={row.avatarUrl}>
                  <StyledTableCell component="th" scope="row">
                    {row.avatarUrl + ' ' + row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.amount}</StyledTableCell>
                  <StyledTableCell align="right">{row.purpose}</StyledTableCell>
                  <StyledTableCell align="right">{row.paymentMethod}</StyledTableCell>
                  <StyledTableCell align="right">{row.dateOfPayment}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
}
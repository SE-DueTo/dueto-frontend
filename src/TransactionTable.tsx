import { Avatar, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material'
import { useContext } from 'react';
import { DashboardDataContext } from './context/DashboardDataProvider';
import { Group, GroupType, PaymentMethods, Transaction, User } from './Types';

const user:User = {
  userId: 0,
  username: "Username",
  email: "user@example.com",
  avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Hauskatze_langhaar.jpg"
}
const user2:User = {
  userId: 1,
  username: "Username2",
  email: "user2@example.com",
  avatarUrl: null
}

const groups:Group[] = [
  {
      groupId: 0,
      groupname: "Test_0",
      type: GroupType.NORMAL,
      users: [user]
  }, {
      groupId: 1,
      groupname: "Bla",
      type: GroupType.SPONTANEOUS,
      users: [user, user2]
  }, 
]

const transactions:Transaction[] = [
  {
    transactor: user,
    group: groups[0],
    amount: 19.99,
    paymentMethod: PaymentMethods.CASH,
    purpose: "Einkaufen Rewe",
    date: "14.12.2021"
  }, 
  {
    transactor: user2,
    group: groups[0],
    amount: 19.99,
    paymentMethod: PaymentMethods.CASH,
    purpose: "Einkaufen Rewe",
    date: "14.12.2021"
  }, 
]


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
    paymentMethod: PaymentMethods,
    dateOfPayment: string,
  ) {
    return { avatarUrl, name, amount, purpose, paymentMethod, dateOfPayment };
}
  


type TransactionTableProps ={

}
const TransactionTable:React.FC<TransactionTableProps> = () => {

  const rows = [ 
     createData('Hallo', 'Hans', 29.99, 'Essen gehen', PaymentMethods.CASH, '14.12.2021'),
     createData('Test', 'Gruppe', 237, 'Urlaub in Mexico City', PaymentMethods.CREDITCARD, '08.12.2021'),
  ];
  
  const groupUserdata = useContext(DashboardDataContext)

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
                    <Avatar src={groupUserdata.user?.avatarUrl ?? undefined}>{groupUserdata.user?.username[0]}</Avatar>
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.amount} €</StyledTableCell>
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

export default TransactionTable
import { Save } from "@mui/icons-material";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ModalBackdrop } from "./utils";
import { useState } from "react";
import { User } from "./Types";
import DateComponent from "./components/DateComponent";
import UserInteractionWrapper from "./components/UserInteractionWrapper";
import SetCreditorOrDebitor from "./components/SetCreditorOrDebitor";
import UserElement from "./components/UserElement";
import MoneyTextField from "./components/MoneyTextField";

type SettleDebtsModalProps = {
    close: ()=>void,
    users: User[]
}
export default function SetleDebtsModal(props:SettleDebtsModalProps) {
    return (
        <ModalBackdrop>
            <SettleDebts {...props}/>
        </ModalBackdrop>
    )
}

function SettleDebts({close, users}:SettleDebtsModalProps) {

    const [whoSettleDebt, setWhoSettleDebt] = useState<string>("")
    const [amount, setAmount] = useState<number>(0)
    const [paymentMethod, setPaymentMethod] = useState<string>('')
    const [whoReceived, setWhoReceived] = useState<string>("")
    const [date, setDate] = useState(new Date())

    return (
        <UserInteractionWrapper onClickAway={close} title={"Settle Debts"}>
            <SetCreditorOrDebitor 
                label="Who gave" 
                who={whoSettleDebt}
                users={users}
                onChange={(event)=>{
                    setWhoSettleDebt(event.target.value as string)
                }} />
            <MoneyTextField
                amount={amount}
                setAmount={setAmount}/>
            <FormControl variant="standard">
                <InputLabel>Who received</InputLabel>
                <Select 
                    label="Who received" 
                    value={whoReceived} 
                    onChange={(event)=>{
                        setWhoReceived(event.target.value as string)
                    }}
                >
                    {users.map(e=>(
                        <MenuItem 
                            value={e.userId}
                            key={e.userId}
                        >
                            <UserElement {...e}/>
                        </MenuItem>
                    ))}
                    
                </Select>
            </FormControl>
            <FormControl variant="standard">
                <InputLabel>Payment method</InputLabel>
                <Select 
                    label="Payment method" 
                    value={paymentMethod} 
                    onChange={(event)=>{
                        setPaymentMethod(event.target.value as string)
                    }}
                >
                    <MenuItem value={0}>lorem</MenuItem>
                    <MenuItem value={1}>ipsum</MenuItem>
                    <MenuItem value={2}>solor</MenuItem>
                </Select>
            </FormControl>

            <DateComponent 
                label="Date of payment" 
                date={date}
                onChange={(newValue) => {
                    if(newValue == null) newValue = new Date();
                    setDate(newValue)
                }}/>
            <Button startIcon={<Save/>} variant="contained">Save</Button>
        </UserInteractionWrapper>
    )
}
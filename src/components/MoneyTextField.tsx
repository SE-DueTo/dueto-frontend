import { InputAdornment, TextField } from "@mui/material";

type MoneyTextFieldType = {
    amount: number,
    setAmount: (amount: number) => void
}

function MoneyTextField({amount, setAmount}:MoneyTextFieldType) {
    return (
        <TextField 
            type="number" 
            label="Amount" 
            variant="standard"
            value={amount.toString()}
            InputProps={{
                endAdornment: <InputAdornment position="end">€</InputAdornment>,
            }}
            onInput={(event)=>{
                const target = event.target as HTMLInputElement
                try {
                    const input = target.value
                    const amount = parseFloat(input)
                    if(((amount * 100 ) % 1) > 0) return;
                    if(isNaN(amount)) setAmount(0)
                    else setAmount(amount)
                } catch (e) {
                    setAmount(0)
                }
            }}
        />
    )
}

export default MoneyTextField
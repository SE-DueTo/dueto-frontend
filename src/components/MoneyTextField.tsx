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
                    const inputAmount = parseFloat(input)
                    if(((inputAmount * 100 ) % 1) > 0) return;
                    if(isNaN(inputAmount)) setAmount(0)
                    else setAmount(inputAmount)
                } catch (e) {
                    setAmount(0)
                }
            }}
        />
    )
}

export default MoneyTextField
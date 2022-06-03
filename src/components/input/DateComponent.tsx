import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

type DateComponentType = {
    date: Date,
    onChange: (newValue:(Date | null)) => void,
    label: string,
}

function DateComponent({date, onChange, label}:DateComponentType) {
    return (
        <DatePicker
            maxDate={new Date()}
            minDate={new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 30))}
            value={date}
            renderInput={(params) => <TextField {...params}/>}
            onChange={onChange}
            label={label}
            mask={"__.__.____"}
            views={['day']}
        />
    )
}

export default DateComponent
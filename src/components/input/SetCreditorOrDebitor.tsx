import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { User } from "../../types/types";
import UserElement from "../design/UserElement";

type SetCreditorOrDebitorType = {
    label: string,
    onChange: ((event: SelectChangeEvent<unknown>, child: React.ReactNode) => void) | undefined,
    users: User[],
    who: string
}

function SetCreditorOrDebitor({label, onChange, users, who}:SetCreditorOrDebitorType) {
    return (
        <FormControl variant="standard">
                <InputLabel>{label}</InputLabel>
                <Select 
                    label={label} 
                    value={who} 
                    onChange={onChange}
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
    )
}

export default SetCreditorOrDebitor;
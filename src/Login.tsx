import { Button, FormControl, Stack, TextField, Typography } from "@mui/material";
import Send from '@mui/icons-material/Send';
import { RegisterLoginWrapper } from "./utils";

export default function Login() {
    return (
        <RegisterLoginWrapper>
            <FormControl sx={{width: "100%"}}>
                <form>
                    <Stack spacing={2}>
                        <Typography variant="h5">Login</Typography>
                        <TextField label="Username" variant="standard" />
                        <TextField label="Password" type="password" variant="standard" />
                        <Button sx={{width: "100%"}} variant="contained" endIcon={<Send/>}>Login</Button>
                    </Stack>
                </form>
            </FormControl>
        </RegisterLoginWrapper>
    )
}
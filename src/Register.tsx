import { Login } from "@mui/icons-material";
import { Button, FormControl, Stack, TextField, Typography } from "@mui/material";
import { RegisterLoginWrapper } from "./utils";

export default function Register() {

    return (
        <RegisterLoginWrapper>
            <FormControl sx={{width: "100%"}}>
                <form>
                    <Stack spacing={2}>
                        <Typography variant="h5">Register</Typography>
                        <TextField label="Username" variant="standard" />
                        <TextField label="E-Mail" variant="standard" />
                        <TextField label="Password" type="password" variant="standard" />
                        <TextField label="Repeat Password" type="password" variant="standard" />
                        <Button sx={{width: "100%"}} variant="contained" endIcon={<Login/>}>Register</Button>
                    </Stack>
                </form>
            </FormControl>
        </RegisterLoginWrapper>
    )
}
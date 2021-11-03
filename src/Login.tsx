import { Button, FormControl, Stack, TextField, Typography } from "@mui/material";
import Send from '@mui/icons-material/Send';
import { RegisterLoginWrapper } from "./utils";
import { Redirect } from "react-router";
import { useState } from "react";

export default function Login() {

    //TODO this has to be removed if functional code is used
    const [isRedirect, setRedirect] = useState(false)

    return (
        <RegisterLoginWrapper>
            <FormControl sx={{width: "100%"}}>
                <form>
                    <Stack spacing={2}>
                        <Typography variant="h5">Login</Typography>
                        <TextField label="Username" variant="standard" id="login-username-input" />
                        <TextField label="Password" type="password" variant="standard" id="login-password-input" />
                        <Button 
                            sx={{width: "100%"}} 
                            variant="contained" 
                            endIcon={<Send/>} 
                            onClick={()=>{setRedirect(true)}}
                        >
                            Login
                        </Button>
                        {isRedirect && <Redirect to="/dashboard"/>}
                    </Stack>
                </form>
            </FormControl>
        </RegisterLoginWrapper>
    )
}
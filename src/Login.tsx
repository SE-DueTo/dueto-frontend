import { Button, FormControl, Stack, TextField, Typography } from "@mui/material";
import Send from '@mui/icons-material/Send';
import { RegisterLoginWrapper } from "./utils";
import { Navigate } from "react-router";
import { useContext, useState } from "react";
import { LoginContext } from "./context/LoginProvider";

export default function Login() {

    //TODO this has to be removed if functional code is used

    const loginContext = useContext(LoginContext)

    const [loginPossible, setLoginPossible] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const login = () => {
        setLoginPossible(true)
        loginContext.login(username, password)
            .then(() => setRedirect(true))
            .catch(() => {
                setPassword("")
                setLoginPossible(false)
                setWrongVisible(true)
            })
    }

    const [isRedirect, setRedirect] = useState(false)
    const [isWrongVisible, setWrongVisible] = useState(false)

    return (
        <RegisterLoginWrapper>
            <FormControl sx={{width: "100%"}}>
                <form>
                    <Stack spacing={2}>
                        <Typography variant="h5">Login</Typography>
                        <TextField 
                            label="Username" 
                            variant="standard" 
                            id="login-username-input" 
                            onChange={(event)=>setUsername(event.target.value)}
                            value={username} />
                        <TextField 
                            label="Password" 
                            type="password" 
                            variant="standard" 
                            id="login-password-input" 
                            onChange={(event)=>setPassword(event.target.value)}
                            value={password} />
                        { isWrongVisible && <Typography sx={{color: "red"}}>Username or password is wrong</Typography> }
                        <Button 
                            sx={{width: "100%"}} 
                            variant="contained" 
                            endIcon={<Send/>} 
                            onClick={()=>login()}
                            id="login-button"
                            disabled={loginPossible}
                        >
                            Login
                        </Button>
                        {isRedirect && <Navigate to="/dashboard"/>}
                    </Stack>
                </form>
            </FormControl>
        </RegisterLoginWrapper>
    )
}
import { Login } from "@mui/icons-material";
import { Button, FormControl, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import RegisterLoginWrapper from "./RegisterLoginWrapper";

export default function Register() {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [registerPossible, setRegisterPossible] = useState(false)

    const url = process.env.REACT_APP_URL;

    const [auxMsg, setAuxMsg] = useState({
        visible: false,
        color: "red",
        text: "",
    })

    const register = () => {

        if(password !== password2) {
            setAuxMsg({
                visible: true,
                text: "Passwords don't match.",
                color: "red",
            }); 
            return
        }

        setRegisterPossible(true)
        fetch(`${url}/v1/user/register`, {
            method: "POST",
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(e => {
            if(e.status !== 200) {
                throw Error()
            }
            return e.json()
        })
        .catch(() => { 
            setAuxMsg({
                visible: true,
                text: "Please try again later",
                color: "red",
            }); 
            setRegisterPossible(false)
            return null 
        })
        .then((e) => {
            if(e === null) return

            if(!e.successful) {
                setAuxMsg({
                    visible: true,
                    text: "Something went wrong.",
                    color: "red",
                }); 
                setRegisterPossible(false)
                return
            }
            setAuxMsg({
                visible: true,
                text: "Successfully registered, please login.",
                color: "green",
            }); 
        })
    }

    return (
        <RegisterLoginWrapper>
            <FormControl sx={{width: "100%"}}>
                <form>
                    <Stack spacing={2}>
                        <Typography variant="h5">Register</Typography>
                        <TextField 
                            label="Username" 
                            variant="standard" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} />
                        <TextField 
                            label="E-Mail" 
                            variant="standard"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}  />
                        <TextField 
                            label="Password" 
                            type="password" 
                            variant="standard"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}  />
                        <TextField 
                            label="Repeat Password" 
                            type="password" 
                            variant="standard"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}  />
                        
                        { auxMsg.visible && <Typography sx={{color: auxMsg.color}}>{auxMsg.text}</Typography>}

                        <Button 
                            sx={{width: "100%"}} 
                            variant="contained" 
                            endIcon={<Login/>} 
                            onClick={ () => register() }
                            disabled={registerPossible}
                        >
                            Register
                        </Button>
                    </Stack>
                </form>
            </FormControl>
        </RegisterLoginWrapper>
    )
}
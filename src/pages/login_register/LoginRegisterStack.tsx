import { Stack, useMediaQuery } from "@mui/material"
import Login from "../../components/login/Login"
import Register from "../../components/register/Register";

function LoginRegisterStack() {

    const isMobile = useMediaQuery('(max-width:800px)');

    return (
        <Stack 
            alignItems="center" 
            justifyContent="space-evenly" 
            direction={isMobile ? "column" : "row"} 
            spacing={2} 
            sx={{
                margin: isMobile ? "1em 0" : ""
            }}
        >
            <Login/>
            <Register/>
        </Stack>
    )
}

export default LoginRegisterStack
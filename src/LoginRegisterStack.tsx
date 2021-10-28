import { Stack } from "@mui/material"
import Login from "./Login"
import Register from "./Register"

export default function LoginRegisterStack() {
    return (
        <Stack alignItems="center" justifyContent="space-evenly" direction="row">
            <Login/>
            <Register/>
        </Stack>
    )
}
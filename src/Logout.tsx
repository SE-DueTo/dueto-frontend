import { Backdrop, CircularProgress } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router";
import { LoginContext } from "./context/LoginProvider";

export default function Logout() {

    const loginContext = useContext(LoginContext)
    const [isRedirect, setRedirect] = useState(false)

    useEffect(()=>{
        loginContext.logout()
            .finally(() => setRedirect(true))
    }, [loginContext])

    return isRedirect ? (
        <Navigate to="/"/>
    ) : (
        <Backdrop open={true}>
            <CircularProgress/>
        </Backdrop>
    )
}
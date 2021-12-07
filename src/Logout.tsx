import { Backdrop, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";

export default function Logout() {

    const [isRedirect, setRedirect] = useState(false)
    useEffect(()=>{
        setTimeout(()=>{
            setRedirect(true)
        }, 2000);
    }, [])

    return isRedirect ? (
        <Navigate to="/"/>
    ) : (
        <Backdrop open={true}>
            <CircularProgress/>
        </Backdrop>
    )
}
import { ThemeProvider } from "@emotion/react"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { Backdrop, CssBaseline, Modal, Paper, useMediaQuery } from "@mui/material"
import { Box } from "@mui/system"
import { theme } from './theme'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DefaultHeader } from "./Header"
import { ReactChild, ReactFragment, ReactPortal, useContext } from "react"
import { de } from "date-fns/locale"
import LoginProvider, { LoginContext } from "./context/LoginProvider";
import { Navigate } from "react-router-dom"
import DataProvider from "./context/DataInterfaceProvider"

type SiteProps= {
    children?: JSX.Element | JSX.Element[]
    showLogin: boolean
    showAppBar?: boolean
}

type HeightWrapperProps = {
    children?: JSX.Element | JSX.Element[] | boolean | ReactFragment | ReactPortal
}
export function HeightWrapper({children}:HeightWrapperProps) {
    return (
        <Box sx={{display: "grid", gridTemplateRows: "auto 1fr", height: "100vh"}}>
            {children}
        </Box>
    )
}

export function Site({children, showLogin, showAppBar=true}:SiteProps) {

    return (
        <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={de}>
            <CssBaseline/>
            <LoginProvider>
                <DataProvider>
                    <CheckSiteLogin check={!showLogin}>
                        <Box sx={{display: "grid", gridTemplateRows: "auto 1fr", height: "100vh"}}>
                            <HeightWrapper>
                                {showAppBar && <DefaultHeader showLogin={showLogin}/>}
                                {children}
                            </HeightWrapper>
                        </Box>
                    </CheckSiteLogin>
                </DataProvider>
            </LoginProvider>
        </LocalizationProvider>
    </ThemeProvider>
    )
}

type CheckSiteLoginType = {
    children: JSX.Element,
    check: boolean,
}
function CheckSiteLogin({children, check}: CheckSiteLoginType) {

    const loginContext = useContext(LoginContext)
    return (check && !loginContext.isLoggedIn) ? <Navigate to="/login"/> : children

}

type RegisterLoginProps = {
    children?: JSX.Element | JSX.Element[]
}
export function RegisterLoginWrapper({children}:RegisterLoginProps) {
    const isMobile = useMediaQuery('(max-width:800px)');
    return (
        <Paper 
            sx={{
                padding: "2em", 
                width: isMobile ? "calc( 100% - 1em )" : "400px", 
                maxWidth: isMobile ? "calc( 100% - 1em )" : "calc( 50vw - 1em )"
            }}
        >
            {children}
        </Paper>
    )
}

type ModalBackdropProps = {
    children: JSX.Element
}
export function ModalBackdrop({children}:ModalBackdropProps) {
    return (
        <Backdrop open={true} >
            <Modal 
                open={true}
                sx={{
                    display: "flex", 
                    justifyContent: "center", 
                    alignItems: "center",
                }}
            >
                {children}
            </Modal>
        </Backdrop>
    )
}
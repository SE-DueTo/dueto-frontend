import { Box, CssBaseline, ThemeProvider } from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers"
import LoginProvider from "./context/LoginProvider"
import { DefaultHeader } from "./Header"
import { de } from "date-fns/locale"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import DataInterfaceProvider from "./context/DataInterfaceProvider"
import CheckSiteLogin from "./CheckSiteLogin"
import HeightWrapper from "./HeightWrapper"
import { theme } from "./theme"

type SiteProps= {
    children?: JSX.Element | JSX.Element[]
    showLogin: boolean
    showAppBar?: boolean
}

function Site({children, showLogin, showAppBar=true}:SiteProps) {

    return (
        <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={de}>
            <CssBaseline/>
            <LoginProvider>
                <DataInterfaceProvider>
                    <CheckSiteLogin check={!showLogin}>
                        <Box sx={{display: "grid", gridTemplateRows: "auto 1fr", height: "100vh"}}>
                            <HeightWrapper>
                                {showAppBar && <DefaultHeader showLogin={showLogin}/>}
                                {children}
                            </HeightWrapper>
                        </Box>
                    </CheckSiteLogin>
                </DataInterfaceProvider>
            </LoginProvider>
        </LocalizationProvider>
    </ThemeProvider>
    )
}

export default Site;
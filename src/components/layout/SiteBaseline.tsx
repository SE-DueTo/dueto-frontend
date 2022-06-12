import { CssBaseline, ThemeProvider } from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { de } from "date-fns/locale"
import { BrowserRouter } from "react-router-dom"
import DataInterfaceProvider from "../../context/DataInterfaceProvider"
import LoginProvider from "../../context/LoginProvider"
import { theme } from "../../theme/theme"

type SiteBaselineProps = {
    children: JSX.Element
}

function SiteBaseline({children}:SiteBaselineProps) {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={de}>
                    <CssBaseline/>
                    <LoginProvider>
                        <DataInterfaceProvider>
                            { children }
                        </DataInterfaceProvider>
                    </LoginProvider>
                </LocalizationProvider>
            </ThemeProvider>
        </BrowserRouter>
    )
}

export default SiteBaseline
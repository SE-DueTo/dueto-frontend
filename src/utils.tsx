import { ThemeProvider } from "@emotion/react"
import { LocalizationProvider } from "@mui/lab"
import { CssBaseline } from "@mui/material"
import { Box } from "@mui/system"
import { theme } from './theme'
import AdapterDateFns from '@mui/lab/AdapterDateFns';

type SiteProps= {
    children?: JSX.Element | JSX.Element[]
}

type heightWrapperProps = {
    children?: JSX.Element | JSX.Element[]
}
export const HeightWrapper:React.FC<heightWrapperProps> = ({children}) => (
    <Box sx={{display: "grid", gridTemplateRows: "auto 1fr", height: "100vh"}}>
        {children}
    </Box>
)

export const Site:React.FC<SiteProps> = ({children})=> (
    <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CssBaseline/>
            <Box sx={{display: "grid", gridTemplateRows: "auto 1fr", height: "100vh"}}>
                {children}
                
            </Box>
        </LocalizationProvider>
    </ThemeProvider>
)
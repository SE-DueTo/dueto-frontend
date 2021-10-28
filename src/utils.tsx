import { ThemeProvider } from "@emotion/react"
import { LocalizationProvider } from "@mui/lab"
import { CssBaseline, Paper, useMediaQuery } from "@mui/material"
import { Box } from "@mui/system"
import { theme } from './theme'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DefaultHeader } from "./Header"
import { ReactChild, ReactFragment, ReactPortal } from "react"

type SiteProps= {
    children?: JSX.Element | JSX.Element[]
}

type heightWrapperProps = {
    children?: JSX.Element | JSX.Element[] | boolean | ReactChild | ReactFragment | ReactPortal
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
                <HeightWrapper>
                    <DefaultHeader/>
                    {children}
                </HeightWrapper>
                
            </Box>
        </LocalizationProvider>
    </ThemeProvider>
)

type RegisterLoginProps = {
    children?: JSX.Element | JSX.Element[]
}
export const RegisterLoginWrapper:React.FC<RegisterLoginProps> = ({children}) => {
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
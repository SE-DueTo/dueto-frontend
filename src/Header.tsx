import { useTheme } from "@emotion/react"
import { LocalAtm } from "@mui/icons-material"
import { AppBar, Toolbar, Typography } from "@mui/material"

export function DefaultHeader() {

    const theme:any = useTheme()

    return (
        <AppBar position="static">
        <Toolbar variant="dense">
            
            <LocalAtm sx={{color: theme.palette.warning.main, fontSize: 40}} />
            <Typography variant="h6" color="inherit" component="div" sx={{marginLeft: ".3em"}}>
             DueTo
            </Typography>
        </Toolbar>
        </AppBar>
    )
}
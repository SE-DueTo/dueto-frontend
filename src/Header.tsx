import { useTheme } from "@emotion/react"
import { LocalAtm } from "@mui/icons-material"
import { AppBar, Button, Toolbar, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Link } from "react-router-dom"

export function DefaultHeader() {

    const theme:any = useTheme()

    return (
        <AppBar position="static">
        <Toolbar variant="dense">
            
            <LocalAtm sx={{color: theme.palette.warning.main, fontSize: 40}} />
            <Typography 
                variant="h6" 
                color="inherit" 
                component="div" 
                sx={{
                    marginLeft: ".3em",
                    '& a': {
                        color: theme.palette.text.primary,
                        textDecoration: "none"
                    }
                }}
            >
                <Link to="/">DueTo</Link>
            </Typography>
            <Box sx={{flexGrow: 1}}/>
            <Button 
                variant="outlined" 
                sx={{
                    '& a': {
                        textDecoration: "none", 
                        color: theme.palette.primary.main
                    }
                }}
            >
                <Link to="/login">
                    Login
                </Link>
            </Button>
        </Toolbar>
        </AppBar>
    )
}
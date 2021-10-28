import { useTheme } from "@emotion/react"
import { LocalAtm } from "@mui/icons-material"
import { AppBar, Button, Toolbar, Typography } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"
import { Link } from "react-router-dom"

type DefaultHeaderProps = {
    showLogin: boolean
}
export const DefaultHeader:React.FC<DefaultHeaderProps> = ({showLogin}) => {

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
                {    
                    showLogin ? (
                    <Link to="/login">
                        Login
                    </Link>) : (
                        <Link to="/logout">
                        Logout
                    </Link>
                    )
                }
                </Button>
            </Toolbar>
        </AppBar>
    )
}
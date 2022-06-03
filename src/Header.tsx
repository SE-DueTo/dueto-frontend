import { LocalAtm } from "@mui/icons-material"
import { AppBar, Button, Toolbar, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Link } from "react-router-dom"

type DefaultHeaderProps = {
    showLogin: boolean
}
export function DefaultHeader({showLogin}:DefaultHeaderProps) {

    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                
                <LocalAtm sx={{color: "warning.main", fontSize: 40}} />
                <Typography 
                    variant="h6" 
                    color="inherit" 
                    component="div" 
                    sx={{
                        marginLeft: ".3em",
                        '& a': {
                            color: "text.primary",
                            textDecoration: "none"
                        }
                    }}
                >
                    <Link to="/">DueTo</Link>
                </Typography>
                <Box sx={{flexGrow: 1}}/>
                
                {
                    <Box sx={{
                        '& a': {
                            textDecoration: "none"
                        }
                    }}>
                        {!showLogin &&
                            <Button variant="outlined" sx={{marginRight: "5px"}}>Profile</Button>
                        }
                        <Link to={showLogin ? "/login" : "/logout"}>
                            <Button 
                                variant="outlined" 
                            >
                                {showLogin ? "Login" : "Logout"}
                            </Button>
                            
                        </Link>
                    </Box>
                }
            </Toolbar>
        </AppBar>
    )
}
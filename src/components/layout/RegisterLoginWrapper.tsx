import { Paper, useMediaQuery } from "@mui/material";

type RegisterLoginProps = {
    children?: JSX.Element | JSX.Element[]
}
function RegisterLoginWrapper({children}:RegisterLoginProps) {
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

export default RegisterLoginWrapper
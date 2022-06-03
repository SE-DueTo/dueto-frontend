import { Box } from "@mui/system";

type BackgroundProps = {
    children?: JSX.Element[] | JSX.Element
}

function Background({children}:BackgroundProps) {
    return (
        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            {children}
        </Box>
    )
}

export default Background
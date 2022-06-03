import { Box } from "@mui/material"
import { ReactFragment, ReactPortal } from "react"

type HeightWrapperProps = {
    children?: JSX.Element | JSX.Element[] | boolean | ReactFragment | ReactPortal
}
function HeightWrapper({children}:HeightWrapperProps) {
    return (
        <Box sx={{display: "grid", gridTemplateRows: "auto 1fr", height: "100vh"}}>
            {children}
        </Box>
    )
}

export default HeightWrapper
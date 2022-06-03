import { Box } from "@mui/material"
import Header from "./Header"
import CheckSiteLogin from "../login/CheckSiteLogin"
import HeightWrapper from "./HeightWrapper"

type SiteProps= {
    children?: JSX.Element | JSX.Element[]
    showLogin: boolean
    showAppBar?: boolean
}

function Site({children, showLogin, showAppBar=true}:SiteProps) {

    return (
        <CheckSiteLogin check={!showLogin}>
            <Box sx={{display: "grid", gridTemplateRows: "auto 1fr", height: "100vh"}}>
                <HeightWrapper>
                    {showAppBar && <Header showLogin={showLogin}/>}
                    {children}
                </HeightWrapper>
            </Box>
        </CheckSiteLogin>
    )
}

export default Site;
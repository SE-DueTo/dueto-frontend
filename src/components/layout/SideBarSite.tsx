import { Box } from "@mui/system"
import DashboardDataProvider from "../../context/DashboardDataProvider"
import DashboardSelector from "../navigation/DashboardSelector"


type SideBarSiteProps = {
    children: JSX.Element
}
function SideBarSite({children}:SideBarSiteProps) {

    return (
        <DashboardDataProvider>
            <Box 
                sx={{
                    display: "grid", 
                    gridTemplateColumns: "auto 1fr",
                }}
            >
                <DashboardSelector/>
                <Box>
                    {children}
                </Box>
            </Box>
        </DashboardDataProvider>
    )
}

export default SideBarSite
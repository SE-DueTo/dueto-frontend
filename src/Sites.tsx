import GroupDashboard from "./GroupDashboard"
import UserDashboard from "./UserDashboard"
import LoginRegisterStack from "./LoginRegisterStack"
import Logout from "./Logout"
import { Main } from "./Main"
import { Site } from "./utils"
import SideBarSite from "./SideBarSite"

export const LoginSite = () => {
    return (
        <Site showLogin={true}>
            <LoginRegisterStack/>
        </Site>
    )
}

export const UserDashboardSite = () => {
    return (
        <Site showLogin={false}>
            <SideBarSite>
                <UserDashboard/>
            </SideBarSite>
        </Site>
    )
}

export const GroupDashboardSite = () => {
    return (
        <Site showLogin={false}>
            <SideBarSite>
                <GroupDashboard/>
            </SideBarSite>
        </Site>
    )
}

export const MainSite = () => {
    return (
        <Site showLogin={true}>
            <Main/>
        </Site>
    )
}

export const LogoutSite = () => {
    return (
        <Site showAppBar={false} showLogin={false}>
            <Logout/>
        </Site>
    )
}
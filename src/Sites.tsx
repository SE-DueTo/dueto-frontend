import GroupDashboard from "./GroupDashboard"
import UserDashboard from "./UserDashboard"
import LoginRegisterStack from "./LoginRegisterStack"
import Logout from "./Logout"
import { Main } from "./Main"
import { Site } from "./utils"
import SideBarSite from "./SideBarSite"

export function LoginSite() {
    return (
        <Site showLogin={true}>
            <LoginRegisterStack/>
        </Site>
    )
}

export function UserDashboardSite() {
    return (
        <Site showLogin={false}>
            <SideBarSite>
                <UserDashboard/>
            </SideBarSite>
        </Site>
    )
}

export function GroupDashboardSite() {
    return (
        <Site showLogin={false}>
            <SideBarSite>
                <GroupDashboard/>
            </SideBarSite>
        </Site>
    )
}

export function MainSite() {
    return (
        <Site showLogin={true}>
            <Main/>
        </Site>
    )
}

export function LogoutSite() {
    return (
        <Site showAppBar={false} showLogin={false}>
            <Logout/>
        </Site>
    )
}
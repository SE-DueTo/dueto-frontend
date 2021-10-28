import Dashboard from "./Dashboard"
import LoginRegisterStack from "./LoginRegisterStack"
import Logout from "./Logout"
import { Main } from "./Main"
import { Site } from "./utils"

export const LoginSite = () => {
    return (
        <Site showLogin={true}>
            <LoginRegisterStack/>
        </Site>
    )
}

export const DashboardSite = () => {
    return (
        <Site showLogin={false}>
            <Dashboard/>
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
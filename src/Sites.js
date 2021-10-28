import Dashboard from "./Dashboard"
import LoginRegisterStack from "./LoginRegisterStack"
import { Main } from "./Main"
import { Site } from "./utils"

export const LoginSite = ()=>{
    return (
        <Site showLogin={true}>
            <LoginRegisterStack/>
        </Site>
    )
}

export const DashboardSite = ()=>{
    return (
        <Site showLogin={false}>
            <Dashboard/>
        </Site>
    )
}

export const MainSite = ()=>{
    return (
        <Main/>
    )
}
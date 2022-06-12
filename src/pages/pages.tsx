import GroupDashboard from "./group/GroupDashboard";
import LoginRegisterStack from "./login_register/LoginRegisterStack";
import Logout from "./logout/Logout";
import UserDashboard from "./dashboard/UserDashboard";
import Main from "./Main";

export const pages = [
    {
        url: "/",
        component: <Main/>,
        loginRequired: false,
        decorate: true,
    },{
        url: "/login",
        component: <LoginRegisterStack/>,
        loginRequired: false,
        decorate: true,
    },{
        url: "/register",
        component: <LoginRegisterStack/>,
        loginRequired: false,
        decorate: true,
    },{
        url: "/dashboard",
        component: <UserDashboard/>,
        loginRequired: true,
        decorate: true,
    },{
        url: "/group/*",
        component: <GroupDashboard/>,
        loginRequired: true,
        decorate: true,
    },{
        url: "/logout",
        component: <Logout/>,
        loginRequired: false,
        decorate: false,
    }
]
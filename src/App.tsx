import { Route, Routes } from 'react-router-dom'
import GroupDashboardSite from './GroupDashboardSite';
import LoginSite from './LoginSite';
import LogoutSite from './LogoutSite';
import MainSite from './MainSite';
import UserDashboardSite from './UserDashboardSite';



function App() {
    return (
        <Routes>
            <Route path="/" element={<MainSite/>}/>
            <Route path="/login" element={<LoginSite/>}/>
            <Route path="/register" element={<LoginSite/>}/>
            <Route path="/dashboard" element={<UserDashboardSite/>}/>
            <Route path="/group/*" element={<GroupDashboardSite/>}/>
            <Route path="/logout" element={<LogoutSite/>}/>
        </Routes>
    )
}

export default App;
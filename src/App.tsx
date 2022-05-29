import React from 'react';
import { Route, Routes } from 'react-router-dom'
import { GroupDashboardSite, LoginSite, LogoutSite, MainSite, UserDashboardSite } from './Sites';



const App:React.FC = () => {
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
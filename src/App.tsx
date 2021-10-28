import './App.css';
import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { DashboardSite, LoginSite, LogoutSite, MainSite } from './Sites';



const App:React.FC<{}> = () => {
    return (
        <Switch>
            <Route exact path="/" component={MainSite}/>
            <Route exact path={["/login", "/register"]} component={LoginSite}/>
            <Route exact path="/dashboard" component={DashboardSite}/>
            <Route exact path="/logout" component={LogoutSite}/>
        </Switch>
    )
}

export default App;
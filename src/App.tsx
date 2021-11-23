import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { GroupDashboardSite, LoginSite, LogoutSite, MainSite, UserDashboardSite } from './Sites';



const App:React.FC<{}> = () => {
    return (
        <Switch>
            <Route exact path="/" component={MainSite}/>
            <Route exact path={["/login", "/register"]} component={LoginSite}/>
            <Route exact path="/dashboard" component={UserDashboardSite}/>
            <Route exact path="/group/*" component={GroupDashboardSite}/>
            <Route exact path="/logout" component={LogoutSite}/>
        </Switch>
    )
}

export default App;
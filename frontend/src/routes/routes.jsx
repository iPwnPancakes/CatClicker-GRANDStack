import React from 'react';
import { Switch, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";

const Routes = (props) => {
    return (
        <Switch>
            <Route path='/' component={ Dashboard } exact/>
            {/*<Route path='/cat/:catID' component={CatContainer} exact/>*/ }
            <Route path='*'>s
                <h1>No Match</h1>
            </Route>
        </Switch>
    )
};

export default Routes;
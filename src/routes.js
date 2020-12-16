import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { isAutenticated } from './auth';

import Menu from './components/Menu';
import Login from './pages/Login/index.js';
import Logout from './pages/Logout'
import NotFound from './pages/404'
import Home from './pages/Home';


const PrivateRoute = ({ component: Component, ...rest }) => {
    return < Route
        {...rest}
        render={props => {
            return (
                isAutenticated() ?
                    (
                        <>
                            <Menu />
                            <Component {...props} />
                        </>
                    )
                    :
                    (<Redirect to={{ pathname: '/', state: { from: props.location } }} />)
            )
        }}
    />
}

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <PrivateRoute path="/home" component={Home} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Routes;
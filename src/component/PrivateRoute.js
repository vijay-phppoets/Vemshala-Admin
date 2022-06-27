import React from 'react'
import { Link, Redirect, Route } from 'react-router-dom'
import { isLogin } from '../utils'

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
                : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute
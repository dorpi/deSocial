import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropsTypes from 'prop-types'



const RedirectHomeRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props => auth.isAuthenticated ? 
            (<Redirect to="/dashboard" />): (<Component {...props}></Component>) }
    ></Route>
);


RedirectHomeRoute.PropsTypes = {
    auth: PropsTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth
})


export default connect(mapStateToProps)(RedirectHomeRoute);

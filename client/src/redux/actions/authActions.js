import { GET_ERRORS, SET_CURRENT_USER, AUTH_LOADING } from './types'
import {
    getLoginUserAccount,
    registerUserAccount,
    loginUserAccount,
    logoutUserAccount,
    deleteUserAccount
} from '../../services/userService';

//Register user
export const registerUser = (userData, history) => dispatch => {
    registerUserAccount(userData)
        .then(res => history.push('/login'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}

//Login - Get user token
export const loginUser = userData => dispatch => {
    loginUserAccount(userData)
        .then(res => {
            dispatch(setCurrentUser(res.data.user))
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
};


//Set logged in user
export const setCurrentUser = user => {

    return {
        type: SET_CURRENT_USER,
        payload: user
    }
}


//Logout user
export const logoutUser = () => dispatch => {
    logoutUserAccount()
        .then((result) => {
            //Alert something
        })
        .catch(err => {
            console.log(err)
        })
    dispatch(setCurrentUser({}));
}

// Set loading state
export const setAuthLoading = () => {
    return {
        type: AUTH_LOADING
    }
}

// Get login user
export const getLoginUser = () => dispatch => {
    getLoginUserAccount().then((res) => {

        dispatch(setCurrentUser(res.data));
    }).catch(err => {
        dispatch(setCurrentUser({}))
    })
}



//Delete account and profile
export const deleteAccount = () => dispatch => {
    if (window.confirm('Are you sure ? This can NOT be undone!')) {
        deleteUserAccount()
            .then(res => dispatch({
                type: SET_CURRENT_USER,
                payload: {}
            }))
            .catch(err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
    }
}
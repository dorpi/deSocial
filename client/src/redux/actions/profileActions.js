import axios from 'axios';
import {
    GET_PROFILE,
    CLEAR_CURRENT_PROFILE,
    PROFILE_LOADING,
    GET_ERRORS,
    SET_CURRENT_USER,
    GET_PROFILES,
    CLEAR_ERRORS
} from './types';


//Get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading())
    axios.get('/api/profile')
        .then(res => dispatch({
            type: GET_PROFILE,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_PROFILE,
            payload: null
        }))
}


//Get profile by handle
export const getProfileByhandle = (handle) => dispatch => {
    dispatch(setProfileLoading())
    axios.get(`/api/profile/handle/${handle}`)
        .then(res => dispatch({
            type: GET_PROFILE,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_PROFILE,
            payload: null
        }))
}



//Get profile by userId
export const getProfileByUserId = (userId) => dispatch => {
    dispatch(setProfileLoading())
    axios.get(`/api/profile/user/${userId}`)
        .then(res => {
            dispatch({
            type: GET_PROFILE,
            payload: res.data
        })})
        .catch(err => dispatch({
            type: GET_PROFILE,
            payload: null
        }))
}




//Set loading 
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}


//Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}

//Clear profile state
export const clearProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE,
    }
}
//Create Profile
export const createProfile = (profileData, history) => dispatch => {

    axios.post('/api/profile', profileData)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));

    return {
        type: CLEAR_CURRENT_PROFILE,
    }
}

//Delete account and profile
export const deleteAccount = () => dispatch => {
    if (window.confirm('Are you sure ? This can NOT be undone!')) {
        axios.delete('/api/profile')
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

//Add experience
export const addExperience = (expData, history) => dispatch => {
    axios.post('/api/profile/experience', expData)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))

}

//Add experience
export const addEducation = (eduData, history) => dispatch => {
    axios.post('/api/profile/education', eduData)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))

}

//Delete Experience
export const deleteExperience = (id) => dispatch => {
    axios.delete(`/api/profile/experience/${id}`)
        .then(res => dispatch({
            type: GET_PROFILE,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
        )
}


//Delete Education
export const deleteEducation = (id) => dispatch => {
    axios.delete(`/api/profile/education/${id}`)
        .then(res => dispatch({
            type: GET_PROFILE,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))

}

//Get all profiles
export const getProfiles = () => dispatch => {
    axios.get('/api/profile/all')
        .then(res => dispatch({
            type: GET_PROFILES,
            payload: res.data
        }))
        .catch(err =>{ 
            console.log(err)
            dispatch({
            type: GET_PROFILES,
            payload: err.response.data
        })
    })

}
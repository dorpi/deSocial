import {
    GET_PROFILE,
    CLEAR_CURRENT_PROFILE,
    PROFILE_LOADING,
    GET_ERRORS,
    GET_PROFILES,
    CLEAR_ERRORS
} from './types';
import {
    getCurrentUserProfile,
    getUserProfileByHandle,
    getUserProfileById,
    createUserProfile,
    addEducationToProfile,
    addExperienceToProfile,
    deleteExperienceFromProfile,
    deleteEducationToProfile,
    getAllProfilesServer
} from '../../services/profileService';

//Get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    getCurrentUserProfile()
        .then(res => {
            if (res.data) {
                dispatch({
                    type: GET_PROFILE,
                    payload: res.data
                })
            }
            else {
                dispatch({
                    type: GET_PROFILE,
                    payload: null
                })
            }
        })
        .catch(err => dispatch({
            type: GET_PROFILE,
            payload: null
        }))
}


//Get profile by handle
export const getProfileByHandle = (handle) => dispatch => {
    dispatch(setProfileLoading())
    getUserProfileByHandle(handle)
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
    getUserProfileById(userId)
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        })
        .catch(err => {

            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            dispatch({
                type: GET_PROFILE,
                payload: null
            })
        })
}


//Create Profile
export const createProfile = (profileData, history) => dispatch => {
    createUserProfile(profileData)
        .then(res => history.push('/dashboard'))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        }
        );
}


//Add experience
export const addExperience = (expData, history) => dispatch => {
    addExperienceToProfile(expData)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))

}

//Add experience
export const addEducation = (eduData, history) => dispatch => {
    addEducationToProfile(eduData)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))

}

//Delete Experience
export const deleteExperience = (userId) => dispatch => {

    deleteExperienceFromProfile(userId)
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
export const deleteEducation = (userId) => dispatch => {
    deleteEducationToProfile(userId)
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
    getAllProfilesServer()
        .then(res => {
            dispatch({
                type: GET_PROFILES,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_PROFILES,
                payload: err.response.data
            })
        })

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
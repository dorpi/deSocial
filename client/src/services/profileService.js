

import Axios from 'axios';

export const getCurrentUserProfile = ()=>{
    return  Axios.get('/api/profile');
}


export const getUserProfileByHandle = (handle)=>{
    return  Axios.get(`/api/profile/handle/${handle}`)
}

export const getUserProfileById = (userId)=>{
    return Axios.get(`/api/profile/${userId}`)
}

export const createUserProfile = (profileData)=>{
    return  Axios.post('/api/profile', profileData)
}


export const addExperienceToProfile = (expData)=>{
    return Axios.post('/api/profile/experience', expData)
}


export const addEducationToProfile = (eduData)=>{
    return Axios.post('/api/profile/education', eduData)
}



export const deleteExperienceFromProfile = (userId)=>{
    return Axios.delete(`/api/profile/experience/${userId}`)

}


export const deleteEducationToProfile = (userId)=>{
    return Axios.delete(`/api/profile/education/${userId}`)

}


export const getAllProfilesServer = ()=>{
    return Axios.get('/api/profile/all')

}






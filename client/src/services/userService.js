import Axios from 'axios'




export const deleteUserAccount = ()=>{
    return  Axios.delete('/api/users/delete')
}


export const registerUserAccount = (userData)=>{
    return Axios.post('/api/users/register', userData)
}


export const loginUserAccount = (userData)=>{
    return Axios.post('/api/users/login', userData)

}


export const logoutUserAccount = ()=>{
    return Axios.post('/api/users/logout')

}

export const getLoginUserAccount = ()=>{
    return Axios.get('/api/users')

}


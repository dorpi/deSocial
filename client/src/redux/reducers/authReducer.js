import {SET_CURRENT_USER,AUTH_LOADING} from '../actions/types'
import isEmpty from '../../validation/is-empty'

const initialState={
    isAuthenticated:false,
    user:{},
    loading:true
}

export default function(state=initialState,action){
    
    switch(action.type){
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user:action.payload,
                loading:false
            }
        case AUTH_LOADING:
            return{...state,loading:true}
        default:
            return state;            
    }
}


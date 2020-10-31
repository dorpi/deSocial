

import { POST_LOADING, GET_POSTS, GET_POST, ADD_POST, DELETE_POST, GET_ERRORS, CLEAR_ERRORS } from './types'

import {
    createPost, getPostById, unLikeUserPost, likeUserPost, getAllPostsServer, deleteUserPost
    , addUserComment, deleteUserComment
} from '../../services/postService'




//Add post
export const addPost = (postData) => dispatch => {
    dispatch(clearErrors());
    createPost(postData)
        .then(res => {
            dispatch({
                type: ADD_POST,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
}



//Get Post 
export const getPost = (id) => dispatch => {

    getPostById(id)
        .then(res => {
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch({
                type: GET_POST,
                payload: null
            }))
}

// Get all Posts
export const getAllPosts = () => dispatch => {
    dispatch(setPostLoading())
    getAllPostsServer()
        .then(res => {
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch({
                type: GET_POSTS,
                payload: null
            }))
}



// Delete Post
export const deletePost = (postId) => dispatch => {
    deleteUserPost(postId)
        .then(res => {
            dispatch({
                type: DELETE_POST,
                payload: postId
            })
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
}

//Add like 
export const addLike = (postId) => dispatch => {
    likeUserPost(postId)
        .then(res => {
            dispatch(getAllPosts())
        })
        .catch(err =>


            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
}


//Remove like 
export const removeLike = (postId) => dispatch => {
    unLikeUserPost(postId)
        .then(res => dispatch(getAllPosts()))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
}

//Add Comment
export const addComment = (postId, commentData) => dispatch => {
    dispatch(clearErrors());
    addUserComment(postId, commentData)
        .then(res => {
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
}

//Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {

    deleteUserComment(postId, commentId)
        .then(res => {
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
}

// Set loading state
export const setPostLoading = () => {
    return {
        type: POST_LOADING
    }
}

//Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}


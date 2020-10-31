import Axios from 'axios';

export const createPost = (postData) => {
    return Axios.post('/api/post', postData)
}

export const getPostById = (postId) => {
    return Axios.get(`/api/post/${postId}`)
}

export const getAllPostsServer = () => {
    return Axios.get('/api/post');
}

export const deleteUserPost = (postId) => {
    return Axios.delete(`/api/post/${postId}`)
}

export const likeUserPost = (postId) => {
    return Axios.post(`/api/post/like/${postId}`)
}

export const unLikeUserPost = (postId) => {
    return Axios.post(`/api/post/unlike/${postId}`)
}

export const addUserComment = (commentId, commentData) => {
    return Axios.post(`/api/post/comment/${commentId}`, commentData)
}

export const deleteUserComment = (postId, commentId) => {
    return Axios.delete(`/api/post/${postId}/comment/${commentId}`);
}


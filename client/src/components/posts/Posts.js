import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropsTypes from 'prop-types';
import {getAllPosts} from '../../redux/actions/postActions';

import Spinner from '../common/Spinner'
import PostForm from './PostForm';
import PostFeed from './PostFeed'

class Posts extends Component {

    componentDidMount(){
        this.props.getAllPosts();
    }
    render() {
        const {posts,loading} = this.props.post
        let postContent;
        if (posts===null ||loading){
            postContent = <Spinner/>
        }
        else {
            postContent = <PostFeed posts={posts}/>
        }

        return (
            <div className="feed">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <PostForm /> 
                            {postContent}
                         </div>
                    </div>
                </div>
            </div>
        )
    }
}


Posts.PropsTypes = {
    posts:PropsTypes.array.isRequired,
    post:PropsTypes.object.isRequired,
    getAllPosts:PropsTypes.func.isRequired
}
const mapStateToProps= state=>({
    post:state.post,
    posts:state.posts,

})

export default connect(mapStateToProps,{getAllPosts})(Posts);
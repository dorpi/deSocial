import React, { Component } from 'react'
import PropsTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {Link} from 'react-router-dom'; 
import {deletePost,addLike,removeLike} from '../../redux/actions/postActions'


 class PostItem extends Component {

    onLikeClick(postId){
        this.props.addLike(postId);
    }
    onUnLikeClick(postId){
        this.props.removeLike(postId);
    }
    onDeleteClick(postId){
        this.props.deletePost(postId);
    }
    findUserLike(likes){
        const{auth} = this.props
        if (likes.filter(like => like.user===auth.user.id).length>0){
            return true
        } 
        return false;
    }
    render() {
        const {post,auth,showActions} = this.props
        return (
            <div className="card card-body mb-3">
              <div className="row">
                <div className="col-md-2">
                  <Link to={`/profile/user/${post.user}`}> 
                    <img className="rounded-circle d-none d-md-block" src={post.avatar}
                      alt="" />
                  </Link>
                  <br />
                  <p className="text-center">{post.name}</p>
                </div>
                <div className="col-md-10" >
                  <p  style={{fontSize:'1.5vw'}}>{post.text}</p>
                  {showActions?(<span className="position-absolute " style ={{bottom:0, right:0}}>
                    <button type="button" className="btn btn-light mr-1" onClick={this.onLikeClick.bind(this,post._id)}>
                    <i className={classnames('fas fa-thumbs-up', 
                    {'text-info':this.findUserLike(post.likes)}
                    )}
                    />
                    <span className="badge badge-light">{post.likes.length}</span>
                  </button>
                  <button type="button" className="btn btn-light mr-1"  onClick={this.onUnLikeClick.bind(this,post._id)}>
                    <i className="text-secondary fas fa-thumbs-down"></i>
                  </button>
                  <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  {post.comments.length} Comments 
                </Link>
                {post.user ===auth.user.id ? 
                (<button type="button" onClick={this.onDeleteClick.bind(this,post._id)} className="btn btn-danger mr-1">
                    <i className="fas fa-times"/>
                </button>)
                :null}
                   
                  </span>):null}
                </div>
              </div>
            </div>

        )
    }
}

PostItem.defaultProps = {
  showActions : true
}


PostItem.PropsTypes = {
    auth:PropsTypes.object.isRequired,
    post:PropsTypes.object.isRequired,
    deletePost: PropsTypes.func.isRequired,
    removeLike: PropsTypes.func.isRequired,
    addLike: PropsTypes.func.isRequired
}

const mapStateToProps =state=> ({
    auth:state.auth
})


export default connect(mapStateToProps,{deletePost,addLike,removeLike})(PostItem);
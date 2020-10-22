import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropsTypes from 'prop-types';
import {deleteComment} from '../../redux/actions/postActions';
import {toAbsoluteUrl} from '../common/AssetsHelper'


 class CommentItem extends Component {


    onDeleteClick(postId,commentId){
        this.props.deleteComment(postId,commentId);
    }

    render() {

        const {comment,postId,auth} = this.props

        
        return (
             <div className="card card-body mb-3">
              <div className="row">
                <div className="col-md-2">
                  <a href="profile.html">
                    <img className="rounded-circle d-none d-md-block" src={`${toAbsoluteUrl(comment.avatar)}?random=${Math.random()}`} alt="" />
                  </a>
                  <br />
                  <p className="text-center">{comment.name}</p>
                </div>
                <div className="col-md-10">
                  <p  style={{fontSize:'1.5vw'}}>{comment.text}</p>
                  {comment.user ===auth.user.id ? 
                (<button type="button" onClick={this.onDeleteClick.bind(this,postId,comment._id)} className="btn btn-danger mr-1 position-absolute" style={{bottom:0,right:0}}>
                    <i className="fas fa-times"/>
                </button>)
                :null}


                </div>
              </div>
            </div>
        )
    }
}

CommentItem.PropsTypes = {
    postId:PropsTypes.string.isRequired,
    deleteComment:PropsTypes.func.isRequired,
    auth:PropsTypes.object.isRequired,
    comment:PropsTypes.object.isRequired
}
const mapStateToProps = state =>({
    auth:state.auth,

})

export default connect(mapStateToProps,{deleteComment})(CommentItem);
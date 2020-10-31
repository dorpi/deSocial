import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropsTypes from 'prop-types';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import {addPost} from '../../redux/actions/postActions';


 class PostForm extends Component {
     constructor(props){
         super(props);
         this.state ={
             text:'',
             errors:{}
         }
         this.onChange=this.onChange.bind(this)
         this.onSubmit=this.onSubmit.bind(this)
     }

     

     componentDidUpdate(prevProps){
       if (prevProps.errors !== this.props.errors){
        this.setState({errors:this.props.errors})
       }
     }

     onChange(e){
      this.setState({errors:{
          ...this.state.errors,
          [e.target.name]:''
      }});
      this.setState({[e.target.name]:e.target.value});
  }

     onSubmit(e){
        e.preventDefault();
        const {user} = this.props.auth;
        const newPost = {
            text:this.state.text,
            name:user.name,
        }
        this.props.addPost(newPost)
        this.setState({text:''})
     }
     
    render() {
        const {errors}= this.state

        return (
            <div className="post-form mb-3">
            <div className="card card-info">
              <div className="card-header bg-info text-white">
                Say Somthing...
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}> 
                  <div className="form-group">
                   <TextAreaFieldGroup
                    placeholder="Create A Post"
                    name="text"
                    value={this.state.text}
                    onChange = {this.onChange}
                    error={errors.text}
                   />
                  </div>
                  <button type="submit" className="btn btn-dark">Submit</button>
                </form>
              </div>
            </div>
          </div>
        )
    }
}

PostForm.PropsTypes = {
    errors:PropsTypes.object.isRequired,
    auth:PropsTypes.object.isRequired,
    addPost:PropsTypes.func.isRequired
}


const mapStateToProps  = state=>({
    auth:state.auth,
    errors:state.errors 
})


export default connect(mapStateToProps,{addPost})(PostForm);
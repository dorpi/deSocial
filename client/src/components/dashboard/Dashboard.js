import React, { Component } from 'react'
import PropsTypes from 'prop-types';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import {getCurrentProfile} from '../../redux/actions/profileActions'
import {deleteAccount} from '../../redux/actions/authActions'
import Spinner from '../common/Spinner'
import ProfileActions from './ProfileActions'
import Experience from './Experience';
import Education from './Education';



 class Dashboard extends Component {
     componentDidMount(){
        this.props.getCurrentProfile();
     }
     
     onDeleteClick(event){
        this.props.deleteAccount();
        
     }
    
    render() {
        const {user}=this.props.auth;
        const {profile,loading} = this.props.profile;
        let dashboardContent;



        if (loading) {// from redux profile reducer
            dashboardContent = <Spinner/>;
        }
        else if (profile ===null ){
            //User login but no profile
            dashboardContent = (<div>
                <p className="lead text-muted">Welcome {user.name}</p>
                <p>You have not setup a profile, Please add info</p>
                <Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>
            </div>)
        }
        else if (Object.keys(profile).length>0){
            dashboardContent = (<div>
                <p className="lead text-muted">Welcome <Link to={`/profile/user/${profile.user._id}`} >{user.name}</Link></p>
                <ProfileActions/>
                <Experience experience={profile.experience}/>
                <Education education={profile.education}/>
                <div style={{marginBottom:'60px'}} >
                <button className="btn btn-danger" onClick={this.onDeleteClick.bind(this)}>Delete My account</button>   
                </div>

                </div>
            )
        }

        return (
            <div className="dashboard">
               <div className="container">
                   <div className="row">
                       <div className = "col-md-12">
                           <h1 className="display-4 text-center">Dashboard</h1>
                            {dashboardContent}
                       </div>
                   </div>
               </div>
            </div>
        )
    }
}

Dashboard.PropsTypes = {
    getCurrentProfile:PropsTypes.func.isRequired, 
    profile:PropsTypes.object.isRequired,
    auth:PropsTypes.object.isRequired,
    deleteAccount:PropsTypes.func.isRequired
}


const mapStateToProps = state =>({
    profile:state.profile,
    auth:state.auth
})



export default connect(mapStateToProps,{getCurrentProfile,deleteAccount})(Dashboard)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropsType from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import ProfileAbout from './ProfileAbout';
import Spinner from '../common/Spinner';
import { getProfileByUserId,clearProfile} from '../../redux/actions/profileActions'


class Profile extends Component {

    componentDidMount() {
        
        if (this.props.match.params.userId)
            this.props.getProfileByUserId(this.props.match.params.userId);
    }

    componentDidUpdate(prevProps,prevStates){
        
        if (prevProps.profile !== this.props.profile){
            if (this.props.profile.profile === null &&  !this.props.profile.loading){
                console.log("NOT found")
                this.props.history.push('/not-found')
            } 
        }
    }

    render() {
        const { profile, loading } = this.props.profile
        let profileContent;
        if (profile === null  || loading) {
            profileContent = <Spinner />
        }
        else {
            profileContent = (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/profiles" className="btn btn-light mb-3 float-left">Back To Profiles</Link>
                        </div>

                        </div>
                            <ProfileHeader profile={profile}/>
                            <ProfileAbout profile={profile}/>
                            <ProfileCreds education={profile.education} experience={profile.experience}/> 
                            {
                            profile.githubusername?  <ProfileGithub username={profile.githubusername}/>:null}
                          
                </div>
            )
        }

        return (
            <div className="profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {profileContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Profile.PropsType = {
    profile: PropsType.object.isRequired,
    getProfileByhandle: PropsType.func.isRequired
}


const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, {getProfileByUserId,clearProfile})(Profile);
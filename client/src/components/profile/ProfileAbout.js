import React, { Component } from 'react'
import PropsTypes from 'prop-types'
import isEmpty from '../../validation/is-empty'

 class ProfileAbout extends Component {
    

    render() {
        const {profile} = this.props;

        //Get first name
        const firstName = profile.user.name.trim().split(' ')[0];
        //Skill set
        const skillSet= profile.skills.map((skill,index)=>(
            <div key={index} className="p-3">
            <i className="fa fa-check"></i>{skill}</div>
        ));


        return (
            <div className="row">
            <div className="col-md-12">
              <div className="card card-body bg-light mb-3">
                <h3 className="text-center text-info">{firstName}'s Bio</h3>
                <p className="lead">{isEmpty(profile.bio)?(<span>{firstName} needs to add Bio</span>): (<span>{profile.bio}</span>)}
                </p>
                <hr />
                <h3 className="text-center text-info">Skill Set</h3>
                <div className="row"> 
                  {skillSet}
                </div>
              </div>
            </div>
          </div>
        )
    }
}


ProfileAbout.PropsTypes= {
    profile :PropsTypes.object.isRequired
}

export default ProfileAbout;
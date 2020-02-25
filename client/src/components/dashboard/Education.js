import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropsTypes from 'prop-types';

import Moment  from 'react-moment';
import {deleteEducation} from '../../redux/actions/profileActions'
 class Education extends Component {


    onDelete(id){
        this.props.deleteEducation(id)
    }
    render() {
        const education = this.props.education.map(edu=>(
            <tr key={edu._id}>
                <td>{edu.school}</td>
                <td>{edu.degree}</td>
                <td>{edu.fieldofstudy}</td>
                <td><Moment format="DD/MM/YYYY">{edu.from}</Moment> -  
        {edu.to === null || edu.to===""?
        (' Now'):(<Moment format="DD/MM/YYYY">{edu.to}</Moment>)}
        </td>
                <td><button className='btn btn-danger' onClick={this.onDelete.bind(this,edu._id)}>Delete</button></td>
            </tr>
        ))
        return (
            <div >
                <h4 className="mb-4">Education Credentials:</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>School</th>
                            <th>Degree</th>
                            <th>Field Of Study</th>
                            <th>Years</th>
                            <th></th>
                           
                        </tr>
                      
                            {education}
                        
                    </thead>
                </table>
                
            </div>
        )
    }
}

Education.PropsTypes={
    deleteEducation:PropsTypes.func.isRequired
}




export default connect(null,{deleteEducation})(Education)
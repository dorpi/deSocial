import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import PropsTypes from 'prop-types';
import { addEducation } from '../../redux/actions/profileActions'

class AddEducation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            school: '',
            degree: '',
            fieldofstudy: '',
            from: '',
            to: '',
            current: false,
            description: '',
            errors: {},
            disabled: false
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onCheck = this.onCheck.bind(this)

    }


    componentDidUpdate(prevProps) {
        if (prevProps.errors !== this.props.errors) {
            this.setState({ errors: this.props.errors })
        }
    }

    onSubmit(e) {
        e.preventDefault();
        //Get experience details
        const expData = {
            school: this.state.school,
            degree: this.state.degree,
            fieldofstudy: this.state.fieldofstudy,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description,

        }
        //action
        this.props.addEducation(expData, this.props.history)
    }
    onCheck(e) {
        this.setState({
            current: !this.state.current,
            disabled: !this.state.disabled
        });
    }
    onChange(e) {
        this.setState({
            errors: {
                ...this.state.errors,
                [e.target.name]: ''
            }
        });
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        const { errors } = this.state;

        return (
            <div className="section add-experience">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to='/dashboard' className="btn btn-light">Go Back</Link>
                            <h1 className="display-4 text-center">Add Your Education</h1>
                            <p className="lead text-center">Add any school, bootcamp, etc that you have attended</p>
                            <small className="d-block pb-3">* = required field</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* School"
                                    name="school"
                                    value={this.state.school}
                                    onChange={this.onChange}
                                    error={errors.school}
                                />
                                <TextFieldGroup
                                    placeholder="* Degree"
                                    name="degree"
                                    value={this.state.degree}
                                    onChange={this.onChange}
                                    error={errors.degree}
                                />
                                <TextFieldGroup
                                    placeholder="* Field Of Study"
                                    name="fieldofstudy"
                                    value={this.state.fieldofstudy}
                                    onChange={this.onChange}
                                    error={errors.fieldofstudy}
                                />
                                <h6>From Date</h6>
                                <TextFieldGroup
                                    type="date"
                                    placeholder="From"
                                    name="from"
                                    value={this.state.from}
                                    onChange={this.onChange}
                                    error={errors.from}

                                />
                                <h6>To Date</h6>
                                <TextFieldGroup
                                    type="date"
                                    placeholder="To"
                                    name="to"
                                    value={this.state.to}
                                    onChange={this.onChange}
                                    error={errors.to}
                                    disabled={this.state.disabled ? 'disabled' : ''}
                                />
                                <div className="form-check mb-4">
                                    <input
                                        type="checkBox"
                                        className="form-check-input"
                                        name="current"
                                        value={this.state.current}
                                        checked={this.state.current}
                                        onChange={this.onCheck}
                                        id="current"

                                    />
                                    <label htmlFor="current" className="form-check-label">Currently study</label>
                                </div>

                                <TextAreaFieldGroup
                                    placeholder="Job Description"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    error={errors.description}
                                    info="Tell us about the position"
                                />
                                <input type="submit" value="Submit" className="btn btn-info btn-block"></input>
                            </form>

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

AddEducation.PropsTypes = {
    profile: PropsTypes.object.isRequired,
    errors: PropsTypes.object.isRequired,
    addEducation: PropsTypes.func.isRequired
}


const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})
export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation))
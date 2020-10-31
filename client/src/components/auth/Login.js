import React, { Component } from 'react';
import PropsTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser, setAuthLoading, setCurrentUser } from '../../redux/actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import Spinner from '../common/Spinner'

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }


    componentDidMount() {
       
        if (this.props.auth.isAuthenticated && !this.props.auth.loading) {
            this.props.history.push('/dashboard')
        }
        else if (!this.props.auth.loading){
                this.props.setCurrentUser({});
            }
    }



    componentDidUpdate(prevProps) {
        if (prevProps.errors !== this.props.errors) {
            this.setState({ errors: this.props.errors })
        }
        else if (prevProps.auth.isAuthenticated !== this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
    }


    onSubmit(event) {
        event.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
        }

        this.props.loginUser(user);
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


        if (this.props.auth.loading)
            return <Spinner />
        else
            return (
                <div className="login">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h1 className="display-4 text-center">Log In</h1>
                                <p className="lead text-center">Sign in to your DevConnector account</p>
                                <form onSubmit={this.onSubmit} noValidate>
                                    <TextFieldGroup
                                        name="email"
                                        type="email"
                                        value={this.state.email}
                                        error={errors.email}
                                        onChange={this.onChange}
                                        placeholder="Email Address"
                                    />

                                    <TextFieldGroup
                                        name="password"
                                        type="password"
                                        value={this.state.password}
                                        error={errors.password}
                                        onChange={this.onChange}
                                        placeholder="Password"
                                    />

                                    <input type="submit" className="btn btn-info btn-block mt-4" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )
    }
}

Login.PropsTypes = {
    loginUser: PropsTypes.func.isRequired,
    auth: PropsTypes.object.isRequired,
    errors: PropsTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps, { loginUser,setAuthLoading,setCurrentUser })(Login);
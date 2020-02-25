import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropsType from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/authActions'
import { clearProfile } from '../../redux/actions/profileActions'


class Navbar extends Component {

  onLogoutClick(event) {
    event.preventDefault();
    this.props.clearProfile();
    this.props.logoutUser();

  }


  render() {

    const { isAuthenticated } = this.props.auth

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/feed">Post Feed</Link>
        </li>
        <li><a href='/#' onClick={this.onLogoutClick.bind(this)} className="nav-link">
          Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
      </ul>);

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top  navbar-header">
        <div className="container">
          <Link className="navbar-brand" to="/">DeSocial</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles"> Developers
            </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    )
  }
}

Navbar.PropsType = {
  logoutUser: PropsType.func.isRequired,
  auth: PropsType.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logoutUser, clearProfile })(Navbar);
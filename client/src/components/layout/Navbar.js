import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropsType from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/authActions'
import { clearProfile } from '../../redux/actions/profileActions'



class Navbar extends Component {

  state = {
    isNavCollapsed: true
  }

  handleNavCollapse = () => this.setState(prevState => ({
    isNavCollapsed: !prevState.isNavCollapsed,
  }));

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
        <li>
          <a href='/#' onClick={this.onLogoutClick.bind(this)} className="nav-link">
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
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark ">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="navbar-brand" to="/">DeSocial</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/profiles">Developers</Link>
          </li>
        </ul>
        <button
          className="custom-toggler navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#nav-mobile"
          aria-controls="nav-mobile"
          aria-expanded={!this.state.isNavCollapsed ? true : false}
          aria-label="Toggle navigation" onClick={() => this.handleNavCollapse()}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`${this.state.isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="nav-mobile">
          {isAuthenticated ? authLinks : guestLinks}
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
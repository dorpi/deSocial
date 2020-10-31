import React,{useEffect} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {Provider} from 'react-redux';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile';
import NotFound from './components/not-found/NotFound';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import store from './redux/store'
import { getLoginUser}from './redux/actions/authActions';


import PrivateRoute from './components/common/PrivateRoute'

import RedirectHomeRoute from './components/common/RedirectRoute'
import axios from 'axios'
import './App.css';



function App(props) {

  useEffect(() => {
    axios.defaults.baseURL = 'https://whispering-dawn-73999.herokuapp.com/';
    axios.defaults.withCredentials = true  
    store.dispatch(getLoginUser());
  },[])
    

  return (
    <Provider store={store}>
      <BrowserRouter >
        <div className="App">
          <Navbar/>
          
          <div className="container pb-5" style={{paddingTop:'4rem'}}>
          <Switch>
          
            <RedirectHomeRoute exact path="/" component={Landing} />
            <RedirectHomeRoute exact path="/login" component={Login} />
            <RedirectHomeRoute exact path="/register" component={Register} />
         
            <Route exact path="/profiles" component={Profiles} />  
            <Route exact path="/profile/user/:userId" component={Profile} />
            </Switch>
            <Switch>
            <PrivateRoute exact path="/create-profile" component={CreateProfile} />
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            <PrivateRoute exact path="/add-experience" component={AddExperience} />
            <PrivateRoute exact path="/add-education" component={AddEducation} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/feed" component={Posts} />
            <PrivateRoute exact path="/post/:id" component={Post} />
            </Switch>
          
            <Route exact path="/not-found" component={NotFound} />
          </div>
          <Footer/>
        </div>
      </BrowserRouter>
    </Provider>
  );
}
export default App;

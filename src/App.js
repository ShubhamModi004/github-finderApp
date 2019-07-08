import React, { useState, Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Users from './components/user/Users';
import Search from './components/user/Search';
import Alert from './components/layout/Alert';
import axios from 'axios';
import './App.css';

// importing about
import About from './components/pages/About';
import User from './components/user/User';


let githubCLientId;
let githubCLientSecret;

if (process.env.NODE_ENV !== 'production') {
  githubCLientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubCLientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubCLientId = process.env.GITHUB_CLIENT_ID;
  githubCLientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlerts] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const res = await axios.get(`https://api.github.com/users?client_id=${githubCLientId}&client_secret=${githubCLientSecret}`);
      setUsers(res.data);
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line
  }, [])

  const searchUsers = async (text) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${githubCLientId}&client_secret=${githubCLientSecret}`);
    setUsers(res.data.items);
    setLoading(false);
  }

  // get a single 
  const getUser = async (username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}?&client_id=${githubCLientId}&client_secret=${githubCLientSecret}`);
    setUser(res.data);
    setLoading(false);
  }
  // get user repos 
  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubCLientId}&client_secret=${githubCLientSecret}`);
    setRepos(res.data);
    setLoading(false);
  }

  // create a users 
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  }

  // Set Alert
  const setAlert = (msg, type) => {
    setAlerts({ msg, type });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  }
  return (
    <Router>
      <div className="App">
        <Navbar title='Github Finder' icon="fab fa-github" />
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Fragment>
                  <Search searchUsers={searchUsers} clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={setAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )}
            />
            <Route exact path="/about" component={About} />
            <Route
              exact
              path='/user/:login'
              render={props => (
                <User
                  {...props}
                  getUserRepos={getUserRepos}
                  getUser={getUser}
                  user={user}
                  loading={loading}
                  repos={repos}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>

  );
}

export default App;

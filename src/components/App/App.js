import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import Dashboard from "../Dashboard/Dashboard";
import Nav from "../Nav";
import Login from "../Login/Login";
import Auth from "../Auth/Auth";
import Student from "../Student/Student";

import { OAUTH_SERVER_URI } from "../../config";

import "./App.css";

class App extends Component {
  state = {
    code: "",
    state: "",
    token: "",
    user: {}
  };

  componentDidMount = () => {
    const { token } = window.localStorage;

    const { user } = this.state;
    if (token && !user.login) {
      this.setUserWithToken(token);
    }
  };

  componentDidUpdate = nextProps => {
    const { user } = this.state;
    if (user.login) return;
    else if (this.state.state === window.localStorage.state) {
      axios({
        url: OAUTH_SERVER_URI + this.state.code,
        json: true
      })
        .then(({ data }) => {
          const { token } = data;
          if (!token) return null;
          window.localStorage.removeItem("state");
          window.localStorage.setItem("token", token);
          return token;
        })
        .then(token => {
          this.setUserWithToken(token);
        });
    } else return;
  };

  setUserWithToken = token => {
    let user;
    axios({
      url: "https://api.github.com/user",
      method: "GET",
      headers: {
        Authorization: `token ${token}`
      }
    }).then(response => {
      user = response.data;
      this.setState(prevState => {
        return this.state.token ? { user } : { user, token };
      });
    });
  };

  propogateCode = query => {
    this.setState(() => {
      return {
        code: query.code,
        state: query.state
      };
    });
  };

  filterStudents = term => {
    return null;
    //   if (term === '') {
    //     this.setState({ displayedStudents: this.state.allStudents })
    //   } else {
    //     const displayedStudents = this.state.allStudents.filter(({ login }) => (
    // login.includes(term)
    //     ))
    //     this.setState({ displayedStudents })
    //   }
  };

  render() {
    const { user } = this.state;
    const { token } = window.localStorage;
    return (
      <div className="App">
        <Route
          path="/"
          render={() => (
            <Nav filterStudents={this.filterStudents} user={user} />
          )}
        />
        {!token ? (
          <div>
            <Route path="/login" component={Login} />
            <Route
              path="/auth/callback"
              render={props => (
                <Auth propogateCode={this.propogateCode} {...props} />
              )}
            />
          </div>
        ) : (
          <div>
            <Route
              exact
              path="/"
              render={() => (
                <div>
                  Welcome, {user.name || user.login}! Go to your{" "}
                  <Link to="/dashboard">Dashboard</Link>
                </div>
              )}
            />
            <Route
              path="/dashboard"
              render={() => (
                <Dashboard user={this.state.user} token={this.state.token} />
              )}
            />
            <Route path="/students/:student" component={Student} />
          </div>
        )}
      </div>
    );
  }
}

export default connect()(App);

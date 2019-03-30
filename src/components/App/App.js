import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import axios from "axios";

import Dashboard from "../Dashboard/Dashboard";
import Login from "../Login/Login";
import Auth from "../Auth/Auth";
import Student from "../Student/Student";

import "./App.css";

const url = "https://githubserver.herokuapp.com/authenticate/";
const devUrl = "http://localhost:9999/authenticate/";

class App extends Component {
  state = {
    code: "",
    state: "",
    token: "",
    user: {}
  };

  componentDidMount = () => {
    const { token } = window.localStorage;
    console.log("component mounted, is localStorage.token undefined?");
    console.log("CDM -- token:", token);

    const { user } = this.state;
    if (token && !user.login) {
      this.setUserWithToken(token);
    }
  };

  componentDidUpdate = nextProps => {
    const { user } = this.state;
    if (user.login) return;
    else if (this.state.state === window.localStorage.state) {
      console.group(
        "state.state and localStorage.state the same, authenticationg:"
      );
      console.log("this.state.state", this.state.state);
      console.log("window.localStorage.state", window.localStorage.state);
      console.groupEnd();
      axios({
        url: url + this.state.code,
        json: true
      })
        .then(({ data }) => {
          const { token } = data;
          console.log("component updated, token undefined as a string?");
          console.log("data:", data);
          console.log("token:", token);

          if (!token) {
            console.log("token undefined, bailing out:", token);
            return null;
          }

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

  handleLogin = e => this.props.dispatch(push("/login"));

  propogateCode = query => {
    this.setState(() => {
      return {
        code: query.code,
        state: query.state
      };
    });
  };

  render() {
    const { user } = this.state;
    const { token } = window.localStorage;
    return (
      <div className="App">
        {!token ? (
          <div>
            <div className="Login button">
              <button onClick={this.handleLogin}>Login with Github</button>
            </div>
            <div>
              <Route path="/login" component={Login} />
              <Route
                path="/auth/callback"
                render={props => (
                  <Auth propogateCode={this.propogateCode} {...props} />
                )}
              />
            </div>
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

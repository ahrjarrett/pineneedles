import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";

import Dashboard from "../Dashboard/Dashboard";
import Nav from "../Nav";
import Login from "../Login/Login";
import Auth from "../Auth/Auth";
import Student from "../Student/Student";

import "./App.css";

class App extends Component {
  render() {
    const { user } = this.props;
    const { token } = window.localStorage;
    return (
      <div className="App">
        <Route path="/" render={() => <Nav filterStudents={() => null} />} />
        {!token ? (
          <div>
            <Route path="/login" component={Login} />
            <Route path="/auth/callback" component={Auth} />
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
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/students/:student" component={Student} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(App);

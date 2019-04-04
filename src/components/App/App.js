import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";

import Dashboard from "../Dashboard/Dashboard";
import Nav from "../Nav";
import Login from "../Login/Login";
import Auth from "../Auth/Auth";
import Student from "../Student/Student";

import { setUserWithToken } from "../../redux/actions/auth";
import "./App.css";

class App extends Component {
  componentDidMount() {
    const { token } = window.localStorage;
    const { isLoggedIn, setUserWithToken } = this.props;
    if (token && !isLoggedIn) {
      setUserWithToken(token);
    }
  }

  render() {
    const { isLoggedIn, user } = this.props;
    return (
      <div className="App">
        <Route path="/" render={() => <Nav filterStudents={() => null} />} />
        {!isLoggedIn ? (
          <div>
            <Route path="/login" component={Login} />
            <Route path="/auth/callback" component={Auth} />
          </div>
        ) : (
          <div>
            <Route
              path="/welcome"
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
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { setUserWithToken }
)(App);

import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import qs from "qs";
import {
  getUserToken,
  propogateCode,
  setUserWithToken
} from "../../redux/actions/auth";

class Auth extends Component {
  componentDidMount() {
    const { token } = window.localStorage;
    const { location, propogateCode, setUserWithToken, user } = this.props;
    if (token && !user.login) {
      setUserWithToken(token);
      return;
    }

    const query = qs.parse(location.search.slice(1));
    propogateCode({ code: query.code, state: query.state });
  }

  componentDidUpdate(prevProps) {
    const { user, code, state, getUserToken } = this.props;
    if (user.login) {
      console.log("user exists!", user);
      return;
    } else if (state === window.localStorage.state) {
      if (code && !prevProps.code) {
        console.log("code, when no previous code!");
        getUserToken(code);
      }
    } else return;
  }

  render() {
    const { code, state } = this.props;
    return (
      <div className="Auth">
        Redirected from Github.
        <br />
        Code: {code}
        <br />
        State: {state}
        {/* <Redirect to="/" /> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  code: state.auth.code,
  state: state.auth.state
});

const mapDispatchToProps = { getUserToken, propogateCode, setUserWithToken };

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Auth);

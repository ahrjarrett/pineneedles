import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import qs from "qs";

class Auth extends Component {
  state = { code: "", state: "" };

  componentDidMount = () => {
    const { location } = this.props;
    // slice search to remove ? from beginning of query
    const query = qs.parse(location.search.slice(1));
    this.setState(() => {
      return { code: query.code, state: query.state };
    });
    this.props.propogateCode(query);
  };

  render() {
    return (
      <div className="Auth">
        Redirected from Github.
        <br />
        Code: {this.state.code}
        <br />
        State: {this.state.state}
        <Redirect to="/" />
      </div>
    );
  }
}

export default compose(
  withRouter,
  connect(
    null,
    null
  )
)(Auth);

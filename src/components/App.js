import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import Router from "./Router";

import { setUserWithToken } from "../redux/actions/auth";

class App extends Component {
  componentDidMount() {
    const { token } = window.localStorage;
    const { isLoggedIn, setUserWithToken } = this.props;
    if (token && !isLoggedIn) {
      setUserWithToken(token);
    }
  }

  render() {
    return (
      <AppStyles>
        <div className="container">
          <div className="content-wrapper">
            <h1 className="App-title">Pineneedles</h1>
          </div>
          <Router />
        </div>
      </AppStyles>
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

const AppStyles = styled.div`
  /* text-align: center; */
  margin: 0 auto;

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: left;
    background-color: #fff;
  }

  a:hover {
    text-decoration: none;
  }

  .container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;

    @media only screen and (min-width: 576px) {
      max-width: 540px;
    }
    @media only screen and (min-width: 768px) {
      max-width: 720px;
    }
    @media only screen and (min-width: 992px) {
      max-width: 960px;
    }
    @media (min-width: 1200px) {
      max-width: 1140px;
    }
  }

  .content-wrapper {
    width: 100%;
    margin-top: 56px;
    padding-top: 72px;
  }

  h1.App-title {
    font-size: 32px;
    font-weight: 600;
    line-height: 30px;
  }
`;

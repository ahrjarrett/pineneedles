import React from "react";
import qs from "qs";
import { v4 } from "uuid";
import { CLIENT_ID, CLIENT_SECRET } from "../config";

const REDIRECT_ROUTE = "https://github.com/login/oauth/authorize?";
const CURRENT_ROUTE = window.location.origin;
const state = v4();

const queryString = qs.stringify({
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
  redirect_uri: CURRENT_ROUTE + "/auth/callback",
  scope: "user,repo",
  state: state
});

const Login = () => {
  return (
    <div className="Login">
      Login route
      {(window.location = `${REDIRECT_ROUTE}${queryString}`)}
      {window.localStorage.setItem("state", state)}
    </div>
  );
};

export default Login;

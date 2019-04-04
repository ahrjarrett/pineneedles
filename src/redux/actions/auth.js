import { push } from "connected-react-router";
import axios from "axios";
import qs from "qs";
import { v4 } from "uuid";

import {
  INIT_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  PROPOGATE_CODE,
  SET_OAUTH_STATE
} from "./types";

import { CLIENT_ID, CLIENT_SECRET, OAUTH_SERVER_URI } from "../../config";

const REDIRECT_ROUTE = "https://github.com/login/oauth/authorize?";

export const handleLogin = () => dispatch => {
  dispatch({ type: INIT_LOGIN });
  const CURRENT_ROUTE = window.location.origin;
  const state = v4();
  const queryString = qs.stringify({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: CURRENT_ROUTE + "/auth/callback",
    scope: "user,repo",
    state: state
  });
  const location = `${REDIRECT_ROUTE}${queryString}`;
  dispatch({ type: SET_OAUTH_STATE, payload: state });
  window.localStorage.setItem("state", state);
  window.location = location;
};

export const getUserToken = code => dispatch => {
  axios({
    url: OAUTH_SERVER_URI + code,
    json: true
  })
    .then(({ data }) => {
      const { token } = data;
      if (!token) return null;
      window.localStorage.removeItem("state");
      window.localStorage.setItem("token", token);
      // return token;
      dispatch(setUserWithToken(token));
    })
    .catch(error => {
      console.log("ERROR!", error);
      dispatch({ type: LOGIN_FAILURE, payload: error });
    });
};

export const setUserWithToken = token => dispatch => {
  console.log("calling setUserWithToken! token:", token);

  let user;
  axios({
    url: "https://api.github.com/user",
    method: "GET",
    headers: {
      Authorization: `token ${token}`
    }
  })
    .then(response => {
      user = response.data;
      dispatch({ type: LOGIN_SUCCESS, payload: { user, token } });
    })
    .catch(error => {
      dispatch({ type: LOGIN_FAILURE, payload: error });
    });
};

export const logout = () => dispatch => {
  localStorage.removeItem("token");
  localStorage.removeItem("state");
  dispatch({ type: LOGOUT });
  setTimeout(() => dispatch(push("/zombie")), 2000);
};

export const propogateCode = ({ code, state }) => {
  return { type: PROPOGATE_CODE, payload: { code, state } };
};

import { push } from "connected-react-router";
import { HANDLE_LOGIN, HANDLE_LOGOUT } from "./types";

export const handleLogin = e => dispatch => {
  console.log("calling handle login");
  e.preventDefault();
  dispatch(push("/logout"));
  return { type: HANDLE_LOGIN };
};

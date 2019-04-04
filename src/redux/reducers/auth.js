import {
  INIT_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  PROPOGATE_CODE,
  SET_OAUTH_STATE
} from "../actions/types";

const defaultState = {
  user: {},
  isLoggedIn: false,
  token: "",
  error: null,
  code: "",
  state: ""
};

export const authReducer = (S = defaultState, action) => {
  switch (action.type) {
    case INIT_LOGIN:
      return { ...S };

    case LOGIN_SUCCESS:
      return {
        ...S,
        isLoggedIn: true,
        error: null,
        user: action.payload.user,
        token: action.payload.token
      };
    case LOGIN_FAILURE:
      return { ...S, isLoggedIn: false, error: action.payload };

    case LOGOUT:
      return {
        ...S,
        user: {},
        error: null,
        isLoggedIn: false,
        token: ""
      };

    case PROPOGATE_CODE:
      return {
        ...S,
        code: action.payload.code,
        // state: action.payload.state
        state: action.payload.state
      };

    case SET_OAUTH_STATE:
      return {
        ...S,
        state: action.payload
      };

    default:
      return S;
  }
};

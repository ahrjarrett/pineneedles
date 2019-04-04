import { createStore, applyMiddleware, combineReducers } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";

import { authReducer } from "./redux/reducers/auth";
import { githubReducer } from "./redux/reducers/github";

export const history = createBrowserHistory();

const composeEnhancers = composeWithDevTools({ trace: true });
const middleware = [thunk, logger, routerMiddleware(history)];

const createRootReducer = history =>
  combineReducers({
    auth: authReducer,
    github: githubReducer,
    router: connectRouter(history)
  });

export const store = createStore(
  createRootReducer(history),
  composeEnhancers(applyMiddleware(...middleware))
);

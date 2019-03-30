import { createStore, applyMiddleware, combineReducers } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";

import { authReducer, githubReducer } from "./reducers";

export const history = createBrowserHistory();

const composeEnhancers = composeWithDevTools({ trace: true });
const middleware = [thunk, logger, routerMiddleware(history)];

const createRootReducer = history =>
  combineReducers({
    authReducer,
    githubReducer,
    router: connectRouter(history)
  });

export const store = createStore(
  createRootReducer(history),
  composeEnhancers(applyMiddleware(...middleware))
);

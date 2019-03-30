import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router-dom'

import logger from 'redux-logger'
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware
} from 'react-router-redux'

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import registerServiceWorker from './registerServiceWorker'

import { authReducer, githubReducer } from './reducers'
import App from './components/App/App'

const history=createHistory()
// TODO give this variable a better name
const routingMiddleware = routerMiddleware(history)

const store = createStore(
  combineReducers({
    authReducer,
    githubReducer,
    router: routerReducer,
  }),
  applyMiddleware(routingMiddleware, logger)
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path="/" component={App} />
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root')
)
registerServiceWorker()


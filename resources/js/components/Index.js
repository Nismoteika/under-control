import React from 'react';
import ReactDOM from 'react-dom';

import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import { createBrowserHistory } from 'history';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';

import Template from './Template';

import createRootReducer from '../reducers'

const history = createBrowserHistory();
const store = createStore(
  createRootReducer(history), // root reducer with router state
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
      thunkMiddleware
    ),
  ),
)

export default function Index() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Template />
      </ConnectedRouter>
    </Provider>
  )
}

ReactDOM.render(<Index />, document.getElementById('app'));

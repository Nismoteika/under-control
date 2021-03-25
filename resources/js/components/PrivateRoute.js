import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';

var appStateString = localStorage['appState'];
var appStateObj;

if (!appStateString) {
  let appState = {
    isLoggedIn: false,
    user: {}
  };
  localStorage['appState'] = JSON.stringify(appState);
  appStateObj = app
} else {
  appStateObj = JSON.parse(appStateString);
}

const PrivateRoute = ({ component: Component, path, ...rest }) => (
  <Route
    path={path}
    {...rest}
    render={props =>
      appStateObj.isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: {
              prevLocation: path,
              error: 'Сначала авторизуйтесь!'
            }
          }}
        />
      )
    }
  />
);

export default withRouter(PrivateRoute);

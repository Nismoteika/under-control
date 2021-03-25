import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';

var appStateString = localStorage['appState'];
var appStateObj;

if (!appStateString) {
  let appState = {
    isLoggedIn: false,
    user: {
        role_id: false
    }
  };
  localStorage['appState'] = JSON.stringify(appState);
  appStateObj = app
} else {
  appStateObj = JSON.parse(appStateString);
}

const AdminRoute = ({ component: Component, path, ...rest }) => (
  <Route
    path={path}
    {...rest}
    render={props =>
      (appStateObj.isLoggedIn && appStateObj.user.role_id == 1) ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: {
              prevLocation: "/",
              error: 'Сначала авторизуйтесь!'
            }
          }}
        />
      )
    }
  />
);

export default withRouter(AdminRoute); 
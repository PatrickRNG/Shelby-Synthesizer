import React from 'react';
import {
  Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Auth from '../../utils/Auth';
import { Login, Signup } from '../../views';
import AppContainer from '../AppContainer';

const RootContent = () => {
  const history = createBrowserHistory();

  return (
    <Router history={history}>
      <Switch>
        {/* <Route path="/forgot-password" component={ForgotPasswordAsync} />
        <Route path="/reset-password" component={ResetPasswordAsync} />
        <Route path="/signup" component={SignUpAsync} /> */}
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />

        <Route
          path="/"
          render={() =>
            Auth.isUserAuthenticated() ? <AppContainer /> : <Redirect to="/login" />
          }
        />
      </Switch>
    </Router>
  );
};

export default RootContent;

import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import jwt_decode from 'jwt-decode'

import Auth from '../../utils/Auth';
import { Login, Signup } from '../../views';
import AppContainer from '../AppContainer';
import { UserProvider } from '../../contexts/UserContext';
const RootContent = () => {
  const history = createBrowserHistory();
  const [user, setUser] = useState({});

  useEffect(() => {
    if (Auth.isUserAuthenticated) {
      const token = Auth.getToken();
      Auth.authenticateUser(token);
      const { email } = jwt_decode(token);
      setUser({...user, email});
    }
  }, []);

  return (
    <UserProvider value={{user, setUser}}>
      <BrowserRouter history={history}>
        <Switch>
          {/* <Route path="/forgot-password" component={ForgotPasswordAsync} />
        <Route path="/reset-password" component={ResetPasswordAsync} />
        <Route path="/signup" component={SignUpAsync} /> */}
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route
            path="/"
            render={() =>
              Auth.isUserAuthenticated() ? (
                <AppContainer />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
        </Switch>
      </BrowserRouter>
    </UserProvider>
  );
};

export default RootContent;

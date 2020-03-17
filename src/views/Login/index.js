import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { Form } from 'antd';

import LoginForm from './LoginForm';
import Auth from '../../utils/Auth';
import Storage from '../../utils/Storage';
import UserContext from '../../contexts/UserContext';
import { authUser } from '../../api/auth';

const LoginContainer = ({ form, history }) => {
  const [errors, setErrors] = useState({});
  const { setUser } = useContext(UserContext);
  
  const logout = () => {
    Storage.clear();
  };
  
  useEffect(() => {
    Auth.deauthenticateUser();
    logout();
  }, []);

  const handleSuccess = response => {
    const pushTo = '/';

    Auth.authenticateUser(response.token);
    history.push(pushTo);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // validate fields here;
    form.validateFields(async (err, values) => {
      const userObj = { email: values.email, password: values.password };

      const responseJson = await authUser(userObj);

      if (!responseJson.success) {
        return setErrors({
          message: responseJson.errors.message
        });
      }

      setUser({email: values.email});
      return handleSuccess(responseJson);
    });
  };

  return <LoginForm onSubmit={handleSubmit} errors={errors} form={form} />;
};

const WrappedLoginContainer = Form.create()(LoginContainer);

export default withRouter(WrappedLoginContainer);

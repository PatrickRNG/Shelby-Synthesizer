import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Form } from 'antd';

import LoginForm from './LoginForm';
import Auth from '../../utils/Auth';
import Storage from '../../utils/Storage';
import { apiUrl as BASE_URL } from '../../config/';

const apiUrl = `${BASE_URL}/auth/login`;

const LoginContainer = ({ form, history }) => {
  const [errors, setErrors] = useState({});


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

      const response = await fetch(apiUrl, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(userObj)
      });

      const responseJson = await response.json();

      if (!responseJson.success) {
        return setErrors({
          message: responseJson.errors.message
        });
      }

      return handleSuccess(responseJson);
    });
  };

  return <LoginForm onSubmit={handleSubmit} errors={errors} form={form} />;
};

const WrappedLoginContainer = Form.create()(LoginContainer);

export default withRouter(WrappedLoginContainer);

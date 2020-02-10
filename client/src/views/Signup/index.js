import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Form } from 'antd';

import SignupForm from './SignupForm';
import { apiUrl as BASE_URL } from '../../config';

const SignupContainer = ({ form, history }) => {
  const [errors, setErrors] = useState({});

  const apiUrl = `${BASE_URL}/auth/register`;

  const handleSuccess = async () => {
    const pushTo = '/login';
    history.push(pushTo);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // validate fields here;
    form.validateFields(async (err, values) => {
      const userObj = {
        fullName: values.name,
        email: values.email,
        password: values.password
      };

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

  return <SignupForm onSubmit={handleSubmit} errors={errors} form={form} />;
};

const WrappedSignupContainer = Form.create()(SignupContainer);

export default withRouter(WrappedSignupContainer);

import React from 'react';
import { Form, Icon, Input } from 'antd';
import { Link } from 'react-router-dom';

import {
  Forgot,
  FormButton,
  StyledForm,
  Flex,
  FormWrapper,
  Title,
  Error
} from './styles';

const LoginForm = ({ errors, onSubmit, form }) => {
  const FormItem = Form.Item;
  const { getFieldDecorator } = form;

  return (
    <Flex>
      <FormWrapper>
        <Title>Advocate Synthesizer</Title>
        <StyledForm onSubmit={onSubmit}>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your E-mail' }]
            })(
              <Input
                prefix={<Icon type="mail" style={{ fontSize: 13 }} />}
                placeholder="E-mail"
                type="email"
                name="email"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password' }]
            })(
              <Input
                prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>
          <FormItem>
            <Forgot to="/forgot-password">Forgot password</Forgot>
            <FormButton type="primary" htmlType="submit">
              Log in
            </FormButton>
            Or <Link to="/signup">register now!</Link>
          </FormItem>
          {errors.message && <Error>{errors.message}</Error>}
        </StyledForm>
      </FormWrapper>
    </Flex>
  );
};

LoginForm.defaultProps = {
  errors: null
};

export default LoginForm;

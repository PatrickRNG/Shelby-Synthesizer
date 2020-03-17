import React from 'react';
import { Form, Icon, Input } from 'antd';
import { StyledForm, Flex, FormWrapper, Title, FormButton } from './styles';
import { Link } from 'react-router-dom';

const SignupForm = ({ onSubmit, form }) => {
  const FormItem = Form.Item;
  const { getFieldDecorator } = form;

  return (
    <Flex>
      <FormWrapper>
        <Title>Shelby</Title>
        <StyledForm onSubmit={onSubmit}>
          <FormItem>
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: 'Please input your Full Name' }
              ]
            })(
              <Input
                prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                placeholder="Full name"
                type="name"
                name="name"
              />
            )}
          </FormItem>
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
            <FormButton type="primary" htmlType="submit">
              Cadastre-se
            </FormButton>
            Já tem uma conta? <Link to="/login">Login</Link>
          </FormItem>
        </StyledForm>
      </FormWrapper>
    </Flex>
  );
};

SignupForm.defaultProps = {
  errors: null
};

export default SignupForm;

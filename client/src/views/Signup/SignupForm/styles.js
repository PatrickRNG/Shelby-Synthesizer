import styled from 'styled-components';
import { Form, Button } from 'antd';

export const StyledForm = styled(Form)`
  max-width: 300px;
  min-width: 300px;
`;

export const Forgot = styled.a`
  float: right;
`;

export const FormButton = styled(Button)`
  width: 100%;
`;

export const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const FormWrapper = styled.div`
  background-color: #fff;
  padding: 20px;
`;

export const Title = styled.h2`
  font-size: 30px;
  text-align: center;
  margin-bottom: 30px;
  color: #1890ff;
  font-weight: 300;
`;

export const Error = styled.div`
  color: #f97777;
`;
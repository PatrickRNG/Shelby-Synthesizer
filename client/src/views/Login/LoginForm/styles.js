import styled from 'styled-components';
import { Form, Button } from 'antd';
import { Link } from 'react-router-dom';

const StyledForm = styled(Form)`
  max-width: 300px;
  min-width: 300px;
`;

const Forgot = styled(Link)`
  float: right;
`;

const FormButton = styled(Button)`
  width: 100%;
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const FormWrapper = styled.div`
  background-color: #fff;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 30px;
  text-align: center;
  margin-bottom: 30px;
  color: #1890ff;
  font-weight: 300;
`;

const Error = styled.div`
  color: #f97777;
`;

export {
  StyledForm,
  Forgot,
  FormButton,
  Flex,
  FormWrapper,
  Title,
  Error
}
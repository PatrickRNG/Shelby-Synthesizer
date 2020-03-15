import styled from 'styled-components';
import { Layout } from 'antd';

const { Footer : AntFooter } = Layout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Paper = styled.div`
  background-color: #fff;
  padding: 24px;
  min-height: 280px;
  height: 100%;
`;

const Footer = styled(AntFooter)`
  padding: 15px;
  margin-top: 55px;
`;

export {
  Paper,
  Container,
  Footer
}
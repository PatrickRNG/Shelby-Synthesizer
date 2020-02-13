import styled from 'styled-components';
import { Layout } from 'antd';

const LayoutContainer = styled(Layout)`
  height: 100%;
`;

const Paper = styled.div`
  background-color: #fff;
  padding: 24px;
  min-height: 280px;
  height: 100%;
`;

export {
  Paper,
  LayoutContainer
}
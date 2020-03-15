import React from 'react';
import { Layout as AntLayout, Menu } from 'antd';
import { withRouter, Link } from 'react-router-dom';

import { Paper, Footer, Container } from './styles';
import Auth from '../../utils/Auth';

const { Header, Content } = AntLayout;

const buildHeader = header => {
  switch (header) {
    case '/':
      return 'Dashboard';
    case '/synthesizer':
      return 'Synthesizer';
    default:
      return '';
  }
}

const Layout = ({ children, history }) => {
  console.log(history.location.pathname);
  const logout = () => {
    Auth.deauthenticateUser();
    history.push('/login');
  };

  return (
    <Container>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '64px' }}
          selectable={false}
        >
          <Menu.Item>
            <Link to="/">Dashboard</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/synthesizer">Sintetizar</Link>
          </Menu.Item>
          <Menu.Item onClick={logout} style={{ float: 'right' }}>
            Log out
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: '20px' }}>
        <h2>{buildHeader(history.location.pathname)}</h2>
        <Paper>{children}</Paper>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Shelby ©2020 Created by Patrick Passarella
      </Footer>
    </Container>
  );
};

export default withRouter(Layout);

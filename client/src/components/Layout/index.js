import React from 'react';
import { Layout as AntLayout, Menu } from 'antd';
import { withRouter, Link } from 'react-router-dom';

import { Paper, LayoutContainer } from './styles';
import Auth from '../../utils/Auth';

const { Header, Content, Footer } = AntLayout;

const Layout = ({ children, history }) => {
  const logout = () => {
    Auth.deauthenticateUser();
    history.push('/login');
  };

  return (
    <LayoutContainer>
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
      <Content style={{ padding: '0 50px', marginTop: '30px' }}>
        <Paper>{children}</Paper>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Shelby ©2020 Created by Patrick Passarella
      </Footer>
    </LayoutContainer>
  );
};

export default withRouter(Layout);

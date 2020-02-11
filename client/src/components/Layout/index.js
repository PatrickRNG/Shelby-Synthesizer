import React from 'react';
import { Layout as AntLayout, Menu } from 'antd';
import { withRouter, Link } from 'react-router-dom';

import { Paper, LayoutContainer } from './styles';
import Auth from '../../utils/Auth';

const { Header, Content, Footer } = AntLayout;

const Layout = ({
  children,
  history
}) => {

  const logout = () => {
    Auth.deauthenticateUser();
    history.push('/login');
  }

  return (
    <LayoutContainer>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '64px' }} >
          <Menu.Item key="1"><Link to="/synthesizer">synthesizer</Link></Menu.Item>
          <Menu.Item key="2" onClick={logout} style={{float: 'right'}}>Log out</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: '30px' }}>
        <Paper>{children}</Paper>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Advocate Synthesizer ©2020 Created by Patrick Passarella
      </Footer>
    </LayoutContainer>
  );
};

export default withRouter(Layout);

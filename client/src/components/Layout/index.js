import React from 'react';
import { Layout as AntLayout, Menu } from 'antd';
import { withRouter } from 'react-router-dom';

import { Paper } from './styles';
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
    <AntLayout className="layout">
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '64px' }} >
          <Menu.Item key="1">Serialize</Menu.Item>
          <Menu.Item key="2" onClick={logout} style={{float: 'right'}}>Log out</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Paper>{children}</Paper>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Advocate Synthesizer ©2020 Created by Patrick Passarella
      </Footer>
    </AntLayout>
  );
};

export default withRouter(Layout);

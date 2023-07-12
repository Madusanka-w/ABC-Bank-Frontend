import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme, Descriptions } from 'antd';
import { useEffect } from 'react';

const { Header, Content, Footer } = Layout;

const Dashboard = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [userData, setUserData] = useState('')

    useEffect(() => {
      const storedData = localStorage.getItem('user');
      const data = storedData ? JSON.parse(storedData) : null;
      setUserData(data)
    }, []);

  return (
    <Layout className="layout">
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={new Array(15).fill(null).map((_, index) => {
            const key = index + 1;
            return {
              key,
              label: `nav ${key}`,
            };
          })}
        />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content" style={{ background: colorBgContainer }}>
        <Descriptions title="User Info">
    <Descriptions.Item label="First Name">{userData.firstName}</Descriptions.Item>
    <Descriptions.Item label="Last Name">{userData.lastName}</Descriptions.Item>
    <Descriptions.Item label="Telephone">{userData.contactNumber}</Descriptions.Item>
    <Descriptions.Item label="Email">{userData.email}</Descriptions.Item>
    
    <Descriptions.Item label="Address">
      {userData.addressLine1}, {userData.addressLine2}, {userData.city}, {userData.country}.
    </Descriptions.Item>
  </Descriptions>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
  );
};

export default Dashboard;
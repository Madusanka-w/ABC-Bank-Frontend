import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Descriptions } from 'antd';
import { useEffect, useState } from 'react';

const { Header, Content, Footer, Sider } = Layout;

const Test = () => {
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
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['4']}
          items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
            (icon, index) => ({
              key: String(index + 1),
              icon: React.createElement(icon),
              label: `nav ${index + 1}`,
            }),
          )}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, minHeight: '795px', background: colorBgContainer }}>
            <Descriptions title="User Info">
              <Descriptions.Item label="FirstName">{userData.firstName}</Descriptions.Item>
              <Descriptions.Item label="LastName">{userData.lastName}</Descriptions.Item>
              <Descriptions.Item label="Telephone">{userData.contactNumber}</Descriptions.Item>
              <Descriptions.Item label="Email">{userData.email}</Descriptions.Item>
              <Descriptions.Item label="NIC">{userData.nic}</Descriptions.Item>
              <Descriptions.Item label="Address">
                {userData.addressLine1}, {userData.addressLine2}, {userData.city}, {userData.country}.
              </Descriptions.Item>
            </Descriptions>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default Test;
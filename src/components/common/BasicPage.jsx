import React from "react";
import { Layout, Avatar, Button, Typography, Menu } from "antd";
import NavBar from "./NavBar";
import { UserOutlined } from "@ant-design/icons";
import { logout } from "../../services/auth_service";
const { Content, Header } = Layout;

export default class BasicPage extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <Layout>
        <NavBar />
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{ padding: "15px 20px 15px 20px", backgroundColor: "#fff" }}
          >
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Typography.Text>Logout</Typography.Text>
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 25,
              backgroundColor: "#fff",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

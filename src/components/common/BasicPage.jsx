import React from "react";
import {
  Layout,
  Avatar,
  Button,
  Typography,
  Menu,
  PageHeader,
  Row,
  Col,
} from "antd";
import NavBar from "./NavBar";
import { UserOutlined } from "@ant-design/icons";
import { logout } from "../../services/auth_service";
const { Content, Header } = Layout;

export default function BasicPage(props) {
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
          <Row justify="space-between">
            <Col>
              <PageHeader title={props.title} style={{ padding: 0 }} />
            </Col>
            <Col>{props.action}</Col>
          </Row>
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
}

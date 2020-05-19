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
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { logout } from "../../services/auth_service";
const { Content, Header } = Layout;

export default function BasicPage(props) {
  return (
    <Layout>
      <NavBar />
      <Layout className="site-layout">
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 24px",
            padding: 25,
            maxWidth: "1200px",
          }}
        >
          <Row justify="space-between">
            <Col>
              <PageHeader
                title={props.title}
                style={{ padding: "0px 0px 20px 0px" }}
              />
            </Col>
            <Col>{props.action}</Col>
          </Row>
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
}

import React, { useContext } from "react";
import {
  Layout,
  PageHeader,
  Row,
  Col,
  Typography,
  Card,
  Popover,
  Button,
  Descriptions,
} from "antd";
import NavBar from "./NavBar";
import Avatar from "antd/lib/avatar/avatar";
import { AuthContext, logout } from "../../services/auth_service";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
const { Content, Header } = Layout;

export default function BasicPage(props) {
  return (
    <Content
      className="site-layout-background"
      style={{
        margin: "24px 24px",
        padding: 25,
        width: "95%",
        height: "80vh",
        maxWidth: "1200px",
        // minWidth: "1000px",
      }}
    >
      <Row justify="space-between">
        <Col>
          <PageHeader
            title={<h1 style={{ fontWeight: 700 }}>{props.title}</h1>}
            style={{ padding: 0 }}
          />
        </Col>
        <Col>{props.action}</Col>
      </Row>
      {props.children}
    </Content>
  );
}

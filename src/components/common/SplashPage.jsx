import React from "react";
import { Layout, Col, Row } from "antd";
import Spinner from "./Spinner";
import { LoadingOutlined } from "@ant-design/icons";
import logo from "../../assets/images/logo.png";

export default function SplashPage() {
  return (
    <Layout style={{ height: "100vh" }}>
      <div style={{ margin: "auto" }}>
        <Col>
          <Row justify="center" align="middle">
            <img
              src={logo}
              style={{ marginBottom: 10 }}
              height={60}
              alt="Logo"
            />
          </Row>
          <Row justify="center">
            <LoadingOutlined style={{ fontSize: 24, color: "#1180ff" }} />
          </Row>
        </Col>
      </div>
    </Layout>
  );
}

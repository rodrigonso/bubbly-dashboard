import React from "react";
import { Row, Col, Layout } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function SplashPage() {
  return (
    <Layout style={{ height: "100vh" }}>
      <div style={{ margin: "auto" }}>
        <Col>
          <Row justify="center" align="middle">
            <img src="https://rb.gy/yd9df6" alt="Logo" height={80} />
          </Row>
          <Row justify="center" style={{ marginTop: 20 }}>
            <LoadingOutlined style={{ fontSize: 22 }} />
          </Row>
        </Col>
      </div>
    </Layout>
  );
}

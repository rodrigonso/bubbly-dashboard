import React from "react";
import { Layout, PageHeader, Row, Col } from "antd";

const { Content } = Layout;

export default function BasicPage(props) {
  return (
    <Content
      className="site-layout-background"
      style={{
        margin: "24px 24px",
        padding: 25,
        width: "95%",
        minHeight: "100vh",
        maxWidth: "1200px",
        overflow: "initial",
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

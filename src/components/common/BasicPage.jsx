import React from "react";
import { Layout, PageHeader, Row, Col, Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const { Content } = Layout;

export default function BasicPage(props) {
  const { breadcrumbs, title, actions, children } = props;
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
          {breadcrumbs ? (
            <Breadcrumb>
              {breadcrumbs.map((item) => (
                <Link to={item.route}>
                  <Breadcrumb.Item>{item.label}</Breadcrumb.Item>
                </Link>
              ))}
            </Breadcrumb>
          ) : null}
          <PageHeader
            title={<h1 style={{ fontWeight: 700 }}>{title}</h1>}
            style={{ padding: 0 }}
          />
        </Col>
        <Col>{actions}</Col>
      </Row>
      {children}
    </Content>
  );
}

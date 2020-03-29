import React from "react";

import { Layout } from "antd";
const { Content } = Layout;

export default function BasicPage() {
  return (
    <Content
      className="site-layout-background"
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: 280,
        backgroundColor: "#fff"
      }}
    >
      <h1 style={{ fontSize: 20 }}>Overview</h1>
    </Content>
  );
}

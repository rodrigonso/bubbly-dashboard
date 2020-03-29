import React from "react";

import { Layout } from "antd";
import NavBar from "../common/NavBar";
import BasicPage from "../common/BasicPage";

const { Header } = Layout;

export default function SchedulePage() {
  return (
    <Layout style={{ height: "100vh" }}>
      <NavBar />
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, backgroundColor: "#fff" }}
        ></Header>
        <BasicPage title="Schedule" />
      </Layout>
    </Layout>
  );
}

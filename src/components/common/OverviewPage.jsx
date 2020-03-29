import React from "react";

import { Layout } from "antd";
import NavBar from "./NavBar";
import BasicPage from "./BasicPage";

const { Header } = Layout;

export default function OverviewPage() {
  return (
    <Layout style={{ height: "100vh" }}>
      <NavBar />
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, backgroundColor: "#fff" }}
        ></Header>
        <BasicPage />
      </Layout>
    </Layout>
  );
}

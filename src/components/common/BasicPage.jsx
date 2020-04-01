import React from "react";
import { Layout } from "antd";
import NavBar from "./NavBar";
const { Content, Header } = Layout;

export default class BasicPage extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <Layout>
        <NavBar />
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{ padding: 0, backgroundColor: "#fff" }}
          ></Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 25,
              backgroundColor: "#fff"
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

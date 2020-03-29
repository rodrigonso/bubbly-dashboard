import React from "react";

import { Layout } from "antd";
const { Content } = Layout;

export default class BasicPage extends React.Component {
  static defautProps = {
    title: "Page Title"
  };

  render() {
    return (
      <Content
        className="site-layout-background"
        style={{
          margin: "24px 16px",
          padding: 25,
          backgroundColor: "#fff"
        }}
      >
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: 20 }}>{this.props.title}</h1>
        </div>
        {this.props.children}
      </Content>
    );
  }
}

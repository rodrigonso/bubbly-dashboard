import React from "react";
import { Result, Button, Layout } from "antd";
import { BugOutlined } from "@ant-design/icons";

export default function PayrollPage(props) {
  return (
    <Layout style={{ height: "100vh" }}>
      <Result
        style={{ margin: "auto" }}
        icon={<BugOutlined />}
        title="This page is under construction!"
        extra={
          <Button onClick={() => props.history.push("/")} type="primary">
            Back Home
          </Button>
        }
      />
    </Layout>
  );
}

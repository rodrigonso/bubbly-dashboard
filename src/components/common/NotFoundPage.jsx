import React from "react";
import { Result, Layout, Button } from "antd";

export default function NotFoundPage(props) {
  return (
    <div>
      <Layout style={{ height: "100vh" }}>
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button
              shape="round"
              type="primary"
              onClick={() => props.history.push("/")}
            >
              Back Home
            </Button>
          }
          style={{ margin: "auto" }}
        />
      </Layout>
    </div>
  );
}

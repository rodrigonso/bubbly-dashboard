import React, { useEffect } from "react";
import BasicPage from "../common/BasicPage";
import { Button, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default function CustomersPage() {
  return (
    <React.Fragment>
      <BasicPage
        title="Payroll"
        action={
          <Button type="primary" icon={<PlusOutlined />} shape="round">
            Payroll
          </Button>
        }
      ></BasicPage>
    </React.Fragment>
  );
}

import React from "react";

import { Layout, Menu } from "antd";
import {
  PieChartOutlined,
  CalendarOutlined,
  CreditCardOutlined
} from "@ant-design/icons";

const { Sider } = Layout;

export default function NavBar() {
  return (
    <Sider>
      <div
        className="logo"
        style={{ padding: 60, color: "#fff", textAlign: "center" }}
      >
        Logo Here
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">
          <PieChartOutlined />
          <span>Overview</span>
        </Menu.Item>
        <Menu.Item key="2">
          <CalendarOutlined />
          <span>Schedule</span>
        </Menu.Item>
        <Menu.Item key="3">
          <CreditCardOutlined />
          <span>Payroll</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

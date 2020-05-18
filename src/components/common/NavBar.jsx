import React, { useState, useEffect } from "react";

import { Layout, Menu } from "antd";
import {
  PieChartOutlined,
  CalendarOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Sider } = Layout;

export default function NavBar(props) {
  const [page, setPage] = useState("/");

  useEffect(() => {
    // setPage(props.match.url);
    // console.log(props.match.url);
  });

  return (
    <Sider {...props} style={{ height: "100vh" }}>
      <div
        className="logo"
        style={{ padding: 60, color: "#fff", textAlign: "center" }}
      >
        <img
          src="https://rb.gy/yd9df6"
          width={100}
          alt="Bubbly Logo"
          style={{ marginRight: -20 }}
        />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[page]}
        defaultSelectedKeys={["/"]}
        onSelect={(e) => setPage(e.key)}
      >
        <Menu.Item key="/">
          <Link to="/">
            <PieChartOutlined />
            <span>Overview</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="/schedule">
          <Link to="/schedule">
            <CalendarOutlined />
            <span>Schedule</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/payroll">
          <Link to="/payroll">
            <CreditCardOutlined />
            <span>Payroll</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

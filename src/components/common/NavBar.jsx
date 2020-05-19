import React, { useState, useEffect } from "react";

import { Layout, Menu } from "antd";
import {
  PieChartOutlined,
  CalendarOutlined,
  CreditCardOutlined,
  TagOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";

const { Sider } = Layout;

export default function NavBar(props) {
  const [page, setPage] = useState("/");

  useEffect(() => {
    // setPage(props.match.url);
    // console.log(props.match.url);
  });

  return (
    <Sider {...props} style={{ height: "100vh" }} theme="light">
      <div
        className="logo"
        style={{ padding: 60, color: "#fff", textAlign: "center" }}
      >
        <img
          src="https://rb.gy/yd9df6"
          width={120}
          alt="Bubbly Logo"
          style={{ marginLeft: -15 }}
        />
      </div>
      <Menu
        theme="light"
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
        <SubMenu
          key="sub1"
          title={
            <span>
              <TagOutlined />
              <span>Services</span>
            </span>
          }
        >
          <Menu.Item key="/services/base">
            <Link to="/services/services">
              <span>Base Services</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/services/upgrades">
            <Link to="/services/upgrades">
              <span>Upgrades</span>
            </Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="/customers">
          <Link to="/customers">
            <TeamOutlined />
            <span>Customers</span>
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

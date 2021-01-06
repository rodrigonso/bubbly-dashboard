import React from "react";

import { Layout, Menu, Col, Button, Divider } from "antd";
import logo from "../../assets/images/logo.png";
import {
  PieChartOutlined,
  CalendarOutlined,
  TagOutlined,
  TeamOutlined,
  AuditOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";
import { logout } from "../../services/auth_service";

const { Sider } = Layout;

export default function NavBar(props) {
  return (
    <React.Fragment>
      <Col align="space-between">
        <Sider {...props} style={{ height: "100vh" }} theme="light">
          <div
            className="logo"
            style={{ padding: 60, color: "#fff", textAlign: "center" }}
          >
            <img
              src={logo}
              width={120}
              alt="Bubbly Logo"
              style={{ marginLeft: -15 }}
            />
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultOpenKeys={["sub1"]}
            defaultSelectedKeys={["/"]}
          >
            <Menu.Item key="1">
              <PieChartOutlined />
              <span>Overview</span>
              <Link to="/" />
            </Menu.Item>
            <Menu.Item key="2">
              <CalendarOutlined />
              <span>Schedule</span>
              <Link to="/schedule" />
            </Menu.Item>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <TagOutlined />
                  <span>Services</span>
                </span>
              }
            >
              <Menu.Item key="3">
                <span>Base Services</span>
                <Link to="/services/base-services" />
              </Menu.Item>
              <Menu.Item key="4">
                <span>Upgrades</span>
                <Link to="/services/upgrades" />
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="5">
              <TeamOutlined />
              <span>Customers</span>
              <Link to="/customers" />
            </Menu.Item>
            <SubMenu
              key="sub3"
              title={
                <span>
                  <AuditOutlined />
                  <span>Employees</span>
                </span>
              }
            >
              <Menu.Item key="6">
                <span>Manage</span>
                <Link to="/employees/manage" />
              </Menu.Item>
            </SubMenu>
          </Menu>
          <Divider />
          <div style={{ marginTop: 20, padding: "0px 20px 0px 20px" }}>
            <Button block type="ghost" danger onClick={logout}>
              Logout
            </Button>
          </div>
        </Sider>
      </Col>
    </React.Fragment>
  );
}

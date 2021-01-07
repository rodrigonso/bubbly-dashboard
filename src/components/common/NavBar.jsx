import React, { useContext } from "react";

import { Layout, Menu, Col, Button, Divider } from "antd";
import logo from "../../assets/images/appicon.png";
import {
  PieChartOutlined,
  CalendarOutlined,
  TagOutlined,
  TeamOutlined,
  AuditOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";
import { AuthContext, logout } from "../../services/auth_service";

const { Sider } = Layout;

export default function NavBar(props) {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <div />;
  }

  return (
    <React.Fragment>
      <Col align="space-between">
        <Sider
          {...props}
          style={{
            height: "100vh",
            overflow: "auto",
            boxShadow: "10px 10px 7.5px 0.5px rgba(0,0,0,0.025)",
            // borderRight: "0.1px solid rgba(0, 0, 0, 0.1)",
          }}
          theme="light"
        >
          <div
            className="logo"
            style={{ padding: 60, color: "#fff", textAlign: "center" }}
          >
            <img
              src={logo}
              width={100}
              alt="Bubbly Logo"
              style={{ marginLeft: -15, marginTop: -15, borderRadius: 15 }}
            />
          </div>
          <Menu
            style={{ marginTop: -30 }}
            theme="light"
            mode="inline"
            defaultOpenKeys={["sub1"]}
            defaultSelectedKeys={["1"]}
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
        </Sider>
      </Col>
    </React.Fragment>
  );
}

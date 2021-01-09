import React, { useContext } from "react";

import { Layout, Menu, Col, Divider } from "antd";
import logo from "../../assets/images/appicon.png";
import {
  PieChartOutlined,
  CalendarOutlined,
  TagOutlined,
  TeamOutlined,
  AuditOutlined,
  LineChartOutlined,
  CoffeeOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";
import { AuthContext } from "../../services/auth_service";

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
            boxShadow: "1.5px 1.5px 7.5px 0.5px rgba(0,0,0,0.025)",
            position: "fixed",
            left: 0,
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
            defaultOpenKeys={["sub0"]}
            defaultSelectedKeys={["1"]}
          >
            <Menu.Item key="1">
              <CalendarOutlined />
              <span>Schedule</span>
              <Link to="/schedule" />
            </Menu.Item>
            <SubMenu key="sub0" title="Dashboard" icon={<LineChartOutlined />}>
              <Menu.Item key="sub0a">
                <span>Overview</span>
                <Link to="/overview" />
              </Menu.Item>
              <Menu.Item key="sub0b">
                <span>Analysis</span>
                <Link to="/analysis" />
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <TagOutlined />
                  <span>Services</span>
                </span>
              }
            >
              <Menu.Item key="sub1a">
                <span>Base Services</span>
                <Link to="/services/base-services" />
              </Menu.Item>
              <Menu.Item key="sub1b">
                <span>Upgrades</span>
                <Link to="/services/upgrades" />
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="2">
              <TeamOutlined />
              <span>Customers</span>
              <Link to="/customers" />
            </Menu.Item>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <AuditOutlined />
                  <span>Employees</span>
                </span>
              }
            >
              <Menu.Item key="sub2a">
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

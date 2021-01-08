import React, { useContext } from "react";

import { Avatar, Dropdown, Layout, Menu, Skeleton, Typography } from "antd";
import { AuthContext, logout } from "../../services/auth_service";
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Header } = Layout;

const menu = (
  <Menu>
    <Menu.Item icon={<UserOutlined />}>
      <Link to="/account">Account</Link>
    </Menu.Item>
    <Menu.Item icon={<SettingOutlined />}>
      <Link to="/account">Settings</Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item icon={<LogoutOutlined />} onClick={async () => logout()} danger>
      Logout
    </Menu.Item>
  </Menu>
);

export default function PageStructure() {
  const { currentUser, loading } = useContext(AuthContext);

  if (!currentUser) return <div />;

  if (loading)
    return (
      <Header
        style={{
          width: "100%",
          backgroundColor: "#fff",
          boxShadow: "1.5px 1.5px 7.5px 0.5px rgba(0,0,0,0.025)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <div style={{ marginTop: "0.4rem", marginRight: "-2.25rem" }}>
            <Skeleton active paragraph={false} title={{ width: "5rem" }} />
          </div>
        </div>
      </Header>
    );

  return (
    <Header
      style={{
        height: "4rem",
        width: "100%",
        backgroundColor: "#fff",
        boxShadow: "0px 2.5px 0.5px 0px rgba(0,0,0,0.005)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Dropdown overlay={menu}>
          <div>
            <Avatar
              src={currentUser?.photoUrl ?? ""}
              icon={currentUser?.photoUrl ? null : <UserOutlined />}
              shape="square"
              size="small"
            />
            <Typography.Text style={{ marginLeft: "0.5rem" }}>
              {currentUser?.firstName ?? ""}
            </Typography.Text>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
}

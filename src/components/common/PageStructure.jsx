import React, { useContext } from "react";

import { Avatar, Button, Layout, Popover, Skeleton } from "antd";
import { AuthContext, logout } from "../../services/auth_service";
import { UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

export default function PageStructure() {
  const { currentUser, loading } = useContext(AuthContext);

  if (!currentUser) return <div />;

  if (loading)
    return (
      <Header
        style={{
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
          <div style={{ marginTop: "0.4rem", marginRight: "-2.25rem" }}>
            <Skeleton active paragraph={false} title={{ width: "5rem" }} />
          </div>
        </div>
      </Header>
    );

  return (
    <Header
      style={{
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
        <div style={{ marginRight: "-2.25rem" }}>
          <Popover
            placement="bottomRight"
            title={currentUser?.toString() ?? ""}
            content={
              <Button onClick={async () => await logout()} size="small" danger>
                Logout
              </Button>
            }
          >
            <Avatar
              src={currentUser?.photoUrl ?? ""}
              icon={currentUser?.photoUrl ? null : <UserOutlined />}
              shape="square"
            />
          </Popover>
        </div>
      </div>
    </Header>
  );
}

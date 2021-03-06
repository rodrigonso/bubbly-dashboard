import React, { useState, useContext } from "react";
import { AuthContext, login } from "../../services/auth_service";
import { Card, Input, Button, notification } from "antd";
import CustomForm from "./CustomForm";
import { Redirect, withRouter } from "react-router-dom";
import logo from "../../assets/images/appicon.png";

function AuthPage(props) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const fields = [
    {
      name: "email",
      label: "Email",
      component: <Input onChange={(e) => setEmail(e.target.value)} />,
    },
    {
      name: "password",
      label: "Password",
      component: (
        <Input.Password onChange={(e) => setPassword(e.target.value)} />
      ),
    },
  ];

  const handleLogin = async () => {
    setLoading(true);
    await login(email, password);
    setLoading(false);
  };

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/schedule" />;
  } else
    return (
      <div
        style={{
          height: "100vh",
          width: "80vw",
          backgroundColor: "#F0F2F5",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            margin: "auto",
            maxWidth: "40rem",
            minWidth: "30rem",
            padding: 50,
          }}
        >
          <div style={{ margin: "auto", marginBottom: 60 }}>
            <img
              style={{ borderRadius: 5 }}
              width={125}
              src={logo}
              alt="logo"
            />
          </div>
          <Card title="Log in" style={{ borderRadius: 5 }} bordered={false}>
            <CustomForm fields={fields} />
            <Button
              loading={loading}
              style={{ float: "right" }}
              type="primary"
              onClick={handleLogin}
            >
              Login
            </Button>
          </Card>
        </div>
      </div>
    );
}

export default withRouter(AuthPage);

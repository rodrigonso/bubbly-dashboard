import React, { useState, useContext } from "react";
import { AuthContext, login } from "../../services/auth_service";
import { Card, Input, Form, Button } from "antd";
import CustomForm from "./CustomForm";
import { Redirect, withRouter } from "react-router-dom";

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
    return <Redirect to="/" />;
  } else
    return (
      <div
        style={{ height: "100vh", width: "100vw", backgroundColor: "#f7f7f7" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            margin: "auto",
            width: "50%",
            maxWidth: 600,
            padding: 50,
          }}
        >
          <div style={{ margin: "auto", marginBottom: 60 }}>
            <img width={200} src="https://bit.ly/2YbyViP" alt="logo" />
          </div>
          <Card title="Login" style={{ borderRadius: 5 }} bordered={false}>
            <CustomForm fields={fields} />
            <Button
              shape="round"
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

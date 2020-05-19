import React, { useState, useContext } from "react";
import { AuthContext, login } from "../../services/auth_service";
import { Card, Input, Form, Button } from "antd";
import CustomForm from "./CustomForm";
import { Redirect, withRouter } from "react-router-dom";

function AuthPage(props) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

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
    await login(email, password);
  };

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/" />;
  } else
    return (
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
          <img
            width={200}
            src="https://static.wixstatic.com/media/f2bd2b_21c412512b4a4d30bb43bec066c18178~mv2_d_1500_1500_s_2.png/v1/fill/w_344,h_140,al_c,q_85,usm_0.66_1.00_0.01/f2bd2b_21c412512b4a4d30bb43bec066c18178~mv2_d_1500_1500_s_2.webp"
            alt="logo"
          />
        </div>
        <Card title="Login">
          <CustomForm fields={fields} />
          <Button
            style={{ float: "right" }}
            type="primary"
            onClick={handleLogin}
          >
            Login
          </Button>
        </Card>
      </div>
    );
}

export default withRouter(AuthPage);

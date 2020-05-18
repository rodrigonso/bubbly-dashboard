import React, { Component } from "react";
import { Card, Input, Form, Button } from "antd";
import { login } from "../../services/auth_service";
import CustomForm from "./CustomForm";

const fields = [
  { name: "email", label: "Email", isPassword: false },
  { name: "password", label: "Password", isPassword: true },
];

export default class AuthPage extends Component {
  state = {
    email: "",
    password: "",
  };

  handleInputChange = (field, value) => {
    this.setState({ [field]: value });
  };

  handleLogin = async () => {
    console.log("CLICK!");
    const { email, password } = this.state;
    await login(email, password);
  };

  render() {
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
          <CustomForm fields={fields} onChange={this.handleInputChange} />
          <Button
            style={{ float: "right" }}
            type="primary"
            onClick={this.handleLogin}
          >
            Login
          </Button>
        </Card>
      </div>
    );
  }
}

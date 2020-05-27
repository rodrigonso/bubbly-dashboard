import React from "react";
import { Tag, Typography } from "antd";

export default function PaymentStatusChip(props) {
  return (
    <Tag
      style={{
        height: 20,
        width: "3.5rem",
        padding: 0,
        textAlign: "center",
        borderRadius: 15,
        border: "0.5px solid #1180ff",
      }}
      color="#fff"
    >
      <p style={{ fontSize: 10, color: "#1180ff" }}>{props.status}</p>
    </Tag>
  );
}

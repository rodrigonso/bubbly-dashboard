import React from "react";
import { Tag, Typography } from "antd";

export default function PaymentStatusChip(props) {
  return (
    <Tag
      style={{ height: 20, width: "3.5rem", padding: 0, textAlign: "center" }}
      color="#1180ff"
    >
      <p style={{ fontSize: 9 }}>{props.status}</p>
    </Tag>
  );
}

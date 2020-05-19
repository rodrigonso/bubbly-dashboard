import React from "react";
import { Tag } from "antd";

export default function PaymentStatusChip(props) {
  return (
    <Tag style={{ margin: 0 }} color="#1180ff">
      {props.children}
    </Tag>
  );
}

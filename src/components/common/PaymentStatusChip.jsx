import React from "react";
import { Tag, Typography } from "antd";
import { CheckOutlined } from "@ant-design/icons";

const map = {
  PAID: "Paid",
  "NOT PAID": "Due",
};

export default function PaymentStatusChip(props) {
  return (
    <Tag icon={<CheckOutlined />} color="#108ee9">
      <Typography.Text style={{ color: "#fff" }}>
        {map[props.status]}
      </Typography.Text>
    </Tag>
  );
}

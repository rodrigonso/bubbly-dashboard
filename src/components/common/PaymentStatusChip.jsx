import React from "react";
import { Tag, Typography, Divider } from "antd";
import { CheckOutlined } from "@ant-design/icons";

const map = {
  PAID: "Paid",
  "NOT PAID": "Due",
};

export default function PaymentStatusChip(props) {
  return (
    <div
      style={{
        borderRadius: 5,
        border: "1px solid #f1f1f1",
        padding: "2px 7.5px 2px",
      }}
    >
      <div style={{ display: "flex" }}>
        <Typography.Text>${props.appointment.total ?? 0}</Typography.Text>
        <Divider type="vertical" style={{ marginTop: "7.5%" }} />
        <Typography.Text>
          {map[props.appointment.paymentStatus] ?? "Due"}
        </Typography.Text>
      </div>
    </div>
  );
}

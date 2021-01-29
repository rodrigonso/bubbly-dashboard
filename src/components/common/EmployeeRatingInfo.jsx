import React from "react";
import { Card, Rate } from "antd";

export default function UserPaymentInfo(props) {
  const { employee } = props;

  return (
    <Card bordered={false} bodyStyle={{ padding: 0 }}>
      <p style={{ fontWeight: 600 }}>Rating</p>
      <Rate disabled value={employee.rating} allowHalf />
    </Card>
  );
}

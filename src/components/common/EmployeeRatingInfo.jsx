import React from "react";
import { Card, Row, Col, Typography, Empty, Rate } from "antd";
import { CreditCardOutlined } from "@ant-design/icons";

export default function UserPaymentInfo(props) {
  const { employee } = props;
  return (
    <Card bordered={false} bodyStyle={{ padding: 0 }}>
      <p style={{ fontWeight: 600 }}>Rating</p>
      <Rate disabled value={employee.rating ?? 0} />
    </Card>
  );
}

import React from "react";
import { Row, Col, Statistic, Divider, Tag } from "antd";

export default function PaymentDetails(props) {
  const { appointment } = props;
  return (
    <div style={{ margin: "20px 0px 50px 0px" }}>
      <Row gutter={20}>
        <Col>
          <Statistic
            title="Total"
            value={Math.round(appointment.total)}
            prefix="$"
            valueStyle={{ fontSize: 26 }}
          />
        </Col>
        <Col>
          <Divider type="vertical" style={{ height: "100%" }} />
        </Col>
        <Col>
          <Statistic
            title="Subtotal"
            value={Math.round(appointment.subtotal)}
            prefix="$"
            valueStyle={{ fontSize: 26 }}
          />
        </Col>
        <Col>
          <Divider type="vertical" style={{ height: "100%" }} />
        </Col>
        <Col>
          <Statistic
            title="Tip"
            value={Math.round(appointment.tip)}
            prefix="$"
            valueStyle={{ fontSize: 26 }}
          />
        </Col>
      </Row>
      <br />
      <Tag color="#108ee9">Paid Online</Tag>
    </div>
  );
}

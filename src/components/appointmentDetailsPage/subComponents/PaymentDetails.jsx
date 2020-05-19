import React from "react";
import { Row, Col, Statistic, Divider, Tag, Card } from "antd";

export default function PaymentDetails(props) {
  const isPaidOnline = (item) => {
    return item?.charge?.payment?.status === "COMPLETED"
      ? "Paid Online"
      : "Not Paid";
  };

  const { appointment } = props;
  return (
    <div style={{ margin: "20px 0px 50px 0px" }}>
      <Row
        align="center"
        gutter={20}
        style={{
          width: "42%",
          borderRadius: 5,
          border: "0.75px solid #f7f7f7",
          padding: 15,
        }}
      >
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
      <Tag>{isPaidOnline(props.appointment)}</Tag>
    </div>
  );
}

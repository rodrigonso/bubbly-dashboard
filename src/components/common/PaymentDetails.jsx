import React from "react";
import {
  Row,
  Col,
  Statistic,
  Divider,
  Typography,
  Card,
  Descriptions,
} from "antd";
import PaymentStatusChip from "./PaymentStatusChip";

export default function PaymentDetails(props) {
  const isPaidOnline = (item) => {
    return item?.charge?.payment?.status === "COMPLETED" ? "PAID" : "DUE";
  };

  const { appointment } = props;
  return (
    <React.Fragment>
      <Descriptions>
        <Descriptions.Item label="Payment">
          <PaymentStatusChip status={isPaidOnline(props?.appointment ?? "")} />
        </Descriptions.Item>
      </Descriptions>
      <Card
        style={{ borderRadius: 5, maxWidth: "500px" }}
        bodyStyle={{
          margin: 0,
          padding: "10px 0px 10px 0px",
        }}
        hoverable
      >
        <Row align="left" justify="space-around">
          <Col>
            <Divider
              type="vertical"
              style={{ height: 0, margin: 0, padding: 0 }}
            />
          </Col>
          <Col>
            <Statistic
              title="Total"
              value={Math.round(appointment?.total ?? 0)}
              prefix="$"
              valueStyle={{ fontSize: 26 }}
            />
          </Col>
          <Col>
            <Divider
              type="vertical"
              style={{ height: "100%", margin: 0, padding: 0 }}
            />
          </Col>
          <Col>
            <Statistic
              title="Subtotal"
              value={Math.round(appointment?.subtotal ?? 0)}
              prefix="$"
              valueStyle={{ fontSize: 26 }}
            />
          </Col>
          <Col>
            <Divider
              type="vertical"
              style={{ height: "100%", margin: 0, padding: 0 }}
            />
          </Col>
          <Col>
            <Statistic
              title="Tip"
              value={Math.round(appointment?.tip ?? 0)}
              prefix="$"
              valueStyle={{ fontSize: 26 }}
            />
          </Col>
          <Col>
            <Divider
              type="vertical"
              style={{ height: 0, margin: 0, padding: 0 }}
            />
          </Col>
        </Row>
      </Card>
      <br />
    </React.Fragment>
  );
}

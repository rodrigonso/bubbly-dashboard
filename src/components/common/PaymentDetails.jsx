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
    return item?.charge?.payment?.status === "COMPLETED"
      ? "Paid Online"
      : "Not Paid";
  };

  const { appointment } = props;
  return (
    <React.Fragment>
      <Descriptions>
        <Descriptions.Item label="Payment">
          <PaymentStatusChip>
            {isPaidOnline(props?.appointment ?? "")}
          </PaymentStatusChip>
        </Descriptions.Item>
      </Descriptions>
      <Card style={{ borderRadius: 5 }} hoverable>
        <Row align="center" gutter={20}>
          <Col>
            <Statistic
              title="Total"
              value={Math.round(appointment?.total ?? 0)}
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
              value={Math.round(appointment?.subtotal ?? 0)}
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
              value={Math.round(appointment?.tip ?? 0)}
              prefix="$"
              valueStyle={{ fontSize: 26 }}
            />
          </Col>
        </Row>
      </Card>
      <br />
    </React.Fragment>
  );
}

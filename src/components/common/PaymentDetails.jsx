import React from "react";
import { Statistic, Divider, Card, Descriptions } from "antd";
import PaymentStatusChip from "./PaymentStatusChip";

export default function PaymentDetails(props) {
  const { appointment } = props;
  return (
    <React.Fragment>
      <Descriptions>
        <Descriptions.Item label="Payment">
          <PaymentStatusChip appointment={props.appointment} />
        </Descriptions.Item>
      </Descriptions>
      <Card
        style={{
          borderRadius: 5,
          maxWidth: "25rem",
        }}
        bodyStyle={{
          margin: 0,
          padding: "10px 20px 10px 20px",
        }}
        hoverable
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Statistic
            title="Total"
            value={Math.round(appointment?.total ?? 0)}
            prefix="$"
            valueStyle={{ fontSize: 26 }}
          />
          <div>
            <Divider type="vertical" style={{ height: "4rem" }} />
          </div>
          <Statistic
            title="Subtotal"
            value={Math.round(appointment?.subtotal ?? 0)}
            prefix="$"
            valueStyle={{ fontSize: 26 }}
          />
          <div>
            <Divider type="vertical" style={{ height: "4rem" }} />
          </div>
          <Statistic
            title="Tip"
            value={Math.round(appointment?.tip ?? 0)}
            prefix="$"
            valueStyle={{ fontSize: 26 }}
          />
        </div>
      </Card>
      <br />
    </React.Fragment>
  );
}

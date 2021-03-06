import React from "react";
import { Card, Row, Descriptions } from "antd";

const weekdays = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

export default function ServiceInfo(props) {
  const { service } = props;

  return (
    <Card bordered={false} bodyStyle={{ padding: 0 }}>
      <p style={{ fontWeight: 600 }}>Detailers</p>
      <Row>
        <Descriptions column={1}>
          {service.detailers.map((item) => (
            <Descriptions.Item key={item.id} label={item.firstName}>
              10 AM - 4 PM
            </Descriptions.Item>
          ))}
        </Descriptions>
      </Row>
    </Card>
  );
}

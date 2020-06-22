import React from "react";
import { Card, Row, Tag } from "antd";

// const weekdays = {
//   mon: "Monday",
//   tue: "Tuesday",
//   wed: "Wednesday",
//   thu: "Thursday",
//   fri: "Friday",
//   sat: "Saturday",
//   sun: "Sunday",
// };

export default function ServiceUpgradesInfo(props) {
  const { upgrades } = props;
  return (
    <Card bordered={false} bodyStyle={{ padding: 0 }}>
      <p style={{ fontWeight: 600 }}>Upgrades</p>

      <Row style={{ marginTop: 10 }}>
        {upgrades.map((item) => (
          <Tag style={{ marginTop: 10 }}>{item.name}</Tag>
        ))}
      </Row>
    </Card>
  );
}

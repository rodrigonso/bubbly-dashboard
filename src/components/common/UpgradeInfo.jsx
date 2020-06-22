import React from "react";
import { Card, Row } from "antd";

export default function UpgradeInfo(props) {
  return (
    <Card bordered={false} bodyStyle={{ padding: 0 }}>
      <p style={{ fontWeight: 600 }}>Upgrade Info</p>
      <Row></Row>
      <Row style={{ marginTop: 10 }}></Row>
    </Card>
  );
}

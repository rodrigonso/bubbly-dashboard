import React from "react";
import { Card, Row, Col, Typography, Tag, Checkbox } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";

export default function UpgradeInfo(props) {
  const { upgrade } = props;
  return (
    <Card bordered={false} bodyStyle={{ padding: 0 }}>
      <p style={{ fontWeight: 600 }}>Upgrade Info</p>
      <Row></Row>
      <Row style={{ marginTop: 10 }}></Row>
    </Card>
  );
}

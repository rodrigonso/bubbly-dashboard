import React from "react";
import { Card, Row, Col, Typography } from "antd";
import { CarOutlined } from "@ant-design/icons";

export default function UserVehicleInfo(props) {
  const { vehicles } = props.customer;
  return (
    <Card bordered={false} bodyStyle={{ padding: 0 }}>
      <p style={{ fontWeight: 600 }}>Vehicle Info</p>
      {vehicles.length > 0
        ? vehicles.map((item) => {
            return (
              <Row>
                <Col>
                  <CarOutlined />
                </Col>
                <Col style={{ marginLeft: 10 }}>
                  <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                    {`${item.make} ${item.model}`}
                  </Typography.Text>
                </Col>
              </Row>
            );
          })
        : null}
    </Card>
  );
}

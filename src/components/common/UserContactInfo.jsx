import React from "react";
import { Card, Row, Col, Typography, Tag } from "antd";
import {
  MailOutlined,
  HomeOutlined,
  MobileOutlined,
  ShopOutlined,
} from "@ant-design/icons";

const roles = {
  manager: "Manager",
  detailer: "Detailer",
  customer: "Customer",
};

export default function UserContactInfo(props) {
  const { user } = props;
  return (
    <Card bordered={false} bodyStyle={{ padding: 0 }}>
      <p style={{ fontWeight: 600 }}>Contact Info</p>
      <Row>
        <Col>
          <MailOutlined />
        </Col>
        <Col style={{ marginLeft: 10 }}>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            {user.email}
          </Typography.Text>
        </Col>
      </Row>
      {user.addresses
        ? user.addresses.map((item) => (
            <Row style={{ marginTop: 5 }}>
              <Col>
                {item.icon === "home" ? <HomeOutlined /> : <ShopOutlined />}
              </Col>
              <Col style={{ marginLeft: 10 }}>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                  {item.toString()}
                </Typography.Text>
              </Col>
            </Row>
          ))
        : null}
      <Row style={{ marginTop: 5 }}>
        <Col>
          <MobileOutlined />
        </Col>
        <Col style={{ marginLeft: 10 }}>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            {user.phone}
          </Typography.Text>
        </Col>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <Col>
          <Tag>{roles[user.role]}</Tag>
        </Col>
      </Row>
    </Card>
  );
}

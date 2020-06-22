import React from "react";
import { Card, Row, Col, Typography } from "antd";
import { CreditCardOutlined } from "@ant-design/icons";

export default function UserPaymentInfo(props) {
  const { sources } = props.customer;
  return (
    <Card bordered={false} bodyStyle={{ padding: 0 }}>
      <p style={{ fontWeight: 600 }}>Payment Info</p>
      {sources.length > 0
        ? sources.map((item) => {
            return (
              <Row>
                <Col>
                  <CreditCardOutlined />
                </Col>
                <Col style={{ marginLeft: 10 }}>
                  <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                    {`${item.card_brand} ${item.last_4}`}
                  </Typography.Text>
                </Col>
              </Row>
            );
          })
        : null}
    </Card>
  );
}

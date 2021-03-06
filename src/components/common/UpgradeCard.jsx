import React from "react";
import { Card, Row, Col, Checkbox, Typography } from "antd";

export default function UpgradeCard(props) {
  const { item, onClick, selected } = props;

  return (
    <Card
      style={{
        // width: "390px",
        borderRadius: 5,
        // width: "48.5%",
        // margin: "0px 10px 10px 0px",
        marginBottom: "-0.5rem",
      }}
      onClick={() => onClick(item)}
    >
      <Row justify="space-between">
        <Col>
          <p
            style={{
              fontWeight: 700,
              fontSize: 16,
              marginBottom: 5,
            }}
          >
            {item.name}
          </p>
        </Col>
        <Col>
          <Checkbox checked={selected} onChange={() => onClick(item)} />
        </Col>
      </Row>
      <Col justify="space-between">
        <div
          style={{
            height: "45px",
            textOverflow: "elipsis",
            marginBottom: 5,
          }}
        >
          <Typography.Text type="secondary">{item.desc}</Typography.Text>
        </div>
        <div>
          <p style={{ fontWeight: 600, marginBottom: 0 }}>{`$${item.price}`}</p>
        </div>
      </Col>
    </Card>
  );
}

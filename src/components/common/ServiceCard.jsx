import React from "react";
import { Card, Row, Col, Checkbox, Typography } from "antd";

const types = {
  sedan: "Sedan",
  "non-sedan": "Non-Sedan",
};

export default function ServiceCard(props) {
  const { item, onClick, selected } = props;

  return (
    <Card
      style={{
        width: "48.5%",
        margin: "0px 10px 10px 0px",
        borderRadius: 5,
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
        <Row>
          <Col>
            <div>
              <p
                style={{ fontWeight: 600, marginBottom: 0 }}
              >{`$${item.price}`}</p>
            </div>
          </Col>
        </Row>
      </Col>
    </Card>
  );
}

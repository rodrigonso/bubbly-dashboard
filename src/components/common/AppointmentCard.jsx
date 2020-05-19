import React from "react";
import { Card, Row, Col, Typography, Divider } from "antd";
import PaymentStatusChip from "../common/PaymentStatusChip";
import { CarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import moment from "moment";

const formatDate = (date) => {
  return moment(date).format("LT");
};

const isPaidOnline = (item) => {
  return item?.charge?.payment?.status === "COMPLETED"
    ? "Paid Online"
    : "Not Paid";
};

export default function AppointmentCard(props) {
  const { item, onClick } = props;
  return (
    <React.Fragment>
      <Card
        bordered={false}
        hoverable
        onClick={onClick}
        style={{ padding: 0, margin: 0 }}
        bodyStyle={{ padding: "10px 10px 30px 10px" }}
      >
        <Row justify="space-between" align="bottom">
          <Col justify="space-between">
            <div
              style={{
                height: "45px",
                textOverflow: "elipsis",
                marginBottom: 5,
              }}
            >
              <p
                style={{
                  fontWeight: 500,
                  fontSize: 14,
                  marginBottom: 5,
                }}
              >
                {item.service.name}
              </p>
              <Row>
                <Col>
                  <ClockCircleOutlined />
                </Col>
                <Col>
                  <Typography.Text
                    style={{ marginLeft: 10, fontSize: 12 }}
                    type="secondary"
                  >
                    {`${formatDate(item.startTime)} - ${formatDate(
                      item.endTime
                    )}`}
                  </Typography.Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <CarOutlined />
                </Col>
                <Col>
                  <Typography.Text
                    style={{ marginLeft: 10, fontSize: 12 }}
                    type="secondary"
                  >
                    {item.userVehicle.model}
                  </Typography.Text>
                </Col>
              </Row>
            </div>
          </Col>
          <Col align="center">
            <div>
              <p
                style={{ fontWeight: 600, marginBottom: 0 }}
              >{`$${item.total}`}</p>
              <PaymentStatusChip>{isPaidOnline(item)}</PaymentStatusChip>
            </div>
          </Col>
        </Row>
      </Card>
      <Divider />
    </React.Fragment>
  );
}

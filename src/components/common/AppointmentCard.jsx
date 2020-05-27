import React from "react";
import { Card, Row, Col, Typography, Divider } from "antd";
import PaymentStatusChip from "../common/PaymentStatusChip";
import {
  CarOutlined,
  ClockCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import moment from "moment";

const formatDate = (date) => {
  return moment(date).format("LT");
};

export default function AppointmentCard(props) {
  const { appointment, onClick } = props;
  return (
    <React.Fragment>
      <Card
        bordered={props.bordered}
        hoverable
        onClick={onClick}
        style={{ padding: 0, borderRadius: 5, marginBottom: 10 }}
        bodyStyle={{ padding: "10px 15px 55px 15px" }}
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
                {appointment.service.name}
              </p>
              <Row>
                <Col>
                  <UserOutlined />
                </Col>
                <Col>
                  <Typography.Text
                    style={{ marginLeft: 10, fontSize: 12 }}
                    type="secondary"
                  >
                    {appointment.customer.formatName()}
                  </Typography.Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <ClockCircleOutlined />
                </Col>
                <Col>
                  <Typography.Text
                    style={{ marginLeft: 10, fontSize: 12 }}
                    type="secondary"
                  >
                    {`${formatDate(appointment.startTime)} - ${formatDate(
                      appointment.endTime
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
                    {appointment.vehicle.model}
                  </Typography.Text>
                </Col>
              </Row>
            </div>
          </Col>
          <Col align="center">
            <div>
              <p
                style={{ fontWeight: 600, marginBottom: 0 }}
              >{`$${appointment.total}`}</p>
              <PaymentStatusChip status={appointment.paymentStatus} />
            </div>
          </Col>
        </Row>
      </Card>
      {props.divider ? <Divider /> : null}
    </React.Fragment>
  );
}

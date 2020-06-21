import React from "react";
import { Card, Row, Steps, Typography, Divider, Badge, Popover } from "antd";
import PaymentStatusChip from "../common/PaymentStatusChip";
import {
  CarOutlined,
  ClockCircleOutlined,
  UserOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";

const formatDate = (date) => {
  return moment(date).format("LT");
};

const statuses = {
  DRIVING: "Driving",
  WASHING: "Washing",
  CONFIRMED: "Confirmed",
  COMPLETED: "Completed",
};
const statuses2 = {
  DRIVING: "processing",
  WASHING: "processing",
  CONFIRMED: "default",
  CANCELED: "error",
  COMPLETED: "success",
};

export default function AppointmentCard(props) {
  const { appointment, onClick, isSelected = false } = props;
  return (
    <React.Fragment>
      <Card
        bordered={props.bordered}
        hoverable
        onClick={onClick}
        style={{
          padding: 0,
          borderRadius: 5,
          marginBottom: 10,
          borderColor: `${isSelected ? "#1180ff" : null}`,
        }}
        bodyStyle={{
          padding: "15px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            // alignItems: "center",
          }}
        >
          <div className="left-col">
            <div
              style={{
                textOverflow: "elipsis",
              }}
            >
              <p
                style={{
                  fontWeight: 600,
                  fontSize: 14,
                  marginBottom: 10,
                }}
              >
                {appointment.service.name}
              </p>
              <div>
                <div style={{ display: "flex" }}>
                  <UserOutlined style={{ fontSize: 12 }} />
                  <Typography.Text
                    type="secondary"
                    style={{
                      marginLeft: 10,
                      fontSize: 12,
                      textOverflow: "elipsis",
                    }}
                  >
                    {appointment.customer.firstName}
                  </Typography.Text>
                </div>
              </div>
              <div>
                <ClockCircleOutlined style={{ fontSize: 12 }} />
                <Typography.Text
                  type="secondary"
                  style={{ marginLeft: 10, fontSize: 12 }}
                >
                  {`${formatDate(appointment.startTime)} - ${formatDate(
                    appointment.endTime
                  )}`}
                </Typography.Text>
              </div>
              <div>
                <CarOutlined style={{ fontSize: 12 }} />
                <Typography.Text
                  type="secondary"
                  style={{ marginLeft: 10, fontSize: 12 }}
                >
                  {appointment.vehicle.model}
                </Typography.Text>
              </div>
            </div>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <PaymentStatusChip appointment={appointment} />
              <Badge
                style={{ marginTop: 2.5, marginLeft: 10 }}
                status={statuses2[appointment.status]}
                text={
                  <Typography.Text style={{ fontSize: 12 }} type="secondary">
                    {statuses[appointment.status]}
                  </Typography.Text>
                }
              />
            </div>
          </div>
        </div>
      </Card>
      {props.divider ? <Divider /> : null}
    </React.Fragment>
  );
}

import React from "react";
import { Card, Typography, Divider, Badge } from "antd";
import PaymentStatusChip from "../common/PaymentStatusChip";
import {
  CarOutlined,
  ClockCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { withRouter } from "react-router-dom";

const statuses = {
  DRIVING: "Driving",
  WASHING: "Washing",
  CONFIRMED: "Confirmed",
  COMPLETED: "Completed",
  LATE: "Late",
};
const statuses2 = {
  CONFIRMED: "success",
  DRIVING: "processing",
  WASHING: "processing",
  COMPLETED: "default",
  CANCELED: "error",
  LATE: "warning",
};

function AppointmentCard(props) {
  const { appointment, isSelected, extended, onClick } = props;

  const formatTime = (date) => {
    return moment(date).format("LT");
  };

  const formatDate = (date) => {
    return moment(date).format("MMM Do YY");
  };

  const renderDateAndTime = () => {
    const { date, startTime, endTime } = appointment;
    if (extended) {
      return `${formatDate(date)}, ${formatTime(startTime)} - ${formatTime(
        endTime
      )}`;
    } else {
      return `${formatTime(startTime)} - ${formatTime(endTime)}`;
    }
  };

  const handleClick = () => {
    return props.history.push({
      pathname: `schedule/${appointment.id}`,
      state: appointment.id,
    });
  };

  return (
    <React.Fragment>
      <Card
        bordered={props.bordered}
        hoverable
        onClick={onClick ?? handleClick}
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
                    {extended
                      ? appointment.customer.toString()
                      : appointment.customer.firstName}
                  </Typography.Text>
                </div>
              </div>
              <div>
                <ClockCircleOutlined style={{ fontSize: 12 }} />
                <Typography.Text
                  type="secondary"
                  style={{ marginLeft: 10, fontSize: 12 }}
                >
                  {renderDateAndTime()}
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
                status={statuses2[appointment.calculateStatus()]}
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

export default withRouter(AppointmentCard);

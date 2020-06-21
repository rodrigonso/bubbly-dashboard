import React from "react";
import {
  UserOutlined,
  EnvironmentOutlined,
  CarOutlined,
  CheckCircleOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Typography, Divider, Timeline } from "antd";
import moment from "moment";

const statuses = ["CONFIRMED", "DRIVING", "WASHING", "COMPLETED", ""];
const formatted = {
  CONFIRMED: "Confirmed",
  DRIVING: "Driving",
  WASHING: "Washing",
  COMPLETED: "Completed",
};

export default function ActiveAppointmentInfo(props) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <p>Appointment Info</p>
      <div>
        <UserOutlined />
        <Typography.Text
          style={{ marginLeft: 10, fontSize: 12 }}
          type="secondary"
        >
          {props.appointment.customer.toString()}
        </Typography.Text>
      </div>
      <div style={{ marginTop: 5 }}>
        <CalendarOutlined />
        <Typography.Text
          style={{ marginLeft: 10, fontSize: 12 }}
          type="secondary"
        >
          {moment(props.appointment.date).format("LL")}
        </Typography.Text>
      </div>
      <div style={{ marginTop: 5 }}>
        <ClockCircleOutlined />
        <Typography.Text
          style={{ marginLeft: 10, fontSize: 12 }}
          type="secondary"
        >
          {moment(props.appointment.startTime).format("LT")} -{" "}
          {moment(props.appointment.endTime).format("LT")}
        </Typography.Text>
      </div>
      <div style={{ marginTop: 5 }}>
        <CarOutlined />
        <Typography.Text
          style={{ marginLeft: 10, fontSize: 12 }}
          type="secondary"
        >
          {`${props.appointment.vehicle.make} ${props.appointment.vehicle.model}`}
        </Typography.Text>
      </div>
      <div style={{ marginTop: 5 }}>
        <EnvironmentOutlined />
        <Typography.Text
          style={{ marginLeft: 10, fontSize: 12 }}
          type="secondary"
        >
          {props.appointment.address.toString()}
        </Typography.Text>
      </div>
      <Divider />
      <div>
        <p>Status</p>
        <Timeline
          pending={
            props.appointment.status !== "COMPLETED" ? (
              <Typography.Text style={{ fontSize: 12 }} type="secondary">
                {" "}
                {formatted[props.appointment.status]}
              </Typography.Text>
            ) : null
          }
        >
          {statuses
            .slice(
              0,
              statuses.indexOf(props.appointment.status) +
                (props.appointment.status === "COMPLETED" ? 1 : 0)
            )
            .map((item, i) => (
              <Timeline.Item dot={<CheckCircleOutlined />} key={i}>
                <Typography.Text style={{ fontSize: 12 }} type="secondary">
                  {formatted[item]}
                </Typography.Text>
              </Timeline.Item>
            ))}
        </Timeline>
      </div>
    </div>
  );
}

import React from "react";
import {
  UserOutlined,
  EnvironmentOutlined,
  CarOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";
import moment from "moment";
import { withRouter } from "react-router-dom";

function TrackAppointmentInfo(props) {
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
    </div>
  );
}

export default withRouter(TrackAppointmentInfo);

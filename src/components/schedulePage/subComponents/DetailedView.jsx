import React from "react";
import { Link, Redirect } from "react-router-dom";
import moment from "moment";

import { Card, Empty, Timeline, Typography, Button } from "antd";
import { PlusSquareOutlined, PlusOutlined } from "@ant-design/icons";
import AppointmentCard from "../../common/AppointmentCard";

const { Text } = Typography;

const filterAppointments = (appointments, selectedDate) => {
  return appointments.filter(
    (item) => moment(item.date).dayOfYear() === moment(selectedDate).dayOfYear()
  );
};

const handleClick = (props, id) => {
  return props.history.push({
    pathname: `schedule/${id}`,
    state: { appointmentId: id },
  });
};

export default function DetailedView(props) {
  const { selectedDate, appointments } = props;
  const isEmpty = appointments.length === 0;
  const cardTitle = moment(selectedDate).format("LL");
  const filtered = filterAppointments(appointments, selectedDate);

  switch (isEmpty) {
    case false:
      return (
        <Card
          title={cardTitle}
          style={{ backgroundColor: "#fff", borderRadius: 5 }}
        >
          {filtered.map((item) => {
            return (
              <AppointmentCard
                item={item}
                onClick={() => handleClick(props, item.id)}
              />
            );
          })}
          <Button
            style={{ height: 90, width: "100%" }}
            type="dashed"
            size="small"
            icon={<PlusOutlined />}
          >
            Appointment
          </Button>
        </Card>
      );

    default:
      return (
        <Card title={cardTitle}>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No appointments"
          />
        </Card>
      );
  }
}

import React from "react";
import { Link, Redirect } from "react-router-dom";
import moment from "moment";

import { Card, Empty, Timeline, Typography, Button, Divider } from "antd";
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
  const isSearch = props.title;
  const cardTitle = props.title
    ? `Results for: ${props.title}`
    : moment(selectedDate).format("LL");
  const filtered = isSearch
    ? appointments
    : filterAppointments(appointments, selectedDate);

  return (
    <Card
      title={cardTitle}
      style={{
        backgroundColor: "#fff",
        borderRadius: 5,
        height: "74vh",
        maxHeight: "80vh",
        overflow: "scroll",
      }}
    >
      {filtered.length > 0 ? (
        filtered.map((item) => {
          return (
            <AppointmentCard
              appointment={item}
              onClick={() => handleClick(props, item.id)}
            />
          );
        })
      ) : (
          <React.Fragment>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="No appointments"
            />
          </React.Fragment>
        )}
      <Button
        style={{ height: 90, width: "100%" }}
        type="dashed"
        size="small"
        icon={<PlusOutlined />}
        onClick={props.toggleModal}
      >
        Appointment
      </Button>
    </Card>
  );
}

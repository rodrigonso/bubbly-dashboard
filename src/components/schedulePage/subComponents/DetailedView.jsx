import React from "react";
import moment from "moment";

import { Card, Empty, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AppointmentCard from "../../common/AppointmentCard";
import NewAppointmentModal from "./NewAppointmentModal";
import withModal from "../../hoc/withModal";

function DetailedView(props) {
  const { selectedDate, appointments } = props;

  const filterAppointments = (appointments, selectedDate) => {
    return appointments.filter(
      (item) =>
        moment(item.date).dayOfYear() === moment(selectedDate).dayOfYear()
    );
  };

  const handleClick = (props, id) => {
    return props.history.push({
      pathname: `schedule/${id}`,
      state: { appointmentId: id },
    });
  };

  const isSearch = props.title;
  const cardTitle = props.title
    ? `Results for: ${props.title}`
    : moment(selectedDate).format("LL");
  const filtered = isSearch
    ? appointments
    : filterAppointments(appointments, selectedDate);

  return (
    <React.Fragment>
      <NewAppointmentModal
        visible={props.visible}
        onOk={props.toggleModal}
        onCancel={props.toggleModal}
        selectedDate={selectedDate}
      />

      <Card
        title={cardTitle}
        style={{
          backgroundColor: "#fff",
          borderRadius: 5,
          // maxHeight: "90vh",
          height: "80vh",
          overflow: "scroll",
        }}
      >
        {filtered.length > 0 ? (
          filtered.map((item) => {
            return (
              <AppointmentCard
                key={item.id}
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
    </React.Fragment>
  );
}

export default withModal()(DetailedView);

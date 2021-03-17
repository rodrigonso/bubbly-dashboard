import React from "react";
import moment from "moment";

import { Card, Empty, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AppointmentCard from "../../common/AppointmentCard";
import NewAppointmentModal from "./NewAppointmentModal";
import withModal from "../../hoc/withModal";
import BlockedTimeCard from "../../common/BlockedTimeCard";

function DetailedView(props) {
  const { selectedDate, appointments } = props;

  const filterAppointments = (appointments, selectedDate) => {
    let today = appointments.filter(
      (item) =>
        moment(item.date).dayOfYear() === moment(selectedDate).dayOfYear()
    );

    return today.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
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
      <Card
        title={cardTitle}
        style={{
          backgroundColor: "#fff",
          borderRadius: 5,
          // maxHeight: "90vh",
          height: "80vh",
          overflow: "scroll",
        }}
        bodyStyle={{ padding: "1rem 1rem 1rem 0.75rem" }}
      >
        {filtered.length > 0 ? (
          filtered.map((item) => {
            if (item.status === "BLOCKED_TIME")
              return (
                <BlockedTimeCard key={item.startTime} appointment={item} />
              );
            else return <AppointmentCard key={item.id} appointment={item} />;
          })
        ) : (
          <React.Fragment>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="No appointments"
            />
          </React.Fragment>
        )}
      </Card>
    </React.Fragment>
  );
}

export default withModal()(DetailedView);

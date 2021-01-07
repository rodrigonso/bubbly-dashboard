import React, { useState, useEffect } from "react";
import BasicPage from "../common/BasicPage";
import moment from "moment";
import { Card, Badge, message, Tag } from "antd";

import MapContainer from "./subComponents/MapContainer";
import {
  getAppointmentById,
  streamEmployeeLocation,
} from "../../services/db_service";
import { LoadingOutlined } from "@ant-design/icons";
import BigColumn from "../common/BigColumn";
import SmallColumn from "../common/SmallColumn";
import ColumnsLayout from "../common/ColumnsLayout";
import { GoogleApiWrapper } from "google-maps-react";
function ActiveAppointmentDetailsPage(props) {
  const [appointment, setAppointment] = useState({});
  const [punctuality, setPunctuality] = useState();
  const [position, setPosition] = useState({});
  const [currentEta, setCurrentEta] = useState();

  useEffect(() => {
    getAppointmentById(props.location.state.appointmentId).then((appt) => {
      setAppointment(appt);
      getCurrentPosition(appt);
    });
    // eslint-disable-next-line
  }, [props.location.state.appointmentId]);

  const getCurrentPosition = (appointment) => {
    streamEmployeeLocation(appointment.employeeId).onSnapshot(
      (docSnap) => {
        const data = docSnap.data();
        const pos = { lat: data.lat, lng: data.lng };
        const currentEta = moment(new Date()).add(data.duration, "m");
        setPosition(pos);
        setCurrentEta(currentEta._d);
        calculatePunctuality(currentEta, appointment);
      },
      (err) => message.error(`${err.name}: ${err.message}`)
    );
  };

  const calculatePunctuality = (currentEta, appointment) => {
    const MS_TO_MIN = 60000;
    const difference = Math.round(
      (appointment.startTime - currentEta) / MS_TO_MIN
    );
    const isLate = currentEta >= appointment.startTime;

    if (!isLate) {
      if (difference === 0) {
        setPunctuality(<Tag color="success"> On time</Tag>);
      } else {
        setPunctuality(<Tag color="processing">{difference} mins early</Tag>);
      }
    } else {
      const diff = Math.abs(difference);
      if (diff > 59) {
        setPunctuality(
          <Tag color="error">{Math.floor(diff / 60)} hrs late</Tag>
        );
      } else if (diff > 15) {
        setPunctuality(<Tag color="error">{diff} mins late</Tag>);
      } else {
        setPunctuality(<Tag color="warning">{diff} mins late</Tag>);
      }
    }
  };

  if (!appointment.service) return <LoadingOutlined />;

  return (
    <BasicPage title="Live view">
      <ColumnsLayout>
        <BigColumn>
          <Card
            style={{ height: "80vh", borderRadius: 5 }}
            bodyStyle={{ padding: 0 }}
            title={<Badge status="processing" />}
            extra={punctuality}
          >
            <MapContainer
              appointment={appointment}
              google={props.google}
              position={position}
            />
          </Card>
        </BigColumn>
        <SmallColumn>
          <Card style={{ borderRadius: 5 }}>
            <p>Start: {moment(appointment.startTime).format("LT")}</p>
            <p>Current ETA: {moment(currentEta).format("LT")}</p>
          </Card>
        </SmallColumn>
      </ColumnsLayout>
    </BasicPage>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyARcO2C-jzRqTZb52_cV2N3gEE9JS28nqE",
})(ActiveAppointmentDetailsPage);

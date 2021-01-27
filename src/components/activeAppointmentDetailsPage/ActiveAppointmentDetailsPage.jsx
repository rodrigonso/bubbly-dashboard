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
  const [currentEta, setCurrentEta] = useState(0);
  const [distance, setDistance] = useState(0);

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
        const currentEta = moment().add(30, "minutes");
        setPosition(pos);
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
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const deg2rad = (deg) => deg * (Math.PI / 180);
    const R = 6317; // radius of earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLng = deg2rad(lng2 - lng1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const res = R * c;
    return Math.round(res * 10) / 10;
  };

  const calculateETA = (distance) => {
    const AVG_SPEED = 50; // in miles/hour

    let duration = Math.round((distance / AVG_SPEED) * 10) / 10;
    console.log("DURATION", duration);

    const start = moment();
    const end = start.clone().add(moment.duration(duration, "hours"));

    return end;
  };

  const handleRouteBuild = (route) => {
    let distanceInMiles = 0;
    for (let i = 0; i < route.length - 1; i++) {
      const lat1 = route[i].lat();
      const lng1 = route[i].lng();

      const lat2 = route[i + 1].lat();
      const lng2 = route[i + 1].lng();

      distanceInMiles += calculateDistance(lat1, lng1, lat2, lng2);
    }
    setDistance(distanceInMiles);
    const eta = calculateETA(distanceInMiles);
    setCurrentEta(eta);
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
              onRouteBuild={handleRouteBuild}
            />
          </Card>
        </BigColumn>
        <SmallColumn>
          <Card style={{ borderRadius: 5 }}>
            <p>Start: {moment(appointment.startTime).format("LT")}</p>
            <p>Current ETA: {moment(currentEta).format("LT")}</p>
            <p>Distance: {Math.round(distance)} mi</p>
          </Card>
        </SmallColumn>
      </ColumnsLayout>
    </BasicPage>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyARcO2C-jzRqTZb52_cV2N3gEE9JS28nqE",
})(ActiveAppointmentDetailsPage);

import React, { useState, useEffect } from "react";
import BasicPage from "../common/BasicPage";
import moment from "moment";
import { Card, Badge, message, Tag, Statistic, Divider } from "antd";

import MapContainer from "../common/MapContainer";
import { getAppointmentById } from "../../services/db_service";

import { EmployeeApi } from "../../api/employeeApi";

import { LoadingOutlined } from "@ant-design/icons";
import BigColumn from "../common/BigColumn";
import SmallColumn from "../common/SmallColumn";
import ColumnsLayout from "../common/ColumnsLayout";
function ActiveAppointmentDetailsPage(props) {
  const [appointment, setAppointment] = useState({});
  const [punctuality, setPunctuality] = useState(null);
  const [currentEta, setCurrentEta] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [distance, setDistance] = useState(0);
  const [position, setPosition] = useState(null);

  const meters2miles = (speed) => speed * 2.23694;

  useEffect(() => {
    let subscription;
    getAppointmentById(props.location.state.appointmentId).then((appt) => {
      setAppointment(appt);
      subscription = EmployeeApi.listenToDetailerPositionById(
        appt.employeeId,
        (pos) => {
          setSpeed(meters2miles(pos.speed));
          setPosition({ lat: pos.lat, lng: pos.lng });
        }
      );
    });

    // remove listener at dispose
    return () => subscription.off();
  }, [props.location.state.appointmentId]);

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
    const kmToMiles = 1.609;
    let dinstanceInKm = 0;
    for (let i = 0; i < route.length - 1; i++) {
      const lat1 = route[i].lat();
      const lng1 = route[i].lng();

      const lat2 = route[i + 1].lat();
      const lng2 = route[i + 1].lng();

      dinstanceInKm += calculateDistance(lat1, lng1, lat2, lng2);
    }

    const distanceInMiles = dinstanceInKm / kmToMiles;

    setDistance(distanceInMiles);
    const eta = calculateETA(distanceInMiles);
    setCurrentEta(eta);
  };

  const shouldBuildRoute = () => {
    const { status } = appointment;
    return status === "DRIVING" || status === "CONFIRMED";
  };

  const renderEtaValue = () => {
    let color = "black";
    const status = appointment.calculateStatus();

    if (status === "DELAYED") color = "amber";
    if (status === "LATE") color = "red";
    return color;
  };

  if (!appointment.service) return <LoadingOutlined />;

  return (
    <BasicPage title="Live view">
      <ColumnsLayout>
        <BigColumn>
          <Card
            style={{ height: "80vh", borderRadius: 5 }}
            bodyStyle={{ padding: 0, height: "100%", width: "100%" }}
          >
            <MapContainer
              origin={position}
              destination={{
                lat: appointment.address.coords.latitude,
                lng: appointment.address.coords.longitude,
              }}
              shouldBuildRoute={shouldBuildRoute()}
              onRouteBuild={handleRouteBuild}
            />
          </Card>
        </BigColumn>
        <SmallColumn>
          <Card style={{ borderRadius: 5 }}>
            <Statistic
              valueStyle={{
                color: renderEtaValue(),
              }}
              title="Current ETA"
              value={moment(currentEta).format("LT")}
            />
            <p>Expected: {moment(appointment.startTime).format("LT")}</p>
            <p>Speed: {Math.round(speed)} mph</p>
            <Divider />
          </Card>
        </SmallColumn>
      </ColumnsLayout>
    </BasicPage>
  );
}

export default ActiveAppointmentDetailsPage;

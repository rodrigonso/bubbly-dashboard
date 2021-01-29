import React, { useState, useEffect } from "react";
import { Card, Divider, Statistic } from "antd";
import { getAppointmentsFromRange } from "../../services/db_service";
import BasicPage from "../common/BasicPage";
import moment from "moment";
import CheckableTag from "antd/lib/tag/CheckableTag";
import { ResponsiveBar } from "@nivo/bar";

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [appointmentsMode, setAppointmentsMode] = useState("week");
  const [appointmentsRange, setAppointmentsRange] = useState([
    moment().startOf("week"),
    moment().endOf("week"),
  ]);

  useEffect(() => {
    if (appointments.length === 0) setLoading(true);
    getAppointmentsFromRange(appointmentsRange)
      .then(setAppointments)
      .finally(() => setLoading(false));
  }, [appointmentsRange, appointments.length]);

  const formatAppointmentsData = () => {
    const range = [...appointmentsRange];
    let start = moment(range[0]);
    const end = moment(range[1]);
    const mode = appointmentsMode;

    const length =
      mode === "year"
        ? end.month() - start.month()
        : end.dayOfYear() - start.dayOfYear();

    let arr = new Array(length);
    for (let i = 0; i < length; i++) {
      arr[i] = {
        period:
          mode === "year"
            ? start.format("MMM")
            : mode === "week"
            ? start.format("ddd")
            : start.dayOfYear(),
        value: 0,
      };
      start.add(1, mode === "year" ? "month" : "days");
    }

    for (let i = 0; i < appointments.length; i++) {
      const curr = appointments[i];
      let idx = 0;

      if (mode === "year")
        idx = moment(curr.date).month() - appointmentsRange[0].month();
      else
        idx = moment(curr.date).dayOfYear() - appointmentsRange[0].dayOfYear();

      if (arr[idx]) {
        arr[idx].value++;
      }
    }
    return arr;
  };

  const calculateAvgTicketPrice = () => {
    let sum = 0;
    appointments.forEach((item) => (sum += item.total));
    return Number.parseFloat(sum / appointments.length).toFixed(1);
  };

  const calculateAppointmentsPerDay = () => {
    const range =
      moment(appointmentsRange[1]).dayOfYear() -
      moment(appointmentsRange[0]).dayOfYear() +
      1;

    return Number.parseFloat(appointments.length / range).toFixed(1);
  };

  const handleModeChange = (mode) => {
    setAppointmentsMode(mode);
    setAppointmentsRange([moment().startOf(mode), moment().endOf(mode)]);
  };

  const calculateRevenue = () => {
    let totalRevenue = 0;
    appointments.map((item) => (totalRevenue += item.total));
    return totalRevenue;
  };

  const calculateAverageRating = () => {
    let ratingSum = 0;
    appointments.map((item) => (ratingSum += item?.rating ?? 5));
    return Math.round((ratingSum / appointments.length) * 10) / 10;
  };

  return (
    <BasicPage title="Analysis">
      <Card
        title="Appointments"
        style={{ borderRadius: 5 }}
        extra={
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              <CheckableTag
                onChange={() => handleModeChange("week")}
                checked={appointmentsMode === "week"}
              >
                This Week
              </CheckableTag>
              <CheckableTag
                onChange={() => handleModeChange("month")}
                checked={appointmentsMode === "month"}
              >
                This Month
              </CheckableTag>
              <CheckableTag
                onChange={() => handleModeChange("year")}
                checked={appointmentsMode === "year"}
              >
                This Year
              </CheckableTag>
            </div>
          </div>
        }
      >
        <div style={{ width: "100%", height: "17.5rem" }}>
          <ResponsiveBar
            animate
            colors={"#cae6fc"}
            borderColor="#1180ff"
            margin={{ top: 40, right: 20, bottom: 50, left: 50 }}
            padding={0.3}
            valueScale={{ type: "linear" }}
            data={formatAppointmentsData()}
            indexBy="period"
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Appointments",
              legendPosition: "middle",
              legendOffset: -40,
            }}
          />
        </div>
        <Divider />
        <div style={{ display: "flex" }}>
          <Statistic
            loading={loading}
            style={{ marginLeft: "1rem" }}
            prefix="$"
            title="Avg ticket price"
            value={calculateAvgTicketPrice()}
          />
          <Divider
            type="vertical"
            style={{ height: "5rem", marginLeft: "1.5rem" }}
          />
          <Statistic
            loading={loading}
            style={{ marginLeft: "1.5rem" }}
            suffix="per day"
            title="Avg appointments"
            value={calculateAppointmentsPerDay()}
          />
          <Divider
            type="vertical"
            style={{ height: "5rem", marginLeft: "1.5rem" }}
          />
          <Statistic
            loading={loading}
            style={{ marginLeft: "1rem" }}
            prefix="$"
            title="Revenue"
            value={calculateRevenue()}
          />
          <Divider
            type="vertical"
            style={{ height: "5rem", marginLeft: "1.5rem" }}
          />
          <Statistic
            loading={loading}
            style={{ marginLeft: "1rem" }}
            title="Avg rating"
            suffix="/ 5"
            value={calculateAverageRating()}
          />
        </div>
      </Card>
    </BasicPage>
  );
}

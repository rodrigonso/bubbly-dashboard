import React, { useState, useEffect } from "react";
import { Card, Divider, Statistic } from "antd";
import { getAppointmentsFromRange } from "../../services/db_service";
import BasicPage from "../common/BasicPage";
import moment from "moment";
import CheckableTag from "antd/lib/tag/CheckableTag";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [appointmentsMode, setAppointmentsMode] = useState("week");
  const [appointmentsRange, setAppointmentsRange] = useState([
    moment().startOf("week"),
    moment().endOf("week"),
  ]);

  useEffect(() => {
    setLoading(true);
    getAppointmentsFromRange(appointmentsRange)
      .then((appts) =>
        setAppointments(appts.filter((i) => i.status !== "BLOCKED_TIME"))
      )
      .finally(() => setLoading(false));
  }, [appointmentsRange]);

  const formatAppointmentsData = () => {
    const range = [...appointmentsRange];
    let start = moment(range[0]);
    const end = moment(range[1]);
    const mode = appointmentsMode;

    let length;
    if (mode === "year") length = end.month() - start.month() + 1;
    else length = end.date() - start.date() + 1;

    let arr = new Array(length);
    for (let i = 0; i < length; i++) {
      arr[i] = {
        period:
          mode === "year"
            ? start.format("MMM")
            : mode === "week"
            ? start.format("ddd")
            : start.date(),
        value: 0,
      };
      start.add(1, mode === "year" ? "month" : "days");
    }

    for (let i = 0; i < appointments.length; i++) {
      const curr = appointments[i];
      let idx = 0;

      if (mode === "year")
        idx = moment(curr.date).month() - appointmentsRange[0].month();
      else idx = moment(curr.date).date() - appointmentsRange[0].date();

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
      moment(appointmentsRange[1]).date() -
      moment(appointmentsRange[0]).date() +
      1;

    return Number.parseFloat(appointments.length / range).toFixed(1);
  };

  const handleModeChange = (mode) => {
    setAppointmentsMode(mode);
    setAppointmentsRange([moment().startOf(mode), moment().endOf(mode)]);
  };

  const calculateNumOfAppointments = () => appointments.length;

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

  const filterAppointments = () => {
    const filtered = appointments.filter((item) => {
      if (appointmentsMode === "week") {
        const curr = moment().week();
        return moment(item.date).week() === curr;
      }
      if (appointmentsMode === "month") {
        const curr = moment().month();
        return moment(item.date).month() === curr;
      } else return moment(item.date).year() === moment().year();
    });
    return filtered;
  };

  const calculateTickInterval = (data) => {
    let max = Number.MIN_SAFE_INTEGER;

    data.map((item) => (max = Math.max(max, item.value)));
    return max;
  };

  const calculateProductDistribution = () => {
    const filtered = filterAppointments();
    if (filtered.length === 0) return [];

    const res = [];
    const colors = ["#1180ff", "#62a6f5", "#0955ad", "#cae6fc"];

    filtered.map((item) => {
      const prodName = item.service.name;
      const existing = res.find((i) => i.name === prodName);
      const idx = res.indexOf(existing);

      if (!existing) {
        res.push({
          id: prodName,
          label: prodName,
          name: prodName,
          value: 1,
        });
      } else {
        res[idx].color = colors[idx];
        res[idx].value++;
      }
    });
    return res;
  };

  const formattedData = formatAppointmentsData();

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
            data={formattedData}
            indexBy="period"
            axisLeft={{
              tickSize: 1,
              tickPadding: 5,
              tickRotation: 0,
              tickValues: calculateTickInterval(formattedData),
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
            title="Appointments"
            value={calculateNumOfAppointments()}
          />
          <Divider
            type="vertical"
            style={{ height: "5rem", marginLeft: "1.5rem" }}
          />
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
      <Card
        title="Product Distribution"
        style={{ borderRadius: 5, marginTop: "1rem" }}
      >
        <div style={{ width: "100%", height: "20rem" }}>
          <ResponsivePie
            data={calculateProductDistribution()}
            margin={{ top: 40, right: 80, bottom: 20, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={0}
            colors={{ datum: "data.color" }}
            borderWidth={1}
            borderColor={{ from: "color" }}
            radialLabelsSkipAngle={10}
            radialLabelsTextColor={"#333333"}
            radialLabelsLinkColor={"#333333"}
            sliceLabelsSkipAngle={10}
            sliceLabelsTextColor={"#ffffff"}
          />
        </div>
      </Card>
    </BasicPage>
  );
}

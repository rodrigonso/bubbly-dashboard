import React from "react";
import { Card, Statistic } from "antd";

export default function ScheduleOverview(props) {
  const { totalAppointments } = props;
  return (
    <Card>
      <Statistic
        title="Appointments this month"
        value={totalAppointments}
      ></Statistic>
    </Card>
  );
}

import React from "react";
import { Card, Statistic, Skeleton } from "antd";

export default function ScheduleOverview(props) {
  const { totalAppointments, loading } = props;
  return (
    <Card>
      <Skeleton
        loading={loading}
        active={loading}
        paragraph={{ rows: 1, width: ["20%"] }}
        title={{ width: "60%" }}
      >
        <Statistic title="Appointments this month" value={totalAppointments} />
      </Skeleton>
    </Card>
  );
}

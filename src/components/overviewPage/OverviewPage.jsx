import React, { useEffect, useState } from "react";
import BasicPage from "../common/BasicPage";
import { Card, List, Button, Statistic, Divider } from "antd";
import ColumnsLayout from "../common/ColumnsLayout.jsx";
import BigColumn from "../common/BigColumn";
import SmallColumn from "../common/SmallColumn";
import { getAppointmentsToday } from "../../services/db_service";
import AppointmentCard from "../common/AppointmentCard";
import CustomSider from "../common/CustomSider";
import { CloudOutlined } from "@ant-design/icons";
import CheckableTag from "antd/lib/tag/CheckableTag";
import { ScheduleApi } from "../../api/scheduleApi";

function OverviewPage(props) {
  const [sortBy, setSortBy] = useState(0);
  const [appointmentsToday, setAppointmentsToday] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const sortOptions = [
    { name: "All", val: null },
    { name: "Active", val: "ACTIVE" },
    { name: "Completed", val: "COMPLETED" },
  ];

  useEffect(() => {
    const unsubscribe = ScheduleApi.listenToAppointmentsToday(
      setAppointmentsToday
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const getActiveAppointmentsLength = () => {
    return appointmentsToday.filter((item) => item.active === true).length;
  };

  const calculateTodaysTotal = () => {
    if (appointmentsToday.length === 1) {
      return appointmentsToday[0].total;
    } else {
      var total = appointmentsToday.reduce((acc, item) => acc + item.total, 0);
    }
    return total;
  };

  const calculateTodaysAverage = () => {
    var total = calculateTodaysTotal();
    return Math.round(total === 0 ? 0 : total / appointmentsToday.length);
  };

  const sortAppointments = () => {
    const appointments = [...appointmentsToday];

    if (sortBy === 0) return appointments;
    if (sortBy === 1)
      return appointments.filter((item) => item.active === true);

    return appointments.filter(
      (item) => item.status === sortOptions[sortBy].val
    );
  };

  return (
    <BasicPage title="Overview">
      <Card style={{ marginBottom: 15, borderRadius: 5 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Statistic title="Services" value={appointmentsToday.length} />
          <Statistic
            title="Active Services"
            value={getActiveAppointmentsLength()}
            suffix={`/ ${appointmentsToday.length}`}
          />
          <Statistic title="Total" prefix="$" value={calculateTodaysTotal()} />
          <Statistic
            title="Total Average"
            prefix="$"
            suffix="/ service"
            value={calculateTodaysAverage()}
          />
          <Statistic title="Employees" value={1} suffix="/ 1" />
        </div>
      </Card>
      <ColumnsLayout>
        <BigColumn>
          <Card
            title="Appointments"
            style={{
              borderRadius: 5,
              height: "74vh",
              maxHeight: "80vh",
              overflow: "scroll",
            }}
            // extra={[
            //   <Button
            //     key={0}
            //     onClick={() => refresh()}
            //     icon={<CloudOutlined />}
            //   >
            //     Refresh
            //   </Button>,
            // ]}
          >
            <div style={{ marginBottom: 10 }}>
              <span style={{ marginRight: 10 }}>Filter: </span>
              {sortOptions.map((item, i) => (
                <CheckableTag
                  key={i}
                  checked={sortBy === i}
                  onChange={() => setSortBy(i)}
                >
                  {item.name}
                </CheckableTag>
              ))}
            </div>
            <Divider />
            <List
              grid={{ gutter: 0, column: 1 }}
              dataSource={sortAppointments()}
              renderItem={(item) => (
                <List.Item>
                  <AppointmentCard
                    extended
                    appointment={item}
                    onClick={() => setSelectedAppointment(item)}
                  />
                </List.Item>
              )}
            />
          </Card>
        </BigColumn>
        <SmallColumn>
          <CustomSider
            selectedData={selectedAppointment}
            type="active"
          ></CustomSider>
        </SmallColumn>
      </ColumnsLayout>
    </BasicPage>
  );
}

export default OverviewPage;

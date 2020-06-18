import React, { useContext, useEffect, useState } from "react";
import BasicPage from "../common/BasicPage";
import { AuthContext } from "../../services/auth_service";
import { Card, Row, Button, Statistic } from "antd";
import ColumnsLayout from "../common/ColumnsLayout.jsx";
import BigColumn from "../common/BigColumn";
import SmallColumn from "../common/SmallColumn";
import {
  getActiveAppointments,
  getAppointments,
  getAppointmentsToday,
} from "../../services/db_service";
import AppointmentCard from "../common/AppointmentCard";
import CustomSider from "../common/CustomSider";
import Appointment from "../../models/Appointment";
import { CloudOutlined } from "@ant-design/icons";

function OverviewPage(props) {
  const { currentUser } = useContext(AuthContext);
  const [todaysTotal, setTodaysTotal] = useState(0);
  const [appointmentsToday, setAppointmentsToday] = useState([]);
  const [activeAppointments, setActiveAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    getAppointmentsToday().then((appts) => setAppointmentsToday(appts));
    getActiveAppointments().then((appts) => {
      setActiveAppointments(appts);
    });
  };

  const calculateTodaysTotal = () => {
    if (appointmentsToday.length === 1) {
      return appointmentsToday[0].total;
    } else {
      var total = appointmentsToday.reduce((acc, item) => acc + item.total, 0);
      console.log(total);
    }
    return total;
  };

  const calculateTodaysAverage = () => {
    var total = calculateTodaysTotal();
    return total / appointmentsToday.length;
  };

  return (
    <BasicPage title={`Hi, ${currentUser.displayName}`}>
      <Card style={{ marginBottom: 15, borderRadius: 5 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Statistic
            title="Active Services"
            value={activeAppointments.length}
            suffix={`/${appointmentsToday.length}`}
          />
          <Statistic title="Services" value={appointmentsToday.length} />
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
            title="Active Appointments"
            style={{
              borderRadius: 5,
              height: "74vh",
              maxHeight: "80vh",
              overflow: "scroll",
            }}
            extra={[
              <Button icon={<CloudOutlined />} shape="round">
                Refresh
              </Button>,
            ]}
          >
            <Row>
              {activeAppointments.map((item) => (
                <div style={{ marginRight: 10, width: "100%" }}>
                  <AppointmentCard
                    appointment={item}
                    onClick={() => setSelectedAppointment(item)}
                  />
                </div>
              ))}
            </Row>
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

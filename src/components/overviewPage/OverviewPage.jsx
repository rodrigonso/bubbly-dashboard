import React, { useContext, useEffect, useState } from "react";
import BasicPage from "../common/BasicPage";
import { AuthContext } from "../../services/auth_service";
import { Card, Row, Button } from "antd";
import ColumnsLayout from "../common/ColumnsLayout.jsx";
import BigColumn from "../common/BigColumn";
import SmallColumn from "../common/SmallColumn";
import { getActiveAppointments } from "../../services/db_service";
import AppointmentCard from "../common/AppointmentCard";
import CustomSider from "../common/CustomSider";
import Appointment from "../../models/Appointment";
import { CloudOutlined } from "@ant-design/icons";

function OverviewPage(props) {
  const { currentUser } = useContext(AuthContext);

  const [activeAppointments, setActiveAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    getActiveAppointments().then((appts) => {
      setActiveAppointments(appts);
    });
  };

  return (
    <BasicPage title={`Hi, ${currentUser.displayName}`}>
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

import {
  Badge,
  Button,
  Card,
  Divider,
  Statistic,
  Table,
  Tooltip,
  Typography,
} from "antd";
import React, { useState, useEffect } from "react";
import BasicPage from "../common/BasicPage";
import { GoogleApiWrapper, Map, Marker, OverlayView } from "google-maps-react";
import { EmployeeApi } from "../../api/employeeApi";
import ColumnsLayout from "../common/ColumnsLayout";
import BigColumn from "../common/BigColumn";
import SmallColumn from "../common/SmallColumn";
import { ScheduleApi } from "../../api/scheduleApi";
import { ExpandOutlined } from "@ant-design/icons";
import AppointmentCard from "../common/AppointmentCard";

function TrackPage(props) {
  const { google } = props;
  const [positions, setPositions] = useState([]);
  const [active, setActive] = useState([]);
  const [center, setCenter] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [zoom, setZoom] = useState(null);

  const DEFAULT_CENTER = { lat: 29.789628, lng: -95.575429 };

  useEffect(() => {
    let unsubscribeToActiveAppointments;
    let unsubscribeToDetailerPosition;

    // unsubscribeToActiveAppointments = ScheduleApi.listenToAppointmentsToday(
    //   setActive
    // );

    ScheduleApi.getActiveAppointments().then(setActive);

    if (active.length === 0) return;
    unsubscribeToDetailerPosition = EmployeeApi.listenToDetailersPositions(
      setPositions
    );
    return () => {
      if (active.length > 0) unsubscribeToDetailerPosition();
      unsubscribeToActiveAppointments();
    };
  }, [active.length]);

  const setDefaultCenter = () => {
    setCenter(DEFAULT_CENTER);
    setZoom(10);
  };

  const handleEmployeeClick = (employeeId) => {
    const position = positions.find((pos) => (pos.employeeId = employeeId));
    if (position) {
      setCenter(position.coords);
      setZoom(14);
    }
    const appointment = active.find((item) => item.employeeId === employeeId);
    if (appointment) {
      setSelectedAppointment(appointment);
    }
  };

  const getSelectedDetailer = (employeeId) => {
    const curr = active.find((i) => i.employeeId === employeeId);
    return curr;
  };

  return (
    <BasicPage title="Track">
      <ColumnsLayout>
        <BigColumn>
          <Card
            title="Live map"
            bodyStyle={{ padding: 0, borderRadius: 5 }}
            style={{
              borderRadius: 5,
              height: "74vh",
              maxHeight: "80vh",
              padding: 0,
              // overflow: "scroll",
            }}
            extra={[
              <Button icon={<ExpandOutlined />} onClick={setDefaultCenter}>
                Re-center
              </Button>,
            ]}
          >
            <Map
              google={google}
              zoom={zoom ?? 10}
              center={center ?? DEFAULT_CENTER}
              disableDefaultUI={true}
              style={{ borderRadius: 5 }}
            >
              {positions.map((pos) => (
                <>
                  <Marker
                    icon="https://firebasestorage.googleapis.com/v0/b/bubbly-app-6ff08.appspot.com/o/marker.png?alt=media&token=0ec4df03-9581-4fb1-ae4c-2b24b2173f9b"
                    position={pos.coords}
                    // label={
                    //   getSelectedDetailer(pos.employeeId).employee.firstName ?? ""
                    // }
                  />
                  <OverlayView>
                    <div>TEST</div>
                  </OverlayView>
                </>
              ))}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "12.5rem",
                  background:
                    "linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.25) 50%, rgba(255,255,255,0) 100%)",
                }}
              />

              {!selectedAppointment ? null : (
                <div
                  style={{
                    zIndex: 2,
                    position: "absolute",
                    bottom: 0,
                    left: "0.5rem",
                    right: "0.5rem",
                    marginBottom: "0rem",
                    marginLeft: "-0.25rem",
                  }}
                >
                  <AppointmentCard appointment={selectedAppointment} />
                </div>
              )}
            </Map>
          </Card>
        </BigColumn>
        <SmallColumn>
          <Card style={{ borderRadius: 5, height: "74vh", maxHeight: "80vh" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <Statistic
                  title="Active Appointments"
                  value={active?.length ?? 0}
                />
              </div>
              <div>
                <Divider />
              </div>
              <div>
                <Divider />
                <h4 style={{ fontWeight: "bold" }}>{"Detailers"}</h4>
                <Card
                  bodyStyle={{ padding: 0 }}
                  style={{ padding: 0, borderRadius: 5 }}
                >
                  <Table
                    style={{
                      width: "110%",
                    }}
                    dataSource={active}
                    showHeader={false}
                    bordered={false}
                    size="small"
                    columns={[
                      {
                        name: "status",
                        key: "status",
                        dataIndex: "status",
                        render: (val) => {
                          const getBadge = (val) => {
                            let status;

                            if (val === "DRIVING") status = "processing";
                            if (val === "WASHING") status = "processing";
                            if (val === "DELAYED") status = "warning";
                            if (val === "LATE") status = "error";
                            if (val === "COMPLETED") status = "default";

                            return <Badge status={status} />;
                          };

                          return (
                            <div style={{ marginLeft: "0.5rem" }}>
                              <Tooltip title={"TEST"}>{getBadge(val)}</Tooltip>
                            </div>
                          );
                        },
                      },
                      {
                        name: "name",
                        key: "name",
                        dataIndex: "employee",
                        render: (val) => (
                          <div style={{ textOverflow: "ellipsis" }}>
                            <Typography.Text>
                              {val.firstName} {val.lastName}
                            </Typography.Text>
                          </div>
                        ),
                      },

                      {
                        name: "details",
                        key: "details",
                        dataIndex: "employee",
                        render: (val) => {
                          return (
                            <>
                              <Button
                                onClick={() => handleEmployeeClick(val.id)}
                                size="small"
                                type="link"
                              >
                                Details
                              </Button>
                            </>
                          );
                        },
                      },
                    ]}
                  />
                </Card>
              </div>
            </div>
          </Card>
        </SmallColumn>
      </ColumnsLayout>
    </BasicPage>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
})(TrackPage);

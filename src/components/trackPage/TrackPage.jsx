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
// import { GoogleApiWrapper, Map, Marker, OverlayView } from "google-maps-react";
import { EmployeeApi } from "../../api/employeeApi";
import ColumnsLayout from "../common/ColumnsLayout";
import BigColumn from "../common/BigColumn";
import SmallColumn from "../common/SmallColumn";
import { ScheduleApi } from "../../api/scheduleApi";
import { ExpandOutlined } from "@ant-design/icons";
import AppointmentCard from "../common/AppointmentCard";
import GoogleMapReact from "google-map-react";
import { Link } from "react-router-dom";

function TrackPage(props) {
  const [positions, setPositions] = useState({});
  const [active, setActive] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mapController, setMapController] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const DEFAULT_CENTER = { lat: 29.789628, lng: -95.575429 };

  useEffect(() => {
    // let unsubscribeToActiveAppointments;
    // unsubscribeToActiveAppointments = ScheduleApi.listenToAppointmentsToday(
    //   setActive
    // );
    setLoading(true);
    ScheduleApi.getActiveAppointments()
      .then(setActive)
      .finally(() => setLoading(false));

    if (active.length === 0) return;
    EmployeeApi.listenToDetailersPositions(setPositions);
    return () => {};
  }, [active.length]);

  const setDefaultCenter = () => {
    mapController.panTo(DEFAULT_CENTER);
    mapController.setZoom(10);
    setSelectedAppointment(null);
  };

  const handleEmployeeClick = (employeeId) => {
    // const position = positions.find((pos) => pos.employeeId === employeeId);
    const position = positions[employeeId];
    if (position) {
      mapController.panTo({ lat: position.lat, lng: position.lng });
      mapController.setZoom(16);
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
            bodyStyle={{
              padding: 0,
              borderRadius: 5,
              width: "100%",
              height: "90%",
            }}
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
            <GoogleMapReact
              options={{
                disableDefaultUI: true,
                clickableIcons: false,
                streetView: false,
              }}
              bootstrapURLKeys={{
                key: process.env.REACT_APP_GOOGLE_MAPS_API,
              }}
              onGoogleApiLoaded={({ map, maps }) => setMapController(map)}
              defaultZoom={10}
              defaultCenter={DEFAULT_CENTER}
              style={{ borderRadius: 5 }}
            >
              {active.map((item) => {
                const pos = positions[item.employeeId];
                console.log(pos);

                // const pos = positions.find(
                //   (i) => i.employeeId === item.employeeId
                // );

                if (!pos) return <div />;

                return (
                  <div
                    key={item.id}
                    lat={pos.lat}
                    lng={pos.lng}
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      color: "#fff",
                      border: "2px solid #fff",
                      backgroundColor: "#1180ff",
                      borderRadius: "50%",
                      height: "30px",
                      width: "30px",
                      userSelect: "none",
                      boxShadow: "0px 0px 7.5px 2.5px rgba(0,0,0,0.25)",
                      textAlign: "center",
                    }}
                  >
                    <h3
                      style={{
                        marginTop: "0.25rem",
                        fontWeight: "bold",
                        color: "#fff",
                      }}
                    >
                      {getSelectedDetailer(item.employeeId)?.employee
                        .firstName[0] ?? ""}
                    </h3>
                  </div>
                );
              })}
            </GoogleMapReact>
            {!selectedAppointment ? null : (
              <Button
                onClick={setDefaultCenter}
                style={{ position: "absolute", left: "0.5rem", top: "0.5rem" }}
              >
                Re-center
              </Button>
            )}
            {!selectedAppointment ? null : (
              <div
                style={{
                  zIndex: 4,
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
          </Card>
        </BigColumn>
        <SmallColumn>
          <Card style={{ borderRadius: 5, height: "74vh", maxHeight: "80vh" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <Statistic
                  loading={loading}
                  title="Active Detailers"
                  value={active.length}
                />
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
                    loading={loading}
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
                            <Link
                              to={{
                                pathname: `employees/${val.id}`,
                                state: val,
                              }}
                            >
                              <Typography.Text className="text-link-on-hover">
                                {val.firstName} {val.lastName}
                              </Typography.Text>
                            </Link>
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

export default TrackPage;

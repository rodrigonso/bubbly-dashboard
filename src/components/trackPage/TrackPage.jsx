import { Card, Divider, Statistic, Table, Typography } from "antd";
import React, { useState, useEffect } from "react";
import BasicPage from "../common/BasicPage";
import { GoogleApiWrapper, Map, Marker, Polyline } from "google-maps-react";
import { EmployeeApi } from "../../api/employeeApi";
import ColumnsLayout from "../common/ColumnsLayout";
import BigColumn from "../common/BigColumn";
import SmallColumn from "../common/SmallColumn";

function TrackPage(props) {
  const { google } = props;
  const [positions, setPositions] = useState([]);
  const [bounds, setBounds] = useState({});

  useEffect(() => {
    const unsubscribe = EmployeeApi.listenToDetailersPositions(
      handlePositionChanges
    );
    return () => {
      unsubscribe();
    };
  }, []);

  const handlePositionChanges = (positions) => {
    setPositions(positions);
  };

  return (
    <BasicPage>
      {/* <ColumnsLayout> */}
      {/* <BigColumn> */}
      <Card
        title="Live Map"
        bodyStyle={{ padding: 0 }}
        style={{
          borderRadius: 5,
          height: "74vh",
          maxHeight: "80vh",
          overflow: "scroll",
        }}
      >
        <Map
          google={google}
          zoom={10}
          center={{ lat: 29.752214, lng: -95.365994 }}
          disableDefaultUI={true}
        >
          {positions.map((pos) => (
            <Marker position={pos.coords} lable={pos.employeeId} />
          ))}
        </Map>
      </Card>
      {/* </BigColumn>
        <SmallColumn>
          <Card style={{ borderRadius: 5, height: "74vh" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <Statistic title="Active Appointments" value={3} />
              </div>
              <div>
                <Divider />
              </div>
              <div>
                <Divider />
                <h4 style={{ fontWeight: "bold" }}>{"Detailers"}</h4>
                <Table
                  style={{ marginTop: "0.5rem" }}
                  showHeader={false}
                  bordered={true}
                  size="small"
                  columns={[
                    { name: "name", key: "name", dataIndex: "detailer" },
                  ]}
                  dataSource={[
                    { detailer: "Rodrigo" },
                    { detailer: "Gustavo" },
                    { detailer: "Eric" },
                  ]}
                />
              </div>
            </div>
          </Card>
        </SmallColumn>
      </ColumnsLayout> */}
    </BasicPage>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
})(TrackPage);

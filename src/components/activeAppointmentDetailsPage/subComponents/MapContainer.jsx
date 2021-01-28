import React, { useEffect, useState, useRef } from "react";
import { message } from "antd";
import GoogleMapReact from "google-map-react";
import { EmployeeApi } from "../../../api/employeeApi";
import { CarOutlined, HomeOutlined } from "@ant-design/icons";
function MapContainer(props) {
  const { appointment } = props;
  const [position, setPosition] = useState(null);
  const [mapController, setMapController] = useState(null);
  const [maps, setMaps] = useState(null);
  const [destination, setDestination] = useState({
    lat: appointment.address.coords.latitude,
    lng: appointment.address.coords.longitude,
  });

  useEffect(() => {
    EmployeeApi.listenToDetailerPositionById(appointment.employeeId, (pos) =>
      getRoute(pos)
    );
  }, [appointment, mapController, maps]);

  const DEFAULT_CENTER = { lat: 29.789628, lng: -95.575429 };

  const getRoute = async (pos) => {
    if (!mapController || !maps) {
      setPosition(pos);
      return;
    }
    const travelMode = maps.TravelMode.DRIVING;
    const directionsService = new maps.DirectionsService();
    const directionsDisplayer = new maps.DirectionsRenderer();

    directionsService.route(
      {
        origin: pos.coords,
        destination: destination,
        avoidTolls: false,
        travelMode: travelMode,
      },
      (result, status) => {
        if (status === "OK") {
          const route = result?.routes[0]?.overview_path ?? [];
          if (route.length === 0) throw new Error("Route is empty");
          props.onRouteBuild(route);
          directionsDisplayer.setDirections(result);
          let line = new maps.Polyline({
            path: route,
            strokeColor: "#1180ff",
            strokeWeight: 5,
          });
          line.setMap(mapController);
          calculateBounds(maps, route);
        } else {
          message.error(`Failed with status ${status}`);
        }
        console.log(status);
      }
    );
  };

  const handleGoogleMapsLoaded = async (map, maps) => {
    setMapController(map);
    setMaps(maps);
  };

  const calculateBounds = (maps, route) => {
    const bounds = new maps.LatLngBounds();
    route.forEach((item) => {
      bounds.extend({ lat: item.lat(), lng: item.lng() });
    });
    mapController.fitBounds(bounds);
  };

  return (
    <>
      <GoogleMapReact
        yesIWantToUseGoogleMapApiInternals
        options={{
          disableDefaultUI: true,
          clickableIcons: false,
        }}
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAPS_API,
        }}
        onGoogleApiLoaded={({ map, maps }) => handleGoogleMapsLoaded(map, maps)}
        defaultZoom={10}
        defaultCenter={DEFAULT_CENTER}
        style={{ borderRadius: 5 }}
      >
        {!position ? null : (
          <div
            key="detailer"
            lat={position.coords.lat}
            lng={position.coords.lng}
          >
            <div
              style={{
                userSelect: "none",
                color: "#fff",
                border: "2px solid #fff",
                backgroundColor: "#1180ff",
                borderRadius: "50%",
                height: "40px",
                width: "40px",
                boxShadow: "0px 0px 7.5px 2.5px rgba(0,0,0,0.25)",
              }}
            >
              <h3
                style={{
                  position: "absolute",
                  top: "0.55rem",
                  left: "0.625rem",
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                <CarOutlined style={{ fontSize: "1.25rem" }} />
              </h3>
            </div>
          </div>
        )}
        <div key="dest" lat={destination.lat} lng={destination.lng}>
          <div
            style={{
              userSelect: "none",
              color: "#fff",
              border: "2px solid #fff",
              backgroundColor: "#1180ff",
              borderRadius: "50%",
              height: "40px",
              width: "40px",
              boxShadow: "0px 0px 7.5px 2.5px rgba(0,0,0,0.25)",
            }}
          >
            <h3
              style={{
                position: "absolute",
                top: "0.55rem",
                left: "0.600rem",
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              <HomeOutlined style={{ fontSize: "1.25rem" }} />
            </h3>
          </div>
        </div>
      </GoogleMapReact>
    </>
  );
}

export default MapContainer;

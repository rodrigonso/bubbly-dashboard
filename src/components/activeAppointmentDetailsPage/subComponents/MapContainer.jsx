import React, { useEffect, useState } from "react";
import { Map, Marker, Polyline } from "google-maps-react";
import { message } from "antd";

function MapContainer(props) {
  const [route, setRoute] = useState([]);
  const [origin, setOrigin] = useState({});
  const [destination, setDestination] = useState({});

  useEffect(() => {
    getAppointmentDirections();
    // eslint-disable-next-line
  }, [props.appointment.employeeId]);

  const getAppointmentDirections = () => {
    const directionsService = new props.google.maps.DirectionsService();
    const travelMode = props.google.maps.TravelMode.DRIVING;
    const origin = { lat: 29.697789512596092, lng: -95.78213788936792 };
    const destination = {
      lat: props.appointment.address.coords.latitude,
      lng: props.appointment.address.coords.longitude,
    };
    setOrigin(origin);
    setDestination(destination);
    directionsService.route(
      {
        origin,
        destination,
        avoidTolls: false,
        travelMode: travelMode,
      },
      (result, status) => {
        if (status === props.google.maps.DirectionsStatus.OK) {
          setRoute(result.routes[0].overview_path);
          console.log(result);
        } else {
          message.error(`Failed with status ${status}`);
        }
        console.log(status);
      }
    );
  };

  const calculateZoom = () => {
    return 14;
  };

  return (
    <>
      <Map
        google={props.google}
        center={props.position}
        zoom={calculateZoom()}
        style={{ borderRadius: 5 }}
        disableDefaultUI={true}
      >
        <Polyline
          path={route}
          options={{
            strokeColor: "#1180ff",
            strokeOpacity: 1,
            strokeWeight: 7,
          }}
        />
        {route.length > 0 ? <Marker position={origin} /> : null}
        {route.length > 0 ? <Marker position={destination} /> : null}
        <Marker position={props.position} label="Detailer" />
      </Map>
    </>
  );
}

export default MapContainer;

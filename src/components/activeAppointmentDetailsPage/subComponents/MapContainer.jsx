import React, { useEffect, useState, useRef } from "react";
import { Map, Marker, Polyline } from "google-maps-react";
import { message } from "antd";

function MapContainer(props) {
  const { appointment, position, google } = props;
  const mapRef = useRef(null);
  const [route, setRoute] = useState([]);
  const [origin, setOrigin] = useState({});
  const [bounds, setBounds] = useState({});
  const [destination, setDestination] = useState({
    lat: appointment.address.coords.latitude,
    lng: appointment.address.coords.longitude,
  });

  useEffect(() => {
    getAppointmentDirections(position);
    // eslint-disable-next-line
  }, [position]);

  const getAppointmentDirections = (currentPosition) => {
    const directionsService = new google.maps.DirectionsService();
    const travelMode = google.maps.TravelMode.DRIVING;

    const destination = {
      lat: appointment.address.coords.latitude,
      lng: appointment.address.coords.longitude,
    };

    directionsService.route(
      {
        origin: currentPosition,
        destination,
        avoidTolls: false,
        travelMode: travelMode,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          const route = result?.routes[0]?.overview_path ?? [];

          if (route.length === 0) throw new Error("Route is empty");

          setRoute(route);
          props.onRouteBuild(route);
          calculateBounds(route);
        } else {
          message.error(`Failed with status ${status}`);
        }
        console.log(status);
      }
    );
  };

  const calculateBounds = (route) => {
    const bounds = new google.maps.LatLngBounds();
    route.forEach((item) => {
      bounds.extend({ lat: item.lat(), lng: item.lng() });
    });
    setBounds(bounds);
  };

  return (
    <>
      <Map
        ref={mapRef}
        bounds={bounds}
        google={google}
        center={position}
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
        <Marker position={position} label="Detailer" />
      </Map>
    </>
  );
}

export default MapContainer;

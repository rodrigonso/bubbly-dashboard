import React, { useEffect, useState, useRef } from "react";
import { message } from "antd";
import GoogleMapReact from "google-map-react";
import { CarOutlined, HomeOutlined } from "@ant-design/icons";

const DEFAULT_CENTER = { lat: 29.789628, lng: -95.575429 };

function MapContainer(props) {
  const {
    origin: position,
    destination,
    onMapLoad,
    onRouteBuild,
    shouldBuildRoute,
  } = props;

  // hooks
  const [origin, setOrigin] = useState(null);
  const [mapController, setMapController] = useState(null);
  const [maps, setMaps] = useState(null);

  useEffect(() => {
    setOrigin(position);
    generateRoute(position, maps, mapController);
  }, [position, mapController, maps]);

  const generateRoute = async (position, maps, controller) => {
    if (!mapController || !maps || !position) return;

    if (shouldBuildRoute === false) {
      calculateBoundsBetweenMarkers(position);
      return;
    }

    console.log("Generating route...");

    const travelMode = maps.TravelMode.DRIVING;
    const directionsService = new maps.DirectionsService();
    const directionsDisplayer = new maps.DirectionsRenderer();

    directionsService.route(
      {
        origin: position,
        destination,
        avoidTolls: false,
        travelMode: travelMode,
      },
      (result, status) => {
        if (status === "OK") {
          const route = result?.routes[0]?.overview_path ?? [];
          if (route.length === 0) throw new Error("Route is empty");

          // call route build callback
          if (onRouteBuild) onRouteBuild(route);

          // display directions
          directionsDisplayer.setDirections(result);
          let line = new maps.Polyline({
            path: route,
            strokeColor: "#1180ff",
            strokeWeight: 5,
          });
          line.setMap(controller);
          // calculateBoundsBetweenRoute(route);
          calculateBoundsBetweenMarkers(position);
        } else {
          message.error(`Failed with status ${status}`);
        }
        console.log(status);
      }
    );
  };

  const handleGoogleMapsLoaded = async (map, maps) => {
    console.log("Initializing map...");
    setMapController(map);
    setMaps(maps);

    console.log("Map initialized!");

    // call map load callback
    if (onMapLoad) onMapLoad(map, maps);
  };

  const calculateBoundsBetweenMarkers = (position) => {
    console.log("Shouldn't build route");

    if (position === null) return;

    const bounds = new maps.LatLngBounds();
    bounds.extend(position);
    bounds.extend(destination);
    mapController.fitBounds(bounds, 100);
  };

  const calculateBoundsBetweenRoute = (route) => {
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
        {!origin ? null : (
          <div
            key="detailer"
            lat={origin.lat}
            lng={origin.lng}
            style={{ position: "absolute", transform: "translate(-50%, 0)" }}
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
                  top: "0.6rem",
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
        <div
          style={{ position: "absolute", transform: "translate(-50%, 0)" }}
          key="dest"
          lat={destination.lat}
          lng={destination.lng}
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
                top: "0.6rem",
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

import MapComponent from "react-map-gl/mapbox";

import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export const Map = () => {
  return (
    <MapComponent
      mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
      initialViewState={{
        longitude: 133.5,
        latitude: -29,
        zoom: 2.8,
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
  );
};

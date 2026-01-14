import MapComponent, {
  GeolocateControl,
  type MapTouchEvent,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { useMapStyleURL } from "@services/vendor/mapbox/hooks/use-map-style-url/useMapStyleURL";
import { useMapViewState } from "@services/vendor/mapbox/hooks/use-map-view-state/useMapViewState";
import { useLongPress } from "../hooks/use-long-press/useLongPress";
import { type ComponentProps } from "react";

const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

type MapProps = {
  children?: React.ReactNode;
  id?: string;
  onLongPress?: (event: MapTouchEvent) => void;
} & ComponentProps<typeof MapComponent>;

export const Map = ({ children, id, onLongPress, ...props }: MapProps) => {
  const [viewState, setViewState] = useMapViewState(id);

  const mapStyle = useMapStyleURL(id);

  const { handleMouseDown, handleMouseUp, handleMouseMove } = useLongPress({
    onLongPress,
  });

  const defaultProps: ComponentProps<typeof MapComponent> = {
    mapboxAccessToken: MAPBOX_ACCESS_TOKEN,
    reuseMaps: true,
    style: { width: "100%", height: "100%" },
    maxPitch: 60,
    onClick: (e) => {
      console.log(e);
    },
    onTouchStart: handleMouseDown,
    onTouchEnd: handleMouseUp,
    onTouchMove: handleMouseMove,
    ...props,
  };

  return (
    <MapComponent
      {...defaultProps}
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle={mapStyle}
    >
      <GeolocateControl position="top-right" />
      {children}
    </MapComponent>
  );
};

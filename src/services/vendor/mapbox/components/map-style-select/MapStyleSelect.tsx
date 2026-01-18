import { Select } from "@ionic-input/select/Select";
import { IonSelectOption } from "@ionic/react";
import type { MapStyle } from "@services/vendor/mapbox/hooks/use-map-style-url/useMapStyleURL";
import { useMapStyle } from "@services/vendor/mapbox/hooks/use-map-style/useMapStyle";

interface MapStyleSelectProps {
  id?: string;
  children?: React.ReactNode;
}

const options: { label: string; value: MapStyle }[] = [
  {
    label: "Standard",
    value: "standard",
  },
  {
    label: "Rural",
    value: "rural",
  },
  {
    label: "Satellite",
    value: "satellite",
  },
];

export const MapStyleSelect: React.FC<MapStyleSelectProps> = ({
  id,
  children,
}) => {
  const [style, setStyle] = useMapStyle(id);

  const handleChange = (event: CustomEvent) => {
    setStyle(event.detail.value);
  };

  return (
    <Select value={style} onIonChange={handleChange} interface="popover">
      {children}
      {options.map((option) => {
        return (
          <IonSelectOption key={option.value} value={option.value}>
            {option.label}
          </IonSelectOption>
        );
      })}
    </Select>
  );
};

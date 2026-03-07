import { IonIcon } from "@ionic/react";
import editIcon from "@icons/edit.svg";
import type { Map } from "@tanstack-db/map/mapSchema";

interface MapEditButtonProps {
  map: Map;
  selectedMap: Map | null;
  show: boolean;
  onEdit: (map: Map, event: React.MouseEvent) => void;
}

export const MapEditButton: React.FC<MapEditButtonProps> = ({
  map,
  selectedMap,
  show,
  onEdit,
}) => {
  if (!show) return null;

  return (
    <IonIcon
      onClick={(e) => onEdit(map, e)}
      icon={editIcon}
      color={map.id === selectedMap?.id ? "" : "medium"}
    />
  );
};

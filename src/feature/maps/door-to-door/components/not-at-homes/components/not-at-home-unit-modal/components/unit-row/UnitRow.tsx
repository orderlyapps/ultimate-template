import {
  IonItem,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonNote,
} from "@ionic/react";
import { ItemOptionDelete } from "@ui/components/custom/input/sliding-item-option/ItemOptionDelete";
import { ItemOptionMove } from "@ui/components/custom/input/sliding-item-option/ItemOptionMove";
import { formatDistanceToNow } from "date-fns";
import type { NotAtHome } from "@feature/maps/door-to-door/sources/not-at-home/NotAtHome";

export const UnitRow = ({
  unit,
  onMove,
  onDelete,
}: {
  unit: NotAtHome;
  onMove: () => void;
  onDelete: () => void;
}) => {
  const created = unit.created_at
    ? formatDistanceToNow(new Date(unit.created_at), { addSuffix: true })
    : "Unknown";

  return (
    <IonItemSliding>
      <IonItem className="ion-margin">
        <IonLabel>Unit {unit.unit_number || "N/A"}</IonLabel>
        <IonNote slot="end">Added {created}</IonNote>
      </IonItem>
      <IonItemOptions side="end">
        <ItemOptionMove onClick={onMove} />
        <ItemOptionDelete onClick={onDelete} />
      </IonItemOptions>
    </IonItemSliding>
  );
};

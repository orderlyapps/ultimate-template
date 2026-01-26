import { IonListHeader } from "@ionic/react";
import { List } from "@ionic-layout/list/List";
import type { NotAtHome } from "@feature/maps/door-to-door/sources/not-at-home/NotAtHome";
import { UnitRow } from "../unit-row/UnitRow";
import { Space } from "@layout/space/Space";

export const UnitList = ({
  title,
  units,
  onMove,
  onDelete,
}: {
  title: string;
  units: NotAtHome[];
  onMove: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  if (units.length === 0) return null;

  return (
    <List>
      <IonListHeader>{title}</IonListHeader>
      {units.map((unit) => (
        <UnitRow
          key={unit.id}
          unit={unit}
          onMove={() => onMove(unit.id)}
          onDelete={() => onDelete(unit.id)}
        />
      ))}
      <Space height="3" />
    </List>
  );
};

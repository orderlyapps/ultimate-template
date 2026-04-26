import { IonLabel } from "@ionic/react";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import { SectionHeading } from "@display/section-heading/SectionHeading";
import { builtInPresets } from "../../publisherFilterState";
import {
  useFeatureAccess,
  TEMP_ALL_AUTHORIZED_NAMES,
} from "@services/app/auth/temp-feature-access/useFeatureAccess";
import type { PublisherFilterState } from "../../publisherFilterState";

export function BuiltInPresetsList({
  onSelect,
}: {
  onSelect: (filters: PublisherFilterState, name: string) => void;
}) {
  const { isUnlocked } = useFeatureAccess(TEMP_ALL_AUTHORIZED_NAMES);

  const presets = isUnlocked
    ? builtInPresets
    : builtInPresets.filter(
        (p) =>
          p.id === "regular_pioneers" ||
          p.id === "ministerial_servants" ||
          p.id === "elders",
      );

  return (
    <List>
      <Item>
        <IonLabel>
          <SectionHeading>Presets</SectionHeading>
        </IonLabel>
      </Item>
      {presets.map((preset) => (
        <Item
          key={preset.id}
          button
          onClick={() => onSelect(preset.filters, preset.name)}
        >
          <IonLabel>
            <Text>{preset.name}</Text>
          </IonLabel>
        </Item>
      ))}
    </List>
  );
}

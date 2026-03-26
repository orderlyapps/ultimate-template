import { IonAccordion, IonAccordionGroup } from "@ionic/react";
import { usePublisherSortFilterStore } from "../../../../store/usePublisherSortFilterStore";
import { DEFAULT_PRESETS } from "../../../../store/publisher-sort-filter.types";
import { PresetItem } from "./components/preset-item/PresetItem";
import { ItemAccordionHeader } from "@ionic-layout/accordion-header/AccordionHeader";
import { List } from "@ionic-layout/list/List";
import { Label } from "@ionic-display/label/Label";
import { Text } from "@ionic-display/text/Text";
import { useSortFilterAccordionsStore } from "@/content/schedules/weekend-meeting/edit/assignment/store/useSortFilterAccordionsStore";
import { Space } from "@layout/space/Space";

export const PresetList: React.FC = () => {
  const customPresets = usePublisherSortFilterStore((s) => s.customPresets);
  const presetsAccordionOpen = useSortFilterAccordionsStore(
    (s) => s.presetsAccordionOpen,
  );
  const setPresetsAccordionOpen = useSortFilterAccordionsStore(
    (s) => s.setPresetsAccordionOpen,
  );
  const presets = [...DEFAULT_PRESETS, ...customPresets];

  const configByAssignment = usePublisherSortFilterStore(
    (s) => s.configByAssignment,
  );
  const currentAssignmentId = usePublisherSortFilterStore(
    (s) => s.currentAssignmentId,
  );
  const activePresetId = currentAssignmentId
    ? (configByAssignment[currentAssignmentId]?.presetId ?? null)
    : null;

  return (
    <IonAccordionGroup
      value={presetsAccordionOpen ? "presets" : undefined}
      onIonChange={(e) => setPresetsAccordionOpen(e.detail.value === "presets")}
    >
      <IonAccordion value="presets">
        <ItemAccordionHeader lines={presetsAccordionOpen ? "none" : undefined}>
          <Label>Preset</Label>
          <Text
            className="ion-padding-end"
            color={
              presets.find(({ id }) => {
                return id === activePresetId;
              })?.name
                ? undefined
                : "medium"
            }
          >
            {presets.find(({ id }) => {
              return id === activePresetId;
            })?.name || "select"}
          </Text>
        </ItemAccordionHeader>
        <List slot="content" inset>
          {presets.map((preset) => (
            <PresetItem key={preset.id} preset={preset} />
          ))}
          <Space height="2" />
        </List>
      </IonAccordion>
    </IonAccordionGroup>
  );
};

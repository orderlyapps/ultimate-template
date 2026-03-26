import { IonButton, IonIcon, IonInput, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import { Item } from "@ionic-layout/item/Item";
import deleteIcon from "@icons/delete.svg";
import { usePublisherSortFilterStore } from "../../../../../../../../store/usePublisherSortFilterStore";
import {
  DEFAULT_CONFIG,
  FILTERABLE_STATS,
  STAT_LABELS,
  type FilterConfig,
} from "../../../../../../../../store/publisher-sort-filter.types";

type Props = {
  filter: FilterConfig;
  index: number;
};

export const FilterItem: React.FC<Props> = ({ filter, index }) => {
  const configByAssignment = usePublisherSortFilterStore((s) => s.configByAssignment);
  const currentAssignmentId = usePublisherSortFilterStore((s) => s.currentAssignmentId);
  const setActiveConfig = usePublisherSortFilterStore((s) => s.setActiveConfig);
  const activeConfig = currentAssignmentId
    ? configByAssignment[currentAssignmentId]?.config ?? DEFAULT_CONFIG
    : DEFAULT_CONFIG;

  const handleStatChange = (stat: FilterConfig["stat"]) => {
    const newFilters = [...activeConfig.filters];
    newFilters[index] = { ...filter, stat };
    setActiveConfig({ ...activeConfig, filters: newFilters });
  };

  const handleMinWeeksChange = (value: number) => {
    const newFilters = [...activeConfig.filters];
    newFilters[index] = { ...filter, minWeeks: value };
    setActiveConfig({ ...activeConfig, filters: newFilters });
  };

  const handleDelete = () => {
    const newFilters = activeConfig.filters.filter((_, i) => i !== index);
    setActiveConfig({ ...activeConfig, filters: newFilters });
  };

  return (
    <Item>
      <IonSelect
        value={filter.stat}
        onIonChange={(e) => handleStatChange(e.detail.value)}
        interface="popover"
        style={{ maxWidth: "50%" }}
      >
        {FILTERABLE_STATS.map((key) => (
          <IonSelectOption key={key} value={key}>
            {STAT_LABELS[key]}
          </IonSelectOption>
        ))}
      </IonSelect>
      <IonLabel style={{ margin: "0 8px" }}>≥</IonLabel>
      <IonInput
        type="number"
        value={filter.minWeeks}
        onIonInput={(e) => handleMinWeeksChange(Number(e.detail.value) || 0)}
        style={{ maxWidth: "60px" }}
      />
      <IonButton fill="clear" color="danger" onClick={handleDelete}>
        <IonIcon src={deleteIcon} slot="icon-only" />
      </IonButton>
    </Item>
  );
};

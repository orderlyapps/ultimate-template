import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
  IonListHeader,
  IonLabel,
} from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { CloseButton } from "@input/button/close-button/CloseButton";
import { List } from "@ionic-layout/list/List";
import { Item } from "@ionic-layout/item/Item";
import { Checkbox } from "@ionic-input/checkbox/Checkbox";
import { SelectItem } from "@input/select/SelectItem";
import { standingOptions } from "@tanstack-db/publisher/standingSchema";
import { typeOptions } from "@tanstack-db/publisher/typeSchema";
import { genderOptions } from "@tanstack-db/publisher/genderSchema";
import { groupCollection } from "@tanstack-db/group/groupCollection";
import { defaultFilters } from "../../publisherFilterState";
import type { PublisherFilterState } from "../../publisherFilterState";
import type { PublisherStanding } from "@tanstack-db/publisher/standingSchema";
import type { PublisherType } from "@tanstack-db/publisher/typeSchema";
import type { PublisherGender } from "@tanstack-db/publisher/genderSchema";

interface PublisherFilterModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  filters: PublisherFilterState;
  onFiltersChange: (filters: PublisherFilterState) => void;
}

const filterPresets = [
  { value: "all_speakers", label: "All Speakers" },
  { value: "local_speakers", label: "Local Speakers" },
  { value: "all_females", label: "All Females" },
] as const;

type FilterPreset = (typeof filterPresets)[number]["value"];

export function PublisherFilterModal({
  isOpen,
  onDismiss,
  filters,
  onFiltersChange,
}: PublisherFilterModalProps) {
  const { data: groups } = useLiveQuery((q) =>
    q.from({ g: groupCollection }).orderBy(({ g }) => g.name)
  );

  const allStandingValues = standingOptions.map((opt) => opt.value);
  const allTypeValues = typeOptions.map((opt) => opt.id);
  const allGenderValues = genderOptions.map((opt) => opt.id);
  const allGroupValues = groups?.map((g) => g.id) ?? [];

  const toggleStanding = (value: PublisherStanding) => {
    const newStanding = filters.standing.includes(value)
      ? filters.standing.filter((v) => v !== value)
      : [...filters.standing, value];
    onFiltersChange({ ...filters, standing: newStanding });
  };

  const toggleType = (value: PublisherType) => {
    const newType = filters.type.includes(value)
      ? filters.type.filter((v) => v !== value)
      : [...filters.type, value];
    onFiltersChange({ ...filters, type: newType });
  };

  const toggleGender = (value: PublisherGender) => {
    const newGender = filters.gender.includes(value)
      ? filters.gender.filter((v) => v !== value)
      : [...filters.gender, value];
    onFiltersChange({ ...filters, gender: newGender });
  };

  const toggleGroup = (groupId: string) => {
    const newGroup = filters.group.includes(groupId)
      ? filters.group.filter((v) => v !== groupId)
      : [...filters.group, groupId];
    onFiltersChange({ ...filters, group: newGroup });
  };

  const applyPreset = (preset: FilterPreset) => {
    switch (preset) {
      case "all_speakers":
        onFiltersChange({
          ...defaultFilters,
          type: ["speaker"],
        });
        break;
      case "local_speakers":
        onFiltersChange({
          ...defaultFilters,
          type: ["speaker"],
          gender: ["male"],
        });
        break;
      case "all_females":
        onFiltersChange({
          ...defaultFilters,
          gender: ["female"],
        });
        break;
    }
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Filter Publishers</IonTitle>
          <IonButtons slot="end">
            <CloseButton onClick={onDismiss} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <List>
          <IonListHeader>
            <IonLabel>Presets</IonLabel>
          </IonListHeader>
          <SelectItem
            label="Apply Preset"
            value=""
            options={[...filterPresets]}
            onIonChange={(e) => {
              if (e.detail.value) {
                applyPreset(e.detail.value as FilterPreset);
              }
            }}
          />
        </List>
        <List>
          <IonListHeader>
            <IonLabel>Standing</IonLabel>
            <IonButtons>
              <IonButton
                size="small"
                onClick={() => onFiltersChange({ ...filters, standing: allStandingValues })}
              >
                All
              </IonButton>
              <IonButton
                size="small"
                onClick={() => onFiltersChange({ ...filters, standing: [] })}
              >
                None
              </IonButton>
            </IonButtons>
          </IonListHeader>
          {standingOptions.map((opt) => (
            <Item key={opt.value}>
              <Checkbox
                checked={filters.standing.includes(opt.value)}
                onIonChange={() => toggleStanding(opt.value)}
              >
                {opt.label}
              </Checkbox>
            </Item>
          ))}
        </List>
        <List>
          <IonListHeader>
            <IonLabel>Type</IonLabel>
            <IonButtons>
              <IonButton
                size="small"
                onClick={() => onFiltersChange({ ...filters, type: allTypeValues })}
              >
                All
              </IonButton>
              <IonButton
                size="small"
                onClick={() => onFiltersChange({ ...filters, type: [] })}
              >
                None
              </IonButton>
            </IonButtons>
          </IonListHeader>
          {typeOptions.map((opt) => (
            <Item key={opt.id}>
              <Checkbox
                checked={filters.type.includes(opt.id)}
                onIonChange={() => toggleType(opt.id)}
              >
                {opt.label}
              </Checkbox>
            </Item>
          ))}
        </List>
        <List>
          <IonListHeader>
            <IonLabel>Gender</IonLabel>
            <IonButtons>
              <IonButton
                size="small"
                onClick={() => onFiltersChange({ ...filters, gender: allGenderValues })}
              >
                All
              </IonButton>
              <IonButton
                size="small"
                onClick={() => onFiltersChange({ ...filters, gender: [] })}
              >
                None
              </IonButton>
            </IonButtons>
          </IonListHeader>
          {genderOptions.map((opt) => (
            <Item key={opt.id}>
              <Checkbox
                checked={filters.gender.includes(opt.id)}
                onIonChange={() => toggleGender(opt.id)}
              >
                {opt.label}
              </Checkbox>
            </Item>
          ))}
        </List>
        {groups && groups.length > 0 && (
          <List>
            <IonListHeader>
              <IonLabel>Group</IonLabel>
              <IonButtons>
                <IonButton
                  size="small"
                  onClick={() => onFiltersChange({ ...filters, group: allGroupValues })}
                >
                  All
                </IonButton>
                <IonButton
                  size="small"
                  onClick={() => onFiltersChange({ ...filters, group: [] })}
                >
                  None
                </IonButton>
              </IonButtons>
            </IonListHeader>
            {groups.map((group) => (
              <Item key={group.id}>
                <Checkbox
                  checked={filters.group.includes(group.id)}
                  onIonChange={() => toggleGroup(group.id)}
                >
                  {group.name}
                </Checkbox>
              </Item>
            ))}
          </List>
        )}
      </IonContent>
    </IonModal>
  );
}

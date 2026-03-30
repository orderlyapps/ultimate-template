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
import { useState } from "react";
import { useLiveQuery } from "@tanstack/react-db";
import { CloseButton } from "@input/button/close-button/CloseButton";
import { List } from "@ionic-layout/list/List";
import { Item } from "@ionic-layout/item/Item";
import { Checkbox } from "@ionic-input/checkbox/Checkbox";
import { SavePresetAlert } from "../../../../../../../feature/db/publisher/all-publishers-list/components/save-preset-alert/SavePresetAlert";
import { standingOptions } from "@tanstack-db/publisher/standingSchema";
import { typeOptions } from "@tanstack-db/publisher/typeSchema";
import { genderOptions } from "@tanstack-db/publisher/genderSchema";
import { groupCollection } from "@tanstack-db/group/groupCollection";
import type { PublisherFilterState } from "../preset-selection-modal/publisherFilterState";
import type { PublisherStanding } from "@tanstack-db/publisher/standingSchema";
import type { PublisherType } from "@tanstack-db/publisher/typeSchema";
import type { PublisherGender } from "@tanstack-db/publisher/genderSchema";

interface PublisherFilterModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  filters: PublisherFilterState;
  onFiltersChange: (filters: PublisherFilterState) => void;
  onSavePreset: (name: string, filters: PublisherFilterState) => void;
}

export function PublisherFilterModal({
  isOpen,
  onDismiss,
  filters,
  onFiltersChange,
  onSavePreset,
}: PublisherFilterModalProps) {
  const [isSaveAlertOpen, setIsSaveAlertOpen] = useState(false);
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
        <List>
          <Item>
            <IonButton
              expand="full"
              fill="clear"
              onClick={() => setIsSaveAlertOpen(true)}
            >
              Save Current Filters as Preset
            </IonButton>
          </Item>
        </List>
        <SavePresetAlert
          isOpen={isSaveAlertOpen}
          onDismiss={() => setIsSaveAlertOpen(false)}
          onSave={(name) => onSavePreset(name, filters)}
        />
      </IonContent>
    </IonModal>
  );
}

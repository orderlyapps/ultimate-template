import { useState } from "react";
import { Text } from "@ionic-display/text/Text";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Input } from "@ionic-input/input/Input";
import { IonAlert, IonIcon, IonListHeader, IonSelectOption } from "@ionic/react";
import { Label } from "@ionic-display/label/Label";
import { Select } from "@ionic-input/select/Select";
import { addOutline } from "ionicons/icons";
import { congregationCollection } from "@tanstack-db/congregation/congregationCollection";

type Congregation = {
  id: string;
  name: string;
};

type SpeakerNameFormProps = {
  firstName: string;
  lastName: string;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  congregationId: string;
  setCongregationId: (value: string) => void;
  congregationName: string;
  congregations: Congregation[];
  isLocal: boolean;
};

export const SpeakerNameForm: React.FC<SpeakerNameFormProps> = ({
  firstName,
  lastName,
  setFirstName,
  setLastName,
  congregationId,
  setCongregationId,
  congregationName,
  congregations,
  isLocal,
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertKey, setAlertKey] = useState(0);

  const userCongregationId = localStorage.getItem("congregationId");

  const handleCreateCongregation = (name: string) => {
    if (!name || !userCongregationId) return false;

    const newId = crypto.randomUUID();
    congregationCollection.insert({
      id: newId,
      congregation_id: userCongregationId,
      name,
    });
    setCongregationId(newId);
  };

  return (
    <>
      <List inset>
        <IonListHeader>
          <Label color="medium">Congregation</Label>
        </IonListHeader>
        {isLocal ? (
          <Item>
            <Text>{congregationName}</Text>
          </Item>
        ) : (
          <>
            <Item>
              <Select
                label="Congregation"
                labelPlacement="stacked"
                value={congregationId}
                onIonChange={(e) => setCongregationId(e.detail.value)}
              >
                {congregations.map((c) => (
                  <IonSelectOption key={c.id} value={c.id}>
                    {c.name}
                  </IonSelectOption>
                ))}
              </Select>
            </Item>
            <Item
              onClick={() => {
                setAlertKey((k) => k + 1);
                setShowAlert(true);
              }}
            >
              <IonIcon icon={addOutline} slot="start" color="primary" />
              <Text color="primary">Add New Congregation</Text>
            </Item>
          </>
        )}
      </List>

      <IonAlert
        key={alertKey}
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header="New Congregation"
        inputs={[
          {
            name: "name",
            type: "text",
            placeholder: "Congregation name",
          },
        ]}
        buttons={[
          { text: "Cancel", role: "cancel" },
          {
            text: "Add",
            handler: (data) => {
              const name =
                typeof data?.name === "string" ? data.name.trim() : "";
              if (!name) return false;
              handleCreateCongregation(name);
            },
          },
        ]}
      />

      <List inset>
        <IonListHeader>
          <Label color="medium">Speaker Details</Label>
        </IonListHeader>
        <Item>
          <Input
            label="First Name"
            labelPlacement="stacked"
            value={firstName}
            onIonInput={(e) => setFirstName(e.detail.value ?? "")}
          />
        </Item>
        <Item>
          <Input
            label="Last Name"
            labelPlacement="stacked"
            value={lastName}
            onIonInput={(e) => setLastName(e.detail.value ?? "")}
          />
        </Item>
      </List>
    </>
  );
};

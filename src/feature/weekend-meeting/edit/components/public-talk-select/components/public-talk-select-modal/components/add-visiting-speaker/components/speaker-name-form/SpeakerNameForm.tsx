import { useRef, useState } from "react";
import { List } from "@ionic-layout/list/List";
import { IonAlert } from "@ionic/react";
import { congregationCollection } from "@tanstack-db/congregation/congregationCollection";
import { TextInput } from "@input/text/TextInput";
import { SelectItem } from "@input/select/SelectItem";
import { Space } from "@layout/space/Space";

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
  congregations: Congregation[];
};

export const SpeakerNameForm: React.FC<SpeakerNameFormProps> = ({
  firstName,
  lastName,
  setFirstName,
  setLastName,
  congregationId,
  setCongregationId,
  congregations,
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertKey, setAlertKey] = useState(0);
  const [selectKey, setSelectKey] = useState(0);
  const previousCongregationId = useRef(congregationId);

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
      <List>
        <Space height="2" />
        <SelectItem
          key={selectKey}
          label="Congregation"
          value={congregationId}
          onIonChange={(e) => {
            if (e.detail.value === "__new__") {
              previousCongregationId.current = congregationId;
              setAlertKey((k) => k + 1);
              setShowAlert(true);
              return;
            }
            setCongregationId(e.detail.value);
          }}
          options={[
            { value: "__new__", label: "- ADD NEW -" },
            ...congregations
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((c) => ({
                value: c.id,
                label: c.name,
              })),
          ]}
        />
      </List>

      <IonAlert
        key={alertKey}
        isOpen={showAlert}
        onDidDismiss={(e) => {
          if (
            e.detail.role === "cancel" ||
            !e.detail.data?.values?.name?.trim()
          ) {
            setCongregationId(previousCongregationId.current);
            setSelectKey((k) => k + 1);
          }
          setShowAlert(false);
        }}
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

      <List>
        <TextInput
          label="First Name"
          value={firstName}
          onIonInput={(e) => setFirstName(e.detail.value ?? "")}
        />
        <TextInput
          label="Last Name"
          value={lastName}
          onIonInput={(e) => setLastName(e.detail.value ?? "")}
        />
      </List>
    </>
  );
};

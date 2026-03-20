import { useState } from "react";
import { Text } from "@ionic-display/text/Text";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Searchbar } from "@ionic-input/searchbar/Searchbar";
import { Button } from "@ionic-input/button/Button";
import { IonAlert, IonListHeader, IonIcon } from "@ionic/react";
import { Label } from "@ionic-display/label/Label";
import { addOutline, checkmarkSharp } from "ionicons/icons";
import { useLiveQuery } from "@tanstack/react-db";
import { congregationCollection } from "@tanstack-db/congregation/congregationCollection";
import { useAddVisitingSpeakerStore } from "../../store/useAddVisitingSpeakerStore";

export const CongregationStep: React.FC = () => {
  const userCongregationId = localStorage.getItem("congregationId");
  const selectedId = useAddVisitingSpeakerStore((s) => s.congregationId);
  const setCongregation = useAddVisitingSpeakerStore((s) => s.setCongregation);
  const goNext = useAddVisitingSpeakerStore((s) => s.goNext);

  const [searchQuery, setSearchQuery] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertKey, setAlertKey] = useState(0);

  const { data: congregations = [] } = useLiveQuery((q) =>
    q.from({ c: congregationCollection }).select(({ c }) => ({
      id: c.id,
      congregationId: c.congregation_id,
      name: c.name,
    })),
  );

  const visitingCongregations = congregations.filter(
    (c) => c.congregationId === userCongregationId,
  );

  const filtered = visitingCongregations
    .filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleCreateNew = (name: string) => {
    if (!name || !userCongregationId) return false;

    const newId = crypto.randomUUID();
    congregationCollection.insert({
      id: newId,
      congregation_id: userCongregationId,
      name,
    });
    setCongregation(newId, name);
  };

  return (
    <>
      <Searchbar
        value={searchQuery}
        onIonInput={(e) => setSearchQuery(e.detail.value ?? "")}
        placeholder="Search congregations..."
        debounce={300}
      />

      <List inset>
        <IonListHeader>
          <Label color="medium">Congregations</Label>
        </IonListHeader>
        <Item
          onClick={() => {
            setAlertKey((k) => k + 1);
            setShowAlert(true);
          }}
        >
          <IonIcon icon={addOutline} slot="start" />
          <Text bold>Create New Congregation</Text>
        </Item>
        {filtered.map((c) => (
          <Item
            key={c.id}
            onClick={() => setCongregation(c.id, c.name)}
            color={selectedId === c.id ? "medium" : undefined}
          >
            <Text>{c.name}</Text>
            {selectedId === c.id && (
              <IonIcon icon={checkmarkSharp} slot="end" color="primary" />
            )}
          </Item>
        ))}
      </List>

      <Button onClick={goNext} disabled={!selectedId}>
        Next
      </Button>

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
              handleCreateNew(name);
            },
          },
        ]}
      />
    </>
  );
};

import { Text } from "@ionic-display/text/Text";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Input } from "@ionic-input/input/Input";
import { Button } from "@ionic-input/button/Button";
import { IonListHeader } from "@ionic/react";
import { Label } from "@ionic-display/label/Label";
import { useAddVisitingSpeakerStore } from "../../store/useAddVisitingSpeakerStore";

export const DetailsStep: React.FC = () => {
  const firstName = useAddVisitingSpeakerStore((s) => s.firstName);
  const lastName = useAddVisitingSpeakerStore((s) => s.lastName);
  const congregationName = useAddVisitingSpeakerStore((s) => s.congregationName);
  const setFirstName = useAddVisitingSpeakerStore((s) => s.setFirstName);
  const setLastName = useAddVisitingSpeakerStore((s) => s.setLastName);
  const createSpeaker = useAddVisitingSpeakerStore((s) => s.createSpeaker);
  const goBack = useAddVisitingSpeakerStore((s) => s.goBack);

  const canProceed = firstName.trim().length > 0 && lastName.trim().length > 0;

  return (
    <>
      <List inset>
        <IonListHeader>
          <Label color="medium">Congregation</Label>
        </IonListHeader>
        <Item>
          <Text>{congregationName}</Text>
        </Item>
      </List>

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
            autofocus
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

      <Button onClick={createSpeaker} disabled={!canProceed}>
        Save & Add Outlines
      </Button>
      <Button onClick={goBack} fill="clear">
        Back
      </Button>
    </>
  );
};

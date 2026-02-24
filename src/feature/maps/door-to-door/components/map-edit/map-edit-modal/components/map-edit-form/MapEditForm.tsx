import { IonAlert } from "@ionic/react";
import { Button } from "@ionic-input/button/Button";
import { TextInput } from "@input/text/TextInput";
import { Textarea } from "@ionic-input/textarea/Textarea";
import { List } from "@ionic-layout/list/List";
import { Item } from "@ionic-layout/item/Item";
import { Label } from "@ionic-display/label/Label";
import { mapCollection } from "@tanstack-db/map/mapCollection";
import type { Map } from "@tanstack-db/map/mapSchema";
import { useState, useMemo } from "react";

export const MapEditForm: React.FC<{
  editingMap: Map;
  closeMapEditModal: () => void;
  setEditMode: (value: boolean) => void;
  setEditingMap: (value: Map | null) => void;
}> = ({ editingMap, closeMapEditModal, setEditMode, setEditingMap }) => {
  const [name, setName] = useState(editingMap?.name ?? "");
  const [details, setDetails] = useState(editingMap?.details ?? "");
  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const [showUnsavedAlert, setShowUnsavedAlert] = useState(false);

  const hasUnsavedChanges = useMemo(() => {
    if (!editingMap) return false;
    return name !== editingMap.name || (details || null) !== editingMap.details;
  }, [name, details, editingMap]);

  const handleFinished = () => {
    if (hasUnsavedChanges) {
      setShowUnsavedAlert(true);
    } else {
      handleConfirmFinished();
    }
  };

  const handleConfirmFinished = () => {
    setShowUnsavedAlert(false);
    closeMapEditModal();
    setEditMode(false);
    setEditingMap(null);
  };

  const handleSave = () => {
    setShowSaveAlert(true);
  };

  const handleConfirmSave = async () => {
    if (!editingMap) return;

    await mapCollection.update(editingMap.id, (draft) => {
      draft.name = name;
      draft.details = details || null;
    });

    setShowSaveAlert(false);
    closeMapEditModal();
    setEditMode(false);
    setEditingMap(null);
  };

  return (
    <>
      <List inset>
        <TextInput
          label="Name"
          value={name}
          onIonInput={(e) => setName(e.detail.value ?? "")}
        />
        <Item>
          <Textarea
            label="Details"
            value={details}
            onIonInput={(e) => setDetails(e.detail.value ?? "")}
          >
            <Label slot="label">Details</Label>
          </Textarea>
        </Item>
      </List>
      <Button onClick={handleSave}>Save</Button>
      <Button onClick={handleFinished}>Finished</Button>
      <IonAlert
        isOpen={showSaveAlert}
        onDidDismiss={() => setShowSaveAlert(false)}
        header="Save Changes"
        message="Are you sure you want to save these changes?"
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
          },
          {
            text: "Save",
            handler: handleConfirmSave,
          },
        ]}
      />
      <IonAlert
        isOpen={showUnsavedAlert}
        onDidDismiss={() => setShowUnsavedAlert(false)}
        header="Unsaved Changes"
        message="You have unsaved changes. Are you sure you want to exit without saving?"
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
          },
          {
            text: "Exit Without Saving",
            handler: handleConfirmFinished,
          },
        ]}
      />
    </>
  );
};

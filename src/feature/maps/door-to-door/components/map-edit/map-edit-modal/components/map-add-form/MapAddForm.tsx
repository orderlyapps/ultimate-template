import { Button } from "@ionic-input/button/Button";
import { TextInput } from "@input/text/TextInput";
import { Textarea } from "@ionic-input/textarea/Textarea";
import { List } from "@ionic-layout/list/List";
import { Item } from "@ionic-layout/item/Item";
import { Label } from "@ionic-display/label/Label";
import { mapCollection } from "@tanstack-db/map/mapCollection";
import type { Map } from "@tanstack-db/map/mapSchema";
import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import { useState } from "react";

import { MapAddBlockList } from "@feature/maps/door-to-door/components/map-edit/map-edit-modal/components/map-add-form/components/map-add-block-list/MapAddBlockList";
import { MapAddAlerts } from "@feature/maps/door-to-door/components/map-edit/map-edit-modal/components/map-add-form/components/map-add-alerts/MapAddAlerts";

export const MapAddForm: React.FC<{ newMap: Map }> = ({ newMap }) => {
  const closeMapEditModal = useDoorToDoorStore((state) => state.closeMapEditModal);
  const setEditMode = useDoorToDoorStore((state) => state.setEditMode);
  const setEditingMap = useDoorToDoorStore((state) => state.setEditingMap);
  const stopAddingNewMap = useDoorToDoorStore((state) => state.stopAddingNewMap);
  const setIsDrawMode = useDoorToDoorStore((state) => state.setIsDrawMode);
  const setIsEditingBoundary = useDoorToDoorStore((state) => state.setIsEditingBoundary);
  const editedBoundary = useDoorToDoorStore((state) => state.editedBoundary);
  const setEditedBoundary = useDoorToDoorStore((state) => state.setEditedBoundary);
  const editedBlocks = useDoorToDoorStore((state) => state.editedBlocks);
  const setEditedBlocks = useDoorToDoorStore((state) => state.setEditedBlocks);
  const setEditingBlockId = useDoorToDoorStore((state) => state.setEditingBlockId);
  const setSelectedMap = useDoorToDoorStore((state) => state.setSelectedMap);
  const name = useDoorToDoorStore((state) => state.newMapName);
  const setName = useDoorToDoorStore((state) => state.setNewMapName);
  const details = useDoorToDoorStore((state) => state.newMapDetails);
  const setDetails = useDoorToDoorStore((state) => state.setNewMapDetails);

  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const [showCancelAlert, setShowCancelAlert] = useState(false);

  const handleCancel = () => {
    if (name || details || editedBoundary || editedBlocks) {
      setShowCancelAlert(true);
    } else {
      handleConfirmCancel();
    }
  };

  const handleConfirmCancel = () => {
    setShowCancelAlert(false);
    resetState();
  };

  const resetState = () => {
    closeMapEditModal();
    setEditMode(false);
    setEditingMap(null);
    stopAddingNewMap();
    setEditedBoundary(null);
    setEditedBlocks(null);
    setEditingBlockId(null);
    setIsEditingBoundary(false);
    setIsDrawMode(false);
  };

  const handleEditBoundary = () => {
    setIsDrawMode(true);
    setIsEditingBoundary(true);
    if (editedBoundary) {
      setEditedBoundary(editedBoundary);
    }
    closeMapEditModal();
  };

  const handleSave = () => {
    if (!name.trim()) return;
    setShowSaveAlert(true);
  };

  const handleConfirmSave = async () => {
    if (!name.trim()) return;

    const mapToInsert: Map = {
      ...newMap,
      name: name.trim(),
      details: details.trim() || null,
      boundary: editedBoundary ?? null,
      blocks: editedBlocks ?? null,
    };

    const tx = mapCollection.insert(mapToInsert);
    await tx.isPersisted.promise;

    setSelectedMap(mapToInsert);
    setShowSaveAlert(false);
    resetState();
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
      <Button onClick={handleEditBoundary}>
        {editedBoundary ? "Edit Boundary" : "Draw Boundary"}
      </Button>
      <MapAddBlockList
        editedBlocks={editedBlocks}
        setEditedBlocks={setEditedBlocks}
        setEditingBlockId={setEditingBlockId}
        setIsDrawMode={setIsDrawMode}
        closeMapEditModal={closeMapEditModal}
      />
      <Button onClick={handleSave} disabled={!name.trim()}>
        Save
      </Button>
      <Button onClick={handleCancel}>Cancel</Button>
      <MapAddAlerts
        showSaveAlert={showSaveAlert}
        setShowSaveAlert={setShowSaveAlert}
        handleConfirmSave={handleConfirmSave}
        showCancelAlert={showCancelAlert}
        setShowCancelAlert={setShowCancelAlert}
        handleConfirmCancel={handleConfirmCancel}
      />
    </>
  );
};

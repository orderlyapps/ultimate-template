import { IonAlert } from "@ionic/react";
import { Button } from "@ionic-input/button/Button";
import { TextInput } from "@input/text/TextInput";
import { Textarea } from "@ionic-input/textarea/Textarea";
import { List } from "@ionic-layout/list/List";
import { Item } from "@ionic-layout/item/Item";
import { Label } from "@ionic-display/label/Label";
import { mapCollection } from "@tanstack-db/map/mapCollection";
import type { Map } from "@tanstack-db/map/mapSchema";
import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import { useState, useMemo } from "react";

export const MapEditForm: React.FC<{
  editingMap: Map;
  closeMapEditModal: () => void;
  setEditMode: (value: boolean) => void;
  setEditingMap: (value: Map | null) => void;
}> = ({ editingMap, closeMapEditModal, setEditMode, setEditingMap }) => {
  const setIsDrawMode = useDoorToDoorStore((state) => state.setIsDrawMode);
  const setIsEditingBoundary = useDoorToDoorStore((state) => state.setIsEditingBoundary);
  const editedBoundary = useDoorToDoorStore((state) => state.editedBoundary);
  const setEditedBoundary = useDoorToDoorStore((state) => state.setEditedBoundary);
  const editedBlocks = useDoorToDoorStore((state) => state.editedBlocks);
  const setEditedBlocks = useDoorToDoorStore((state) => state.setEditedBlocks);
  const setEditingBlockId = useDoorToDoorStore((state) => state.setEditingBlockId);
  const setSelectedMap = useDoorToDoorStore((state) => state.setSelectedMap);
  const [name, setName] = useState(editingMap?.name ?? "");
  const [details, setDetails] = useState(editingMap?.details ?? "");
  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const [showUnsavedAlert, setShowUnsavedAlert] = useState(false);
  const [showBlockNameAlert, setShowBlockNameAlert] = useState(false);
  const [showFaceNameAlert, setShowFaceNameAlert] = useState(false);
  const [blockFaceName, setBlockFaceName] = useState("");
  const [showRenameBlockAlert, setShowRenameBlockAlert] = useState(false);
  const [showDeleteBlockAlert, setShowDeleteBlockAlert] = useState(false);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [renameBlockValue, setRenameBlockValue] = useState("");

  const hasUnsavedChanges = useMemo(() => {
    if (!editingMap) return false;
    const nameChanged = name !== editingMap.name;
    const detailsChanged = (details || null) !== editingMap.details;
    const boundaryChanged = editedBoundary !== null && 
      JSON.stringify(editedBoundary) !== JSON.stringify(editingMap.boundary);
    const blocksChanged = editedBlocks !== null &&
      JSON.stringify(editedBlocks) !== JSON.stringify(editingMap.blocks);
    return nameChanged || detailsChanged || boundaryChanged || blocksChanged;
  }, [name, details, editedBoundary, editedBlocks, editingMap]);

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
    setEditedBoundary(null);
    setEditedBlocks(null);
    setEditingBlockId(null);
    setIsEditingBoundary(false);
    setIsDrawMode(false);
  };

  const handleEditBoundary = () => {
    setIsDrawMode(true);
    setIsEditingBoundary(true);
    if (editingMap.boundary) {
      setEditedBoundary(editingMap.boundary);
    }
    closeMapEditModal();
  };

  const handleAddBlock = (blockName: string) => {
    if (!blockName || !blockName.trim()) return;
    
    const newBlock = {
      id: crypto.randomUUID(),
      name: blockName.trim(),
      type: "block" as const,
      coordinates: [] as [number, number][],
    };

    const currentBlocks = editedBlocks || editingMap.blocks || [];
    setEditedBlocks([...currentBlocks, newBlock]);
    setEditingBlockId(newBlock.id);
    setIsDrawMode(true);
    setShowBlockNameAlert(false);
    setBlockFaceName("");
    closeMapEditModal();
  };

  const handleAddFace = (faceName: string) => {
    if (!faceName || !faceName.trim()) return;
    
    const newFace = {
      id: crypto.randomUUID(),
      name: faceName.trim(),
      type: "face" as const,
      coordinates: [] as [number, number][],
    };

    const currentBlocks = editedBlocks || editingMap.blocks || [];
    setEditedBlocks([...currentBlocks, newFace]);
    setEditingBlockId(newFace.id);
    setIsDrawMode(true);
    setShowFaceNameAlert(false);
    setBlockFaceName("");
    closeMapEditModal();
  };

  const handleEditBlock = (blockId: string) => {
    if (!editedBlocks && editingMap.blocks) {
      setEditedBlocks(editingMap.blocks);
    }
    setEditingBlockId(blockId);
    setIsDrawMode(true);
    closeMapEditModal();
  };

  const handleRenameBlock = (blockId: string, currentName: string) => {
    setSelectedBlockId(blockId);
    setRenameBlockValue(currentName);
    setShowRenameBlockAlert(true);
  };

  const handleConfirmRename = (newName: string) => {
    if (!newName || !newName.trim() || !selectedBlockId) return;
    
    const currentBlocks = editedBlocks || editingMap.blocks || [];
    const updatedBlocks = currentBlocks.map(block => 
      block.id === selectedBlockId 
        ? { ...block, name: newName.trim() }
        : block
    );
    
    setEditedBlocks(updatedBlocks);
    setShowRenameBlockAlert(false);
    setSelectedBlockId(null);
    setRenameBlockValue("");
  };

  const handleDeleteBlock = (blockId: string) => {
    setSelectedBlockId(blockId);
    setShowDeleteBlockAlert(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedBlockId) return;
    
    const currentBlocks = editedBlocks || editingMap.blocks || [];
    const updatedBlocks = currentBlocks.filter(block => block.id !== selectedBlockId);
    
    setEditedBlocks(updatedBlocks);
    setShowDeleteBlockAlert(false);
    setSelectedBlockId(null);
  };

  const handleSave = () => {
    setShowSaveAlert(true);
  };

  const handleConfirmSave = async () => {
    if (!editingMap) return;

    const updatedMap = {
      ...editingMap,
      name,
      details: details || null,
      boundary: editedBoundary !== null ? editedBoundary : editingMap.boundary,
      blocks: editedBlocks !== null ? editedBlocks : editingMap.blocks,
    };

    await mapCollection.update(editingMap.id, (draft) => {
      draft.name = name;
      draft.details = details || null;
      if (editedBoundary !== null) {
        draft.boundary = editedBoundary;
      }
      if (editedBlocks !== null) {
        draft.blocks = editedBlocks;
      }
    });

    setSelectedMap(updatedMap);
    setShowSaveAlert(false);
    closeMapEditModal();
    setEditMode(false);
    setEditingMap(null);
    setEditedBoundary(null);
    setEditedBlocks(null);
    setEditingBlockId(null);
    setIsEditingBoundary(false);
    setIsDrawMode(false);
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
      <Button onClick={handleEditBoundary}>Edit Boundary</Button>
      <Button onClick={() => setShowBlockNameAlert(true)}>Add Block</Button>
      <Button onClick={() => setShowFaceNameAlert(true)}>Add Face</Button>
      
      {(editedBlocks || editingMap.blocks)?.map((block) => (
        <div key={block.id} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          <Button
            onClick={() => handleEditBlock(block.id)}
            style={{ flex: 1 }}
          >
            Edit {block.name}
          </Button>
          <Button
            onClick={() => handleRenameBlock(block.id, block.name)}
          >
            Rename
          </Button>
          <Button
            onClick={() => handleDeleteBlock(block.id)}
            color="danger"
          >
            Delete
          </Button>
        </div>
      ))}
      
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
      <IonAlert
        isOpen={showBlockNameAlert}
        onDidDismiss={() => {
          setShowBlockNameAlert(false);
          setBlockFaceName("");
        }}
        header="Add Block"
        inputs={[
          {
            name: "blockName",
            type: "text",
            placeholder: "Block name",
            value: blockFaceName,
          },
        ]}
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
          },
          {
            text: "Add",
            handler: (data) => handleAddBlock(data.blockName),
          },
        ]}
      />
      <IonAlert
        isOpen={showFaceNameAlert}
        onDidDismiss={() => {
          setShowFaceNameAlert(false);
          setBlockFaceName("");
        }}
        header="Add Face"
        inputs={[
          {
            name: "faceName",
            type: "text",
            placeholder: "Face name",
            value: blockFaceName,
          },
        ]}
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
          },
          {
            text: "Add",
            handler: (data) => handleAddFace(data.faceName),
          },
        ]}
      />
      <IonAlert
        isOpen={showRenameBlockAlert}
        onDidDismiss={() => {
          setShowRenameBlockAlert(false);
          setSelectedBlockId(null);
          setRenameBlockValue("");
        }}
        header="Rename Block/Face"
        inputs={[
          {
            name: "newName",
            type: "text",
            placeholder: "New name",
            value: renameBlockValue,
          },
        ]}
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
          },
          {
            text: "Rename",
            handler: (data) => handleConfirmRename(data.newName),
          },
        ]}
      />
      <IonAlert
        isOpen={showDeleteBlockAlert}
        onDidDismiss={() => {
          setShowDeleteBlockAlert(false);
          setSelectedBlockId(null);
        }}
        header="Delete Block/Face"
        message="Are you sure you want to delete this block/face? This action cannot be undone."
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
          },
          {
            text: "Delete",
            role: "destructive",
            handler: handleConfirmDelete,
          },
        ]}
      />
    </>
  );
};

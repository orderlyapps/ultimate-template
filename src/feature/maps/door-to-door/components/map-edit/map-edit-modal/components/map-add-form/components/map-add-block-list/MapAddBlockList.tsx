import { IonAlert } from "@ionic/react";
import { Button } from "@ionic-input/button/Button";
import { useState } from "react";

type Block = {
  id: string;
  name: string;
  type: "face" | "block";
  coordinates: [number, number][];
};

export const MapAddBlockList: React.FC<{
  editedBlocks: Block[] | null;
  setEditedBlocks: (blocks: Block[] | null) => void;
  setEditingBlockId: (id: string | null) => void;
  setIsDrawMode: (isDrawMode: boolean) => void;
  closeMapEditModal: () => void;
}> = ({
  editedBlocks,
  setEditedBlocks,
  setEditingBlockId,
  setIsDrawMode,
  closeMapEditModal,
}) => {
  const [showBlockNameAlert, setShowBlockNameAlert] = useState(false);
  const [showFaceNameAlert, setShowFaceNameAlert] = useState(false);
  const [blockFaceName, setBlockFaceName] = useState("");
  const [showRenameAlert, setShowRenameAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  const handleAddBlock = (blockName: string) => {
    if (!blockName?.trim()) return;
    const newBlock: Block = {
      id: crypto.randomUUID(),
      name: blockName.trim(),
      type: "block",
      coordinates: [],
    };
    setEditedBlocks([...(editedBlocks || []), newBlock]);
    setEditingBlockId(newBlock.id);
    setIsDrawMode(true);
    setShowBlockNameAlert(false);
    setBlockFaceName("");
    closeMapEditModal();
  };

  const handleAddFace = (faceName: string) => {
    if (!faceName?.trim()) return;
    const newFace: Block = {
      id: crypto.randomUUID(),
      name: faceName.trim(),
      type: "face",
      coordinates: [],
    };
    setEditedBlocks([...(editedBlocks || []), newFace]);
    setEditingBlockId(newFace.id);
    setIsDrawMode(true);
    setShowFaceNameAlert(false);
    setBlockFaceName("");
    closeMapEditModal();
  };

  const handleEditBlock = (blockId: string) => {
    setEditingBlockId(blockId);
    setIsDrawMode(true);
    closeMapEditModal();
  };

  const handleRename = (blockId: string, currentName: string) => {
    setSelectedBlockId(blockId);
    setRenameValue(currentName);
    setShowRenameAlert(true);
  };

  const handleConfirmRename = (newName: string) => {
    if (!newName?.trim() || !selectedBlockId) return;
    const updated = (editedBlocks || []).map((b) =>
      b.id === selectedBlockId ? { ...b, name: newName.trim() } : b,
    );
    setEditedBlocks(updated);
    setShowRenameAlert(false);
    setSelectedBlockId(null);
    setRenameValue("");
  };

  const handleDelete = (blockId: string) => {
    setSelectedBlockId(blockId);
    setShowDeleteAlert(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedBlockId) return;
    const updated = (editedBlocks || []).filter((b) => b.id !== selectedBlockId);
    setEditedBlocks(updated.length > 0 ? updated : null);
    setShowDeleteAlert(false);
    setSelectedBlockId(null);
  };

  return (
    <>
      <Button onClick={() => setShowBlockNameAlert(true)}>Add Block</Button>
      <Button onClick={() => setShowFaceNameAlert(true)}>Add Face</Button>

      {editedBlocks?.map((block) => (
        <div key={block.id} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
          <Button onClick={() => handleEditBlock(block.id)} style={{ flex: 1 }}>
            Edit {block.name}
          </Button>
          <Button onClick={() => handleRename(block.id, block.name)}>Rename</Button>
          <Button onClick={() => handleDelete(block.id)} color="danger">
            Delete
          </Button>
        </div>
      ))}

      <IonAlert
        isOpen={showBlockNameAlert}
        onDidDismiss={() => { setShowBlockNameAlert(false); setBlockFaceName(""); }}
        header="Add Block"
        inputs={[{ name: "blockName", type: "text", placeholder: "Block name", value: blockFaceName }]}
        buttons={[
          { text: "Cancel", role: "cancel" },
          { text: "Add", handler: (data) => handleAddBlock(data.blockName) },
        ]}
      />
      <IonAlert
        isOpen={showFaceNameAlert}
        onDidDismiss={() => { setShowFaceNameAlert(false); setBlockFaceName(""); }}
        header="Add Face"
        inputs={[{ name: "faceName", type: "text", placeholder: "Face name", value: blockFaceName }]}
        buttons={[
          { text: "Cancel", role: "cancel" },
          { text: "Add", handler: (data) => handleAddFace(data.faceName) },
        ]}
      />
      <IonAlert
        isOpen={showRenameAlert}
        onDidDismiss={() => { setShowRenameAlert(false); setSelectedBlockId(null); setRenameValue(""); }}
        header="Rename Block/Face"
        inputs={[{ name: "newName", type: "text", placeholder: "New name", value: renameValue }]}
        buttons={[
          { text: "Cancel", role: "cancel" },
          { text: "Rename", handler: (data) => handleConfirmRename(data.newName) },
        ]}
      />
      <IonAlert
        isOpen={showDeleteAlert}
        onDidDismiss={() => { setShowDeleteAlert(false); setSelectedBlockId(null); }}
        header="Delete Block/Face"
        message="Are you sure you want to delete this block/face?"
        buttons={[
          { text: "Cancel", role: "cancel" },
          { text: "Delete", role: "destructive", handler: handleConfirmDelete },
        ]}
      />
    </>
  );
};

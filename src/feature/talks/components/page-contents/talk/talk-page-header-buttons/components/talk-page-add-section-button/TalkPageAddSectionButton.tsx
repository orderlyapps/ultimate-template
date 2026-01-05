import { useState } from "react";
import { AddButton } from "@input/button/add-button/AddButton";
import { AddSectionAlert } from "@feature/talks/components/add-alerts/add-section-alert/AddSectionAlert";

export const TalkPageAddSectionButton: React.FC = () => {
  const [isAddSectionOpen, setIsAddSectionOpen] = useState(false);
  const [addSectionAlertKey, setAddSectionAlertKey] = useState(0);

  return (
    <>
      <AddButton
        onClick={() => {
          setAddSectionAlertKey((k) => k + 1);
          setIsAddSectionOpen(true);
        }}
      />
      <AddSectionAlert
        key={addSectionAlertKey}
        isOpen={isAddSectionOpen}
        onDismiss={() => setIsAddSectionOpen(false)}
      />
    </>
  );
};

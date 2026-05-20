import { IonSelect, IonSelectOption } from "@ionic/react";
import { Text } from "@ionic-display/text/Text";

interface AssignmentSelectProps {
  label: string;
  value: string;
  groups: Array<{ id: string; name: string }>;
  canEdit: boolean;
  onChange: (groupId: string) => void;
  onDelete: () => void;
}

/**
 * Select input for assigning a group to a cleaning slot (major or minor).
 * Shows the assigned group name if not editable, otherwise shows a dropdown.
 */
export const AssignmentSelect: React.FC<AssignmentSelectProps> = ({
  label,
  value,
  groups,
  canEdit,
  onChange,
  onDelete,
}) => {
  const selectedGroup = groups.find((g) => g.id === value);

  // If user can't edit, just show the assigned group name
  if (!canEdit) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Text size="sm" color="medium" style={{ minWidth: "50px" }}>
          {label}:
        </Text>
        <Text size="sm">
          {selectedGroup?.name ?? "Unassigned"}
        </Text>
      </div>
    );
  }

  // Editable version with select (unassigned triggers delete)
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <Text size="sm" color="medium" style={{ minWidth: "50px" }}>
        {label}:
      </Text>
      <IonSelect
        value={value || undefined}
        placeholder={`- - - - - - - - -`}
        onIonChange={(e) => {
          const selectedValue = e.detail.value;
          if (selectedValue === "") {
            onDelete();
          } else {
            onChange(selectedValue);
          }
        }}
        style={{ flex: 1 }}
        interface="popover"
      >
        <IonSelectOption value="">Unassigned</IonSelectOption>
        {groups.map((group) => (
          <IonSelectOption key={group.id} value={group.id}>
            {group.name}
          </IonSelectOption>
        ))}
      </IonSelect>
    </div>
  );
};

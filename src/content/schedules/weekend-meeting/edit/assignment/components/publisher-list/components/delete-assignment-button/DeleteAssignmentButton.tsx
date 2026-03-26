import { useIonAlert } from "@ionic/react";
import { Button } from "@ionic-input/button/Button";
import { weekendAssignmentCollection } from "@tanstack-db/weekend_assignment/weekendAssignmentCollection";
import type { WeekendAssignmentID } from "@tanstack-db/weekend_assignment/weekendAssignmentSchema";

type Props = {
  weekId: string;
  assignmentId: WeekendAssignmentID;
};

export const DeleteAssignmentButton: React.FC<Props> = ({
  weekId,
  assignmentId,
}) => {
  const [presentAlert] = useIonAlert();

  const handleDelete = () => {
    presentAlert({
      header: "Delete Assignment",
      message: "Are you sure you want to delete this assignment?",
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Delete",
          role: "destructive",
          handler: () => {
            const congregationId = localStorage.getItem("congregationId");
            if (!congregationId) return;

            const key = congregationId + weekId + assignmentId;
            weekendAssignmentCollection.delete(key);
          },
        },
      ],
    });
  };

  return (
    <Button expand="block" color="danger" onClick={handleDelete}>
      Delete Assignment
    </Button>
  );
};

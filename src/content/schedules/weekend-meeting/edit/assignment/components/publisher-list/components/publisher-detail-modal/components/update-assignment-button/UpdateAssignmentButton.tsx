import { useIonAlert } from "@ionic/react";
import { useLiveQuery, eq, and } from "@tanstack/react-db";
import { weekendAssignmentCollection } from "@tanstack-db/weekend_assignment/weekendAssignmentCollection";
import type { WeekendAssignmentID } from "@tanstack-db/weekend_assignment/weekendAssignmentSchema";
import { Button } from "@ionic-input/button/Button";

type Props = {
  weekId: string;
  assignmentId: WeekendAssignmentID;
  publisherId: string;
  onSuccess: () => void;
};

export const UpdateAssignmentButton: React.FC<Props> = ({
  weekId,
  assignmentId,
  publisherId,
  onSuccess,
}) => {
  const [presentAlert] = useIonAlert();
  const congregationId = localStorage.getItem("congregationId") ?? "";

  const { data: existingAssignments } = useLiveQuery(
    (q) =>
      q
        .from({ wa: weekendAssignmentCollection })
        .where(({ wa }) =>
          and(
            eq(wa.congregation_id, congregationId),
            eq(wa.week_id, weekId),
            eq(wa.assignment_id, assignmentId),
          ),
        ),
    [congregationId, weekId, assignmentId],
  );

  const existingAssignment = existingAssignments?.[0];

  const handleAssign = () => {
    if (!congregationId) return;

    presentAlert({
      header: "Assign Publisher",
      message: "Are you sure you want to assign this publisher?",
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Assign",
          handler: () => {
            if (existingAssignment) {
              const key = congregationId + weekId + assignmentId;
              weekendAssignmentCollection.update(key, (draft) => {
                draft.participant_id = publisherId;
              });
            } else {
              weekendAssignmentCollection.insert({
                congregation_id: congregationId,
                week_id: weekId,
                assignment_id: assignmentId,
                participant_id: publisherId,
              });
            }

            onSuccess();
          },
        },
      ],
    });
  };

  return <Button onClick={handleAssign}>Assign Publisher</Button>;
};

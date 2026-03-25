import type { AssignmentHistoryItem } from "../../../../../../hooks/usePublisherAssignmentHistory";

const assignmentLabels: Record<string, string> = {
  chairman: "Chairman",
  reader: "Reader",
  speaker: "Public Talk",
};

export const formatAssignmentLabel = (item: AssignmentHistoryItem): string => {
  return assignmentLabels[item.assignment_id] ?? item.assignment_id;
};

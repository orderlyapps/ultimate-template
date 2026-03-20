import { useEffect, useRef } from "react";
import { useDismissedAssignmentsStore } from "../dismissed-assignments-store/useDismissedAssignmentsStore";
import type { HomeItem } from "../usePublisherHomeItems";
import { getThisWeekID } from "@util/date/getThisWeekID";

export const useNewAssignments = (items: HomeItem[]) => {
  const dismissedKeys = useDismissedAssignmentsStore((s) => s.dismissedKeys);
  const dismiss = useDismissedAssignmentsStore((s) => s.dismiss);
  const dismissAll = useDismissedAssignmentsStore((s) => s.dismissAll);
  const cleanup = useDismissedAssignmentsStore((s) => s.cleanup);

  const didCleanup = useRef(false);
  useEffect(() => {
    if (!didCleanup.current) {
      didCleanup.current = true;
      cleanup(getThisWeekID());
    }
  }, [cleanup]);

  const excludedPrefixes = ["event-", "public-talk-"];
  const assignmentItems = items.filter(
    (item) => !excludedPrefixes.some((prefix) => item.key.startsWith(prefix)),
  );
  const newItems = assignmentItems.filter(
    (item) => !dismissedKeys.has(item.key),
  );

  const handleDismissAll = () => {
    dismissAll(newItems.map((item) => item.key));
  };

  return { newItems, dismiss, dismissAll: handleDismissAll };
};

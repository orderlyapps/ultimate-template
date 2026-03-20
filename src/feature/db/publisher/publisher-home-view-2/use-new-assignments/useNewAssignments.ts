import { useEffect, useRef } from "react";
import { useDismissedAssignmentsStore } from "../dismissed-assignments-store/useDismissedAssignmentsStore";
import type { HomeItem } from "../usePublisherHomeItems";
import { getThisWeekID } from "@util/date/getThisWeekID";

export type NotificationItem = {
  key: string;
  title: string;
  dateLabel: string;
  detail: string;
};

function expandItems(items: HomeItem[]): NotificationItem[] {
  const excludedPrefixes = ["event-", "public-talk-"];
  const result: NotificationItem[] = [];

  for (const item of items) {
    if (excludedPrefixes.some((p) => item.key.startsWith(p))) continue;

    if (item.details && item.details.length > 0) {
      for (const detail of item.details) {
        result.push({
          key: `${item.key}::${detail}`,
          title: item.title,
          dateLabel: item.dateLabel,
          detail,
        });
      }
    } else {
      result.push({
        key: item.key,
        title: item.title,
        dateLabel: item.dateLabel,
        detail: "",
      });
    }
  }

  return result;
}

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

  const expanded = expandItems(items);
  const newItems = expanded.filter((item) => !dismissedKeys.has(item.key));

  const handleDismissAll = () => {
    dismissAll(newItems.map((item) => item.key));
  };

  return { newItems, dismiss, dismissAll: handleDismissAll };
};

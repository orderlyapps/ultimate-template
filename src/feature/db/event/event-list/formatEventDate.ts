import { getDayName } from "@date/getDayName";

export const formatEventDate = (
  startDateStr: string,
  endDateStr?: string | null,
): string => {
  const [sYear, sMonth, sDay] = startDateStr.split("-").map(Number);
  const startDate = new Date(sYear, sMonth - 1, sDay);

  if (!endDateStr || endDateStr === startDateStr) {
    const dayName = getDayName(startDateStr);
    const month = startDate.toLocaleDateString(undefined, {
      month: "long",
    });
    const date = startDate.toLocaleDateString(undefined, {
      day: "numeric",
    });
    return `${month} ${date} (${dayName})`;
  }

  const [eYear, eMonth, eDay] = endDateStr.split("-").map(Number);
  const endDate = new Date(eYear, eMonth - 1, eDay);

  const startMonth = startDate.toLocaleDateString(undefined, { month: "long" });
  const endMonth = endDate.toLocaleDateString(undefined, { month: "long" });

  if (startMonth === endMonth) {
    return `${startMonth} ${sDay}–${eDay}`;
  }
  return `${startMonth} ${sDay}–${endMonth} ${eDay}`;
};

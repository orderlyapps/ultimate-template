/**
 * Converts a Date instance into a local datetime string suitable for
 * `<input type="datetime-local">` or Ionic `IonDatetime` value props.
 *
 * The returned string is in the format: `YYYY-MM-DDTHH:MM` using the
 * local time of the provided Date.
 *
 * @param date - The Date to convert, interpreted in the local timezone.
 * @returns A formatted datetime string (`YYYY-MM-DDTHH:MM`) in local time.
 */
export function getLocalDatetimeValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export const formatPublisherName = (
  publisher?:
    | {
        first_name: string;
        middle_name?: string | null | undefined;
        last_name: string;
        display_name?: string | null | undefined;
        [key: string]: unknown;
      }
    | null
    | undefined,
  format?: "display last" | "first (display) middle last",
  fallbackText?: string
) => {
  if (!publisher) {
    return fallbackText || "";
  }

  let displayName;
  let middleName;

  switch (format) {
    case "display last":
      displayName = publisher.display_name || publisher.first_name;
      return `${displayName} ${publisher.last_name}`;

    case "first (display) middle last":
      displayName = publisher.display_name
        ? ` (${publisher.display_name})`
        : "";
      middleName = publisher.middle_name ? ` ${publisher.middle_name}` : "";
      return `${publisher.first_name}${displayName}${middleName} ${publisher.last_name}`;

    default:
      displayName = publisher.display_name || publisher.first_name;
      return `${publisher.last_name}, ${displayName}`;
  }
};

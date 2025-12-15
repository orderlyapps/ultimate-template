export function normalize(text: string) {
  return text.trim().toLowerCase();
}

export function safeString(value: unknown) {
  return typeof value === "string" ? value : "";
}

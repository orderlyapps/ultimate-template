/**
 * Creates a comparator function for sorting arrays by a property that may contain number strings or regular strings.
 * Number strings are sorted numerically and appear before regular strings.
 * Regular strings are sorted alphabetically after number strings.
 *
 * @param path - The property path to sort by (supports dot notation for nested properties, e.g., 'user.profile.age')
 * @returns A comparator function for use with Array.sort()
 *
 * @example
 * const items = [
 *   { id: "10" },
 *   { id: "2" },
 *   { id: "abc" },
 *   { id: "1" },
 *   { id: "def" }
 * ];
 * items.sort(sortByNumberString('id'));
 * // Result: [{ id: "1" }, { id: "2" }, { id: "10" }, { id: "abc" }, { id: "def" }]
 *
 * @example
 * const nested = [
 *   { user: { level: "10" } },
 *   { user: { level: "2" } },
 *   { user: { level: "admin" } }
 * ];
 * nested.sort(sortByNumberString('user.level'));
 * // Result: [{ user: { level: "2" } }, { user: { level: "10" } }, { user: { level: "admin" } }]
 */
export function sortByNumberString<T>(path: string) {
  return (a: T, b: T): number => {
    const getValue = (obj: T, path: string): unknown => {
      return path
        .split(".")
        .reduce<unknown>(
          (current, key) =>
            current != null && typeof current === "object"
              ? (current as Record<string, unknown>)[key]
              : undefined,
          obj
        );
    };

    const aValue = String(getValue(a, path) ?? "");
    const bValue = String(getValue(b, path) ?? "");

    const aNum = Number(aValue);
    const bNum = Number(bValue);

    const aIsNumber = !isNaN(aNum) && aValue.trim() !== "";
    const bIsNumber = !isNaN(bNum) && bValue.trim() !== "";

    // Both are numbers: compare numerically
    if (aIsNumber && bIsNumber) {
      return aNum - bNum;
    }

    // Only a is a number: a comes first
    if (aIsNumber) {
      return -1;
    }

    // Only b is a number: b comes first
    if (bIsNumber) {
      return 1;
    }

    // Both are strings: compare alphabetically
    return aValue.localeCompare(bValue);
  };
}

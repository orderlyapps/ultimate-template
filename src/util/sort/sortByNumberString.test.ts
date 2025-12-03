import { describe, it, expect } from "vitest";
import { sortByNumberString } from "./sortByNumberString";

describe("sortByNumberString", () => {
  it("sorts number strings numerically", () => {
    const items = [{ id: "10" }, { id: "2" }, { id: "1" }, { id: "20" }];
    const result = items.sort(sortByNumberString("id"));
    expect(result.map((i) => i.id)).toEqual(["1", "2", "10", "20"]);
  });

  it("sorts regular strings alphabetically", () => {
    const items = [{ id: "cherry" }, { id: "apple" }, { id: "banana" }];
    const result = items.sort(sortByNumberString("id"));
    expect(result.map((i) => i.id)).toEqual(["apple", "banana", "cherry"]);
  });

  it("places number strings before regular strings", () => {
    const items = [
      { id: "abc" },
      { id: "10" },
      { id: "2" },
      { id: "def" },
      { id: "1" },
    ];
    const result = items.sort(sortByNumberString("id"));
    expect(result.map((i) => i.id)).toEqual(["1", "2", "10", "abc", "def"]);
  });

  it("handles nested properties with dot notation", () => {
    const items = [
      { user: { level: "10" } },
      { user: { level: "2" } },
      { user: { level: "admin" } },
    ];
    const result = items.sort(sortByNumberString("user.level"));
    expect(result.map((i) => i.user.level)).toEqual(["2", "10", "admin"]);
  });

  it("handles deeply nested properties", () => {
    const items = [
      { a: { b: { c: "3" } } },
      { a: { b: { c: "1" } } },
      { a: { b: { c: "2" } } },
    ];
    const result = items.sort(sortByNumberString("a.b.c"));
    expect(result.map((i) => i.a.b.c)).toEqual(["1", "2", "3"]);
  });

  it("handles null and undefined values", () => {
    const items = [
      { id: "2" },
      { id: null },
      { id: "1" },
      { id: undefined },
    ] as { id: string | null | undefined }[];
    const result = items.sort(sortByNumberString("id"));
    expect(result.map((i) => i.id)).toEqual(["1", "2", null, undefined]);
  });

  it("handles missing nested properties", () => {
    const items = [
      { user: { level: "2" } },
      { user: {} },
      { user: { level: "1" } },
    ] as { user: { level?: string } }[];
    const result = items.sort(sortByNumberString("user.level"));
    expect(result.map((i) => i.user.level)).toEqual(["1", "2", undefined]);
  });

  it("handles empty strings", () => {
    const items = [{ id: "2" }, { id: "" }, { id: "1" }];
    const result = items.sort(sortByNumberString("id"));
    expect(result.map((i) => i.id)).toEqual(["1", "2", ""]);
  });

  it("handles whitespace-only strings as non-numbers", () => {
    const items = [{ id: "2" }, { id: "   " }, { id: "1" }];
    const result = items.sort(sortByNumberString("id"));
    expect(result.map((i) => i.id)).toEqual(["1", "2", "   "]);
  });

  it("handles negative numbers", () => {
    const items = [{ id: "10" }, { id: "-5" }, { id: "2" }, { id: "-10" }];
    const result = items.sort(sortByNumberString("id"));
    expect(result.map((i) => i.id)).toEqual(["-10", "-5", "2", "10"]);
  });

  it("handles decimal numbers", () => {
    const items = [{ id: "1.5" }, { id: "1.25" }, { id: "2" }, { id: "1.1" }];
    const result = items.sort(sortByNumberString("id"));
    expect(result.map((i) => i.id)).toEqual(["1.1", "1.25", "1.5", "2"]);
  });
});

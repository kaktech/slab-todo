import { describe, expect, it } from "vitest";
import { isOverdue, todayISO } from "./dates";

describe("dates", () => {
  const now = new Date(2026, 8, 5, 12); // 5 Sep 2026, local
  it("formats local date", () => expect(todayISO(now)).toBe("2026-09-05"));
  it("detects overdue", () => {
    expect(isOverdue("2026-09-04", now)).toBe(true);
    expect(isOverdue("2026-09-05", now)).toBe(false);
    expect(isOverdue(null, now)).toBe(false);
  });
});

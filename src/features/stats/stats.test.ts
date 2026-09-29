import { describe, expect, it } from "vitest";
import type { Task } from "../../types";
import { completionPercent, currentStreak, weeklyCounts } from "./stats";

const now = new Date(2026, 8, 10, 15); // 10 Sep 2026 local
const at = (daysBack: number) => new Date(2026, 8, 10 - daysBack, 9).getTime();
const mk = (o: Partial<Task>): Task => ({ id: Math.random().toString(), title: "t", done: false, priority: "med", category: "Work", due: null, createdAt: 1, ...o });
const doneOn = (daysBack: number) => mk({ done: true, completedAt: at(daysBack) });

describe("stats", () => {
  it("completion percent handles empty and rounds", () => {
    expect(completionPercent([])).toBe(0);
    expect(completionPercent([mk({ done: true }), mk({}), mk({})])).toBe(33);
  });
  it("streak counts consecutive days ending today", () => {
    expect(currentStreak([doneOn(0), doneOn(1), doneOn(2), doneOn(4)], now)).toBe(3);
  });
  it("streak survives an empty today but not an empty yesterday", () => {
    expect(currentStreak([doneOn(1), doneOn(2)], now)).toBe(2);
    expect(currentStreak([doneOn(2), doneOn(3)], now)).toBe(0);
    expect(currentStreak([], now)).toBe(0);
  });
  it("ignores done tasks without a completion date", () => expect(currentStreak([mk({ done: true })], now)).toBe(0));
  it("weekly counts are oldest-first, 7 long, ending today", () => {
    const w = weeklyCounts([doneOn(0), doneOn(0), doneOn(6), doneOn(9)], now);
    expect(w).toHaveLength(7);
    expect(w[6].count).toBe(2);
    expect(w[0].count).toBe(1);
    expect(w.reduce((a, d) => a + d.count, 0)).toBe(3);
  });
});

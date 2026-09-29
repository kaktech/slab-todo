import { describe, expect, it } from "vitest";
import type { Task } from "../../types";
import { applyFilters, DEFAULT_FILTERS, hasActiveFilters } from "./applyFilters";

const mk = (o: Partial<Task>): Task => ({ id: "x", title: "t", done: false, priority: "med", category: "Work", due: null, createdAt: 1, ...o });
const tasks = [
  mk({ id: "a", title: "Buy milk", category: "Errands", priority: "low", due: "2026-10-02", createdAt: 1 }),
  mk({ id: "b", title: "Gym", category: "Health", priority: "high", done: true, due: "2026-10-01", createdAt: 2 }),
  mk({ id: "c", title: "Report", category: "Work", priority: "high", due: null, createdAt: 3 }),
];
const ids = (l: Task[]) => l.map((t) => t.id);

describe("applyFilters", () => {
  it("searches case-insensitively", () => expect(ids(applyFilters(tasks, { ...DEFAULT_FILTERS, query: " MILK " }))).toEqual(["a"]));
  it("filters by status", () => {
    expect(ids(applyFilters(tasks, { ...DEFAULT_FILTERS, status: "done" }))).toEqual(["b"]);
    expect(ids(applyFilters(tasks, { ...DEFAULT_FILTERS, status: "active" }))).toEqual(["c", "a"]);
  });
  it("filters by category and priority", () => {
    expect(ids(applyFilters(tasks, { ...DEFAULT_FILTERS, category: "Work" }))).toEqual(["c"]);
    expect(ids(applyFilters(tasks, { ...DEFAULT_FILTERS, priority: "high" }))).toEqual(["c", "b"]);
  });
  it("sorts by due date with undated last", () => expect(ids(applyFilters(tasks, { ...DEFAULT_FILTERS, sort: "due" }))).toEqual(["b", "a", "c"]));
  it("sorts by priority", () => expect(ids(applyFilters(tasks, { ...DEFAULT_FILTERS, sort: "priority" }))).toEqual(["c", "b", "a"]));
  it("does not mutate input", () => { const copy = [...tasks]; applyFilters(tasks, { ...DEFAULT_FILTERS, sort: "due" }); expect(tasks).toEqual(copy); });
  it("reports active filters", () => {
    expect(hasActiveFilters(DEFAULT_FILTERS)).toBe(false);
    expect(hasActiveFilters({ ...DEFAULT_FILTERS, query: "a" })).toBe(true);
  });
});

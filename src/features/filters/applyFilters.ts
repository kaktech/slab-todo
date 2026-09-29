import type { Category, Priority, Task } from "../../types";

export type StatusFilter = "all" | "active" | "done";
export type SortKey = "newest" | "due" | "priority";

export interface Filters {
  query: string;
  status: StatusFilter;
  category: Category | "all";
  priority: Priority | "all";
  sort: SortKey;
}

export const DEFAULT_FILTERS: Filters = { query: "", status: "all", category: "all", priority: "all", sort: "newest" };

const PRI_RANK: Record<Priority, number> = { high: 0, med: 1, low: 2 };

export function applyFilters(tasks: Task[], f: Filters): Task[] {
  const q = f.query.trim().toLowerCase();
  const out = tasks.filter(
    (t) =>
      (!q || t.title.toLowerCase().includes(q)) &&
      (f.status === "all" || (f.status === "done") === t.done) &&
      (f.category === "all" || t.category === f.category) &&
      (f.priority === "all" || t.priority === f.priority),
  );
  const sorted = [...out];
  if (f.sort === "newest") sorted.sort((a, b) => b.createdAt - a.createdAt);
  if (f.sort === "priority") sorted.sort((a, b) => PRI_RANK[a.priority] - PRI_RANK[b.priority] || b.createdAt - a.createdAt);
  if (f.sort === "due")
    sorted.sort((a, b) => {
      if (a.due === b.due) return b.createdAt - a.createdAt;
      if (!a.due) return 1; // no due date sinks to the bottom
      if (!b.due) return -1;
      return a.due < b.due ? -1 : 1;
    });
  return sorted;
}

export function hasActiveFilters(f: Filters): boolean {
  return f.query !== "" || f.status !== "all" || f.category !== "all" || f.priority !== "all";
}

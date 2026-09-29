import type { Task } from "../../types";
import { todayISO } from "../tasks/dates";

/** Local-date key for an epoch timestamp. */
function dayKey(ts: number): string {
  return todayISO(new Date(ts));
}

function shiftDay(now: Date, back: number): Date {
  const d = new Date(now);
  d.setDate(d.getDate() - back);
  return d;
}

export function completionPercent(tasks: Task[]): number {
  return tasks.length === 0 ? 0 : Math.round((tasks.filter((t) => t.done).length / tasks.length) * 100);
}

function completedCounts(tasks: Task[]): Map<string, number> {
  const m = new Map<string, number>();
  for (const t of tasks) {
    if (t.done && t.completedAt) m.set(dayKey(t.completedAt), (m.get(dayKey(t.completedAt)) ?? 0) + 1);
  }
  return m;
}

export interface DayCount { key: string; label: string; count: number }

/** Completions for the last 7 days, oldest first, ending today. */
export function weeklyCounts(tasks: Task[], now: Date = new Date()): DayCount[] {
  const counts = completedCounts(tasks);
  return Array.from({ length: 7 }, (_, i) => {
    const d = shiftDay(now, 6 - i);
    const key = todayISO(d);
    return { key, label: d.toLocaleDateString("en", { weekday: "short" }).slice(0, 2), count: counts.get(key) ?? 0 };
  });
}

/** Consecutive days with >=1 completion. Today may still be empty without breaking the streak. */
export function currentStreak(tasks: Task[], now: Date = new Date()): number {
  const counts = completedCounts(tasks);
  let back = counts.has(todayISO(now)) ? 0 : 1;
  let streak = 0;
  while (counts.has(todayISO(shiftDay(now, back)))) {
    streak++;
    back++;
  }
  return streak;
}


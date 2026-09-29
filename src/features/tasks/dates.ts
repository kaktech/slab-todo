/** Local-date `YYYY-MM-DD` (not UTC, so "today" matches the user's clock). */
export function todayISO(now: Date = new Date()): string {
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${m}-${d}`;
}

export function isOverdue(due: string | null, now: Date = new Date()): boolean {
  return !!due && due < todayISO(now);
}

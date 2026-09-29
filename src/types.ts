export type Priority = "high" | "med" | "low";

export const CATEGORIES = ["Work", "Personal", "Health", "Errands", "Study"] as const;
export type Category = (typeof CATEGORIES)[number];

export interface Task {
  id: string;
  title: string;
  done: boolean;
  priority: Priority;
  category: Category;
  /** ISO date `YYYY-MM-DD`, or null when no due date. */
  due: string | null;
  createdAt: number;
}

import type { Task } from "../../types";

export type TaskAction =
  | { type: "add"; task: Task }
  | { type: "toggle"; id: string }
  | { type: "remove"; id: string }
  | { type: "update"; id: string; changes: Partial<Omit<Task, "id" | "createdAt">> }
  | { type: "clearDone" };

export function tasksReducer(tasks: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case "add":
      return [action.task, ...tasks];
    case "toggle":
      return tasks.map((t) => (t.id === action.id ? { ...t, done: !t.done } : t));
    case "remove":
      return tasks.filter((t) => t.id !== action.id);
    case "update":
      return tasks.map((t) => (t.id === action.id ? { ...t, ...action.changes } : t));
    case "clearDone":
      return tasks.filter((t) => !t.done);
  }
}

export function makeTask(input: Pick<Task, "title" | "priority" | "category" | "due">): Task {
  return {
    ...input,
    title: input.title.trim(),
    id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    done: false,
    createdAt: Date.now(),
  };
}

import { useCallback } from "react";
import { useLocalStorage } from "../../lib/useLocalStorage";
import type { Task } from "../../types";
import { tasksReducer, type TaskAction } from "./tasksReducer";

/** Guards against corrupt persisted data. */
function sanitize(v: unknown): Task[] {
  return Array.isArray(v) ? v.filter((t): t is Task => !!t && typeof t === "object" && typeof (t as Task).id === "string" && typeof (t as Task).title === "string") : [];
}

export function useTasks() {
  const [raw, setRaw] = useLocalStorage<Task[]>("slab.tasks", []);
  const tasks = sanitize(raw);
  const dispatch = useCallback((action: TaskAction) => setRaw((prev) => tasksReducer(sanitize(prev), action)), [setRaw]);
  return { tasks, dispatch };
}

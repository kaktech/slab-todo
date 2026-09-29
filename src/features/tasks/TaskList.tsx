import type { Task } from "../../types";
import { TaskItem } from "./TaskItem";
import type { TaskAction } from "./tasksReducer";

interface Props {
  tasks: Task[];
  total: number;
  dispatch: (a: TaskAction) => void;
}

export function TaskList({ tasks, total, dispatch }: Props) {
  return (
    <section className="block" aria-label="Task list">
      <h2 className="block-title">
        <span>Tasks</span>
        <span>{tasks.length} shown</span>
      </h2>
      {tasks.length === 0 ? (
        <p className="empty">{total === 0 ? "Nothing here. Add your first task above." : "No tasks match these filters."}</p>
      ) : (
        <ul className="tasks">
          {tasks.map((t) => (
            <TaskItem
              key={t.id}
              task={t}
              onToggle={() => dispatch({ type: "toggle", id: t.id })}
              onRemove={() => dispatch({ type: "remove", id: t.id })}
              onRename={(title) => dispatch({ type: "update", id: t.id, changes: { title } })}
            />
          ))}
        </ul>
      )}
      {tasks.some((t) => t.done) && (
        <div className="block-body list-foot">
          <button className="btn ghost small" onClick={() => dispatch({ type: "clearDone" })}>Clear completed</button>
        </div>
      )}
    </section>
  );
}

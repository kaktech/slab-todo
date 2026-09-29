import { useState } from "react";
import type { Task } from "../../types";
import { isOverdue } from "./dates";

interface Props {
  task: Task;
  onToggle: () => void;
  onRemove: () => void;
  onRename: (title: string) => void;
}

const PRI_LABEL = { high: "High", med: "Med", low: "Low" } as const;

export function TaskItem({ task, onToggle, onRemove, onRename }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);
  const overdue = !task.done && isOverdue(task.due);

  const save = () => {
    const t = draft.trim();
    if (t) onRename(t);
    else setDraft(task.title);
    setEditing(false);
  };

  return (
    <li className={`task${task.done ? " done" : ""}`}>
      <button
        className="check"
        role="checkbox"
        aria-checked={task.done}
        aria-label={`${task.done ? "Mark not done" : "Mark done"}: ${task.title}`}
        onClick={onToggle}
      >
        {task.done ? "■" : ""}
      </button>
      <div className="task-main">
        {editing ? (
          <input
            className="field edit"
            autoFocus
            value={draft}
            maxLength={140}
            aria-label="Edit task title"
            onChange={(e) => setDraft(e.target.value)}
            onBlur={save}
            onKeyDown={(e) => {
              if (e.key === "Enter") save();
              if (e.key === "Escape") { setDraft(task.title); setEditing(false); }
            }}
          />
        ) : (
          <span className="task-title">{task.title}</span>
        )}
        <div className="meta">
          <span className={`tag pri-${task.priority}`}>{PRI_LABEL[task.priority]}</span>
          <span className="tag">{task.category}</span>
          {task.due && <span className={`tag${overdue ? " overdue" : ""}`}>{overdue ? "Overdue " : "Due "}{task.due}</span>}
        </div>
      </div>
      <div className="task-actions">
        <button className="btn ghost small" onClick={() => { setDraft(task.title); setEditing(true); }} aria-label={`Edit ${task.title}`}>Edit</button>
        <button className="btn ghost small" onClick={onRemove} aria-label={`Delete ${task.title}`}>Del</button>
      </div>
    </li>
  );
}

import { useState, type FormEvent } from "react";
import { CATEGORIES, type Category, type Priority, type Task } from "../../types";
import { makeTask } from "./tasksReducer";

export function TaskForm({ onAdd }: { onAdd: (t: Task) => void }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("med");
  const [category, setCategory] = useState<Category>("Work");
  const [due, setDue] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(makeTask({ title, priority, category, due: due || null }));
    setTitle("");
    setDue("");
  };

  return (
    <form className="block rose" onSubmit={submit} aria-label="Add task">
      <h2 className="block-title">New task</h2>
      <div className="block-body form-grid">
        <div className="span-all">
          <label className="lbl" htmlFor="t-title">Task</label>
          <input id="t-title" className="field" value={title} maxLength={140} placeholder="What needs doing?" onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label className="lbl" htmlFor="t-pri">Priority</label>
          <select id="t-pri" className="field" value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
            <option value="high">High</option>
            <option value="med">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div>
          <label className="lbl" htmlFor="t-cat">Category</label>
          <select id="t-cat" className="field" value={category} onChange={(e) => setCategory(e.target.value as Category)}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="lbl" htmlFor="t-due">Due</label>
          <input id="t-due" type="date" className="field" value={due} onChange={(e) => setDue(e.target.value)} />
        </div>
        <div className="form-submit">
          <button className="btn" type="submit" disabled={!title.trim()}>Add task ▸</button>
        </div>
      </div>
    </form>
  );
}

import { useMemo, useState } from "react";
import { applyFilters, DEFAULT_FILTERS, type Filters } from "./features/filters/applyFilters";
import { FilterBar } from "./features/filters/FilterBar";
import { TaskForm } from "./features/tasks/TaskForm";
import { TaskList } from "./features/tasks/TaskList";
import { useTasks } from "./features/tasks/useTasks";

export default function App() {
  const { tasks, dispatch } = useTasks();
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const visible = useMemo(() => applyFilters(tasks, filters), [tasks, filters]);
  const done = tasks.filter((t) => t.done).length;

  return (
    <div className="app">
      <header className="header">
        <h1 className="brand">SLAB<span>.</span></h1>
        <div className="tally" aria-live="polite">
          <strong>{String(done).padStart(2, "0")}/{String(tasks.length).padStart(2, "0")}</strong>
          done
        </div>
      </header>
      <div className="grid">
        <main className="main-col">
          <TaskForm onAdd={(task) => dispatch({ type: "add", task })} />
          <FilterBar filters={filters} onChange={setFilters} />
          <TaskList tasks={visible} total={tasks.length} dispatch={dispatch} />
        </main>
      </div>
    </div>
  );
}

import { CATEGORIES, type Category, type Priority } from "../../types";
import { DEFAULT_FILTERS, hasActiveFilters, type Filters, type SortKey, type StatusFilter } from "./applyFilters";

interface Props {
  filters: Filters;
  onChange: (f: Filters) => void;
}

export function FilterBar({ filters, onChange }: Props) {
  const set = <K extends keyof Filters>(k: K, v: Filters[K]) => onChange({ ...filters, [k]: v });

  return (
    <section className="block" aria-label="Search and filter">
      <h2 className="block-title">
        <span>Find</span>
        {hasActiveFilters(filters) && (
          <button className="linkish" onClick={() => onChange(DEFAULT_FILTERS)}>Reset</button>
        )}
      </h2>
      <div className="block-body filter-grid">
        <div className="span-all">
          <label className="lbl" htmlFor="f-q">Search</label>
          <input id="f-q" type="search" className="field" placeholder="Search tasks…" value={filters.query} onChange={(e) => set("query", e.target.value)} />
        </div>
        <div>
          <label className="lbl" htmlFor="f-s">Status</label>
          <select id="f-s" className="field" value={filters.status} onChange={(e) => set("status", e.target.value as StatusFilter)}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div>
          <label className="lbl" htmlFor="f-c">Category</label>
          <select id="f-c" className="field" value={filters.category} onChange={(e) => set("category", e.target.value as Category | "all")}>
            <option value="all">All</option>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="lbl" htmlFor="f-p">Priority</label>
          <select id="f-p" className="field" value={filters.priority} onChange={(e) => set("priority", e.target.value as Priority | "all")}>
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="med">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div>
          <label className="lbl" htmlFor="f-o">Sort</label>
          <select id="f-o" className="field" value={filters.sort} onChange={(e) => set("sort", e.target.value as SortKey)}>
            <option value="newest">Newest</option>
            <option value="due">Due date</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>
    </section>
  );
}

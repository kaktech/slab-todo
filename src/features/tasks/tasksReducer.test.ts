import { describe, expect, it } from "vitest";
import { makeTask, tasksReducer } from "./tasksReducer";

const base = { priority: "med", category: "Work", due: null } as const;

describe("tasksReducer", () => {
  it("adds newest first and trims the title", () => {
    const a = makeTask({ ...base, title: "  A " });
    const b = makeTask({ ...base, title: "B" });
    const s = tasksReducer(tasksReducer([], { type: "add", task: a }), { type: "add", task: b });
    expect(s.map((t) => t.title)).toEqual(["B", "A"]);
  });

  it("toggles, updates, removes and clears done", () => {
    const a = makeTask({ ...base, title: "A" });
    const b = makeTask({ ...base, title: "B" });
    let s = [a, b];
    s = tasksReducer(s, { type: "toggle", id: a.id });
    expect(s[0].done).toBe(true);
    s = tasksReducer(s, { type: "update", id: b.id, changes: { title: "B2" } });
    expect(s[1].title).toBe("B2");
    s = tasksReducer(s, { type: "clearDone" });
    expect(s.map((t) => t.id)).toEqual([b.id]);
    s = tasksReducer(s, { type: "remove", id: b.id });
    expect(s).toEqual([]);
  });
});

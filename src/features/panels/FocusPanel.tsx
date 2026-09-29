import { useLocalStorage } from "../../lib/useLocalStorage";

interface Slot { text: string; done: boolean }
const EMPTY: Slot[] = [{ text: "", done: false }, { text: "", done: false }, { text: "", done: false }];

function valid(v: unknown): Slot[] {
  return Array.isArray(v) && v.length === 3 && v.every((s) => s && typeof s.text === "string" && typeof s.done === "boolean") ? (v as Slot[]) : EMPTY;
}

export function FocusPanel() {
  const [raw, setSlots] = useLocalStorage<Slot[]>("slab.focus", EMPTY);
  const slots = valid(raw);
  const patch = (i: number, p: Partial<Slot>) => setSlots(slots.map((s, j) => (j === i ? { ...s, ...p } : s)));

  return (
    <section className="block" aria-label="Today's focus">
      <h2 className="block-title"><span>Focus</span><span>Top 3</span></h2>
      <ol className="block-body focus-list">
        {slots.map((s, i) => (
          <li key={i} className="focus-row">
            <button className="check" role="checkbox" aria-checked={s.done} aria-label={`Focus ${i + 1} done`} disabled={!s.text.trim()} onClick={() => patch(i, { done: !s.done })}>
              {s.done ? "■" : ""}
            </button>
            <label className="sr-only" htmlFor={`focus-${i}`}>Focus item {i + 1}</label>
            <input id={`focus-${i}`} className={`field${s.done ? " struck" : ""}`} maxLength={80} placeholder={`Priority ${i + 1}`} value={s.text} onChange={(e) => patch(i, { text: e.target.value, done: e.target.value.trim() ? s.done : false })} />
          </li>
        ))}
      </ol>
    </section>
  );
}

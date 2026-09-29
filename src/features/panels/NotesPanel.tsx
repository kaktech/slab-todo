import { useLocalStorage } from "../../lib/useLocalStorage";

export function NotesPanel() {
  const [notes, setNotes] = useLocalStorage<string>("slab.notes", "");
  return (
    <section className="block rose" aria-label="Notes">
      <h2 className="block-title"><span>Notes</span><span>{notes.length}/2000</span></h2>
      <div className="block-body">
        <label className="sr-only" htmlFor="notes">Notes</label>
        <textarea id="notes" className="field" maxLength={2000} placeholder="Loose thoughts, links, numbers…" value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>
    </section>
  );
}

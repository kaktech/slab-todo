import { useLocalStorage } from "../../lib/useLocalStorage";

export function RememberPanel() {
  const [text, setText] = useLocalStorage<string>("slab.remember", "");
  return (
    <section className="block remember" aria-label="Remember">
      <h2 className="block-title"><span>Remember</span><span aria-hidden="true">!</span></h2>
      <div className="block-body">
        <label className="sr-only" htmlFor="remember">Reminder</label>
        <textarea id="remember" className="field" rows={2} maxLength={160} placeholder="The one thing you can't forget." value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    </section>
  );
}

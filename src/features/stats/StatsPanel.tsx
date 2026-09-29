import type { Task } from "../../types";
import { completionPercent, currentStreak, weeklyCounts } from "./stats";

export function StatsPanel({ tasks }: { tasks: Task[] }) {
  const pct = completionPercent(tasks);
  const streak = currentStreak(tasks);
  const week = weeklyCounts(tasks);
  const max = Math.max(1, ...week.map((d) => d.count));

  return (
    <section className="block" aria-label="Progress">
      <h2 className="block-title"><span>Progress</span><span>7 days</span></h2>
      <div className="block-body stats">
        <div className="stat-row">
          <div>
            <div className="stat-num">{pct}<small>%</small></div>
            <div className="lbl">Complete</div>
          </div>
          <div>
            <div className="stat-num">{streak}<small>d</small></div>
            <div className="lbl">Streak</div>
          </div>
        </div>
        <div className="bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Tasks complete">
          <div className="bar-fill" style={{ width: `${pct}%` }} />
        </div>
        <ol className="week" aria-label="Tasks completed per day, last 7 days">
          {week.map((d) => (
            <li key={d.key} title={`${d.key}: ${d.count}`}>
              <span className="week-count">{d.count}</span>
              <span className="week-bar" style={{ height: `${Math.max(4, (d.count / max) * 56)}px` }} />
              <span className="lbl">{d.label}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

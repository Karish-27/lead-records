'use client';

export default function StatsRow({ total, created, progress, notstarted }) {
  return (
    <div className="stats-row">
      <div className="stat-card">
        <div className="stat-label">Total Platforms</div>
        <div className="stat-value">{total}</div>
        <div className="stat-sub">being tracked</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Profiles Created</div>
        <div className="stat-value" style={{ color: 'var(--green)' }}>{created}</div>
        <div className="stat-sub">fully set up</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">In Progress</div>
        <div className="stat-value" style={{ color: 'var(--amber)' }}>{progress}</div>
        <div className="stat-sub">being worked on</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Not Started</div>
        <div className="stat-value" style={{ color: 'var(--slate)' }}>{notstarted}</div>
        <div className="stat-sub">pending setup</div>
      </div>
    </div>
  );
}

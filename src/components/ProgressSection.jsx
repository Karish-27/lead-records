'use client';

export default function ProgressSection({ total, created, progress, notstarted }) {
  const pct = total ? Math.round(created / total * 100) : 0;

  return (
    <div className="progress-section">
      <div className="progress-header">
        <span className="progress-label">Overall Completion</span>
        <span className="progress-pct">{pct}%</span>
      </div>
      <div className="progress-bar-wrap">
        <div className="progress-bar-fill" style={{ width: `${pct}%` }}></div>
      </div>
      <div className="progress-segments">
        <div className="seg">
          <div className="seg-dot" style={{ background: 'var(--green)' }}></div>
          <span>{created} Created</span>
        </div>
        <div className="seg">
          <div className="seg-dot" style={{ background: 'var(--amber)' }}></div>
          <span>{progress} In Progress</span>
        </div>
        <div className="seg">
          <div className="seg-dot" style={{ background: '#CBD5E1' }}></div>
          <span>{notstarted} Not Started</span>
        </div>
      </div>
    </div>
  );
}

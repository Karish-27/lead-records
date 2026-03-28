'use client';

export default function Sidebar({ totalCount }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-name">Presence Tracker</div>
        <div className="brand-sub">v1.0 · 2 members</div>
      </div>
      <div className="nav-label">Navigation</div>
      <div className="nav-item active">
        <svg className="nav-icon" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.6">
          <rect x="1" y="1" width="6" height="6" rx="1.5"/>
          <rect x="9" y="1" width="6" height="6" rx="1.5"/>
          <rect x="1" y="9" width="6" height="6" rx="1.5"/>
          <rect x="9" y="9" width="6" height="6" rx="1.5"/>
        </svg>
        Dashboard
        <span className="count-badge">{totalCount}</span>
      </div>
      <div className="sidebar-footer">
        <div className="nav-label">Team</div>
        <div className="team-members">
          <div className="member">
            <div className="member-dot dot-designer">KP</div>
            <div>
              <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>Krutik</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Designer</div>
            </div>
          </div>
          <div className="member">
            <div className="member-dot dot-developer">Dev</div>
            <div>
              <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>Karishma</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Developer</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

'use client';

import { getIcon } from '@/lib/icons';
import StatusBadge from './StatusBadge';
import AssigneeCell from './AssigneeCell';

export default function PlatformRow({ platform, visible, onClick, onContextMenu }) {
  const icon = getIcon(platform.name);

  let urlHTML;
  if (platform.url) {
    try {
      const hostname = new URL(platform.url).hostname;
      urlHTML = (
        <div className="platform-link">
          <a href={platform.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
            {hostname}
          </a>
        </div>
      );
    } catch {
      urlHTML = <div className="platform-link" style={{ opacity: 0.3 }}>no url</div>;
    }
  } else {
    urlHTML = <div className="platform-link" style={{ opacity: 0.3 }}>no url</div>;
  }

  return (
    <div
      className={`platform-row${visible ? '' : ' hidden'}`}
      onClick={() => onClick(platform.id)}
      onContextMenu={e => onContextMenu(e, platform.id)}
    >
      <div className="platform-info">
        <div className="platform-icon" style={{ background: icon.bg, color: icon.color }}>
          {icon.label}
        </div>
        <div>
          <div className="platform-name">{platform.name}</div>
          {urlHTML}
        </div>
      </div>
      <div>
        <StatusBadge status={platform.status} />
      </div>
      <div className="date-cell col-date">
        {platform.date ? platform.date.slice(5).replace('-', '/') : ''}
      </div>
      <div>
        <AssigneeCell assignee={platform.assignee} />
      </div>
      <div className="notes-cell col-notes">
        {platform.notes || <span style={{ opacity: 0.3 }}>None</span>}
      </div>
      <button
        className="row-action"
        onClick={e => { e.stopPropagation(); onContextMenu(e, platform.id); }}
      >
        <svg width="14" height="14" fill="currentColor" viewBox="0 0 4 16">
          <circle cx="2" cy="2" r="1.5"/>
          <circle cx="2" cy="8" r="1.5"/>
          <circle cx="2" cy="14" r="1.5"/>
        </svg>
      </button>
    </div>
  );
}

'use client';

import PlatformRow from './PlatformRow';

export default function PlatformTable({ platforms, matchFn, onRowClick, onContextMenu }) {
  const visibleCount = platforms.filter(matchFn).length;

  return (
    <div className="table-wrap">
      <div className="table-head">
        <div>Platform</div>
        <div>Status</div>
        <div className="col-date">Last Updated</div>
        <div>Assignee</div>
        <div className="col-notes">Notes</div>
        <div></div>
      </div>
      <div>
        {platforms.map(p => (
          <PlatformRow
            key={p.id}
            platform={p}
            visible={matchFn(p)}
            onClick={onRowClick}
            onContextMenu={onContextMenu}
          />
        ))}
      </div>
      {visibleCount === 0 && (
        <div className="empty-state">No platforms match your filter.</div>
      )}
    </div>
  );
}

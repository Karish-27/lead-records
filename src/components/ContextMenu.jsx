'use client';

export default function ContextMenu({ isOpen, position, onEdit, onStatusChange, onDelete }) {
  return (
    <div
      className={`ctx-menu${isOpen ? ' open' : ''}`}
      style={{ left: position.x, top: position.y }}
    >
      <div className="ctx-item" onClick={onEdit}>
        <svg width="13" height="13" fill="none" viewBox="0 0 13 13" stroke="currentColor" strokeWidth="1.7">
          <path d="M9 2l2 2L4 11H2V9L9 2z"/>
        </svg>
        Edit
      </div>
      <div className="ctx-item" onClick={() => onStatusChange('created')}>
        <svg width="13" height="13" fill="none" viewBox="0 0 13 13" stroke="currentColor" strokeWidth="1.7">
          <polyline points="2,7 5,10 11,3"/>
        </svg>
        Mark as Created
      </div>
      <div className="ctx-item" onClick={() => onStatusChange('progress')}>
        <svg width="13" height="13" fill="none" viewBox="0 0 13 13" stroke="currentColor" strokeWidth="1.7">
          <circle cx="6.5" cy="6.5" r="5.5"/><polyline points="6.5,3.5 6.5,6.5 8.5,8"/>
        </svg>
        Mark In Progress
      </div>
      <div className="ctx-item" onClick={() => onStatusChange('notstarted')}>
        <svg width="13" height="13" fill="none" viewBox="0 0 13 13" stroke="currentColor" strokeWidth="1.7">
          <circle cx="6.5" cy="6.5" r="5.5"/>
        </svg>
        Mark Not Started
      </div>
      <div className="ctx-divider"></div>
      <div className="ctx-item danger" onClick={onDelete}>
        <svg width="13" height="13" fill="none" viewBox="0 0 13 13" stroke="currentColor" strokeWidth="1.7">
          <polyline points="1,3 12,3"/><path d="M5,3V1h3v2"/><path d="M2,3l1,9h7l1-9"/>
        </svg>
        Delete
      </div>
    </div>
  );
}

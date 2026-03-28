'use client';

export default function AssigneeCell({ assignee }) {
  if (assignee === 'Both') {
    return (
      <div className="assignee-cell">
        <div className="assignee-avatar dot-designer" style={{ width: 20, height: 20, fontSize: '8px' }}>K</div>
        <div className="assignee-avatar dot-developer" style={{ width: 20, height: 20, fontSize: '8px', marginLeft: '-6px' }}>D</div>
        <span>Both</span>
      </div>
    );
  }

  const isK = assignee === 'Krutik';
  return (
    <div className="assignee-cell">
      <div
        className={`assignee-avatar ${isK ? 'dot-designer' : 'dot-developer'}`}
        style={{ width: 20, height: 20, fontSize: '8px' }}
      >
        {isK ? 'K' : 'D'}
      </div>
      <span>{assignee}</span>
    </div>
  );
}

'use client';

const STATUS_MAP = {
  created:    { cls: 'badge-created',    label: 'Profile Created' },
  progress:   { cls: 'badge-progress',   label: 'In Progress' },
  notstarted: { cls: 'badge-notstarted', label: 'Not Started' },
};

export default function StatusBadge({ status }) {
  const { cls, label } = STATUS_MAP[status] || STATUS_MAP.notstarted;
  return (
    <span className={`badge ${cls}`}>
      <span className="badge-dot"></span>
      {label}
    </span>
  );
}

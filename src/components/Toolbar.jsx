'use client';

export default function Toolbar({ activeFilter, activeMember, sortValue, onFilterChange, onMemberFilterChange, onSortChange, onSearch }) {
  const statusFilters = [
    { value: 'all', label: 'All' },
    { value: 'created', label: 'Profile Created' },
    { value: 'progress', label: 'In Progress' },
    { value: 'notstarted', label: 'Not Started' },
  ];

  const memberFilters = [
    { value: 'all', label: 'All Members' },
    { value: 'Krutik', label: 'Krutik' },
    { value: 'Karishma', label: 'Karishma' },
  ];

  return (
    <div className="toolbar">
      <div className="filter-group">
        {statusFilters.map(f => (
          <button
            key={f.value}
            className={`filter-btn${activeFilter === f.value ? ' active' : ''}`}
            onClick={() => onFilterChange(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="filter-group">
        {memberFilters.map(f => (
          <button
            key={f.value}
            className={`filter-btn${activeMember === f.value ? ' active' : ''}`}
            onClick={() => onMemberFilterChange(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <select className="sort-select" value={sortValue} onChange={e => onSortChange(e.target.value)}>
        <option value="name">Sort: Name</option>
        <option value="status">Sort: Status</option>
        <option value="date">Sort: Last Updated</option>
        <option value="assignee">Sort: Assignee</option>
      </select>
      <div className="search-wrap">
        <svg className="search-icon" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.8">
          <circle cx="5.5" cy="5.5" r="4"/><line x1="9" y1="9" x2="13" y2="13"/>
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Search platforms..."
          onChange={e => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
}

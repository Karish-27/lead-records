export const ICONS = {
  LinkedIn:  { bg: '#DBEAFE', color: '#1D4ED8', label: 'in' },
  Upwork:    { bg: '#D1FAE5', color: '#065F46', label: 'up' },
  Clutch:    { bg: '#FEE2E2', color: '#B91C1C', label: 'cl' },
  Apollo:    { bg: '#EDE9FE', color: '#6D28D9', label: 'ap' },
  Contra:    { bg: '#FEF3C7', color: '#92400E', label: 'co' },
  Dribbble:  { bg: '#FCE7F3', color: '#9D174D', label: 'dr' },
  Behance:   { bg: '#DBEAFE', color: '#1E40AF', label: 'be' },
  Wellfound: { bg: '#D1FAE5', color: '#065F46', label: 'wf' },
  Twine:     { bg: '#EDE9FE', color: '#5B21B6', label: 'tw' },
  Toptal:    { bg: '#ECFDF5', color: '#047857', label: 'tp' },
};

export function getIcon(name) {
  return ICONS[name] || { bg: '#F1F5F9', color: '#475569', label: name.slice(0, 2).toLowerCase() };
}

'use client';

import { useState, useEffect, useRef } from 'react';

export default function PlatformModal({ isOpen, editingPlatform, onClose, onSave, onRequestDelete }) {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('notstarted');
  const [assignee, setAssignee] = useState('Krutik');
  const [url, setUrl] = useState('');
  const [notes, setNotes] = useState('');
  const nameRef = useRef(null);

  const isEditing = !!editingPlatform;

  useEffect(() => {
    if (isOpen && editingPlatform) {
      setName(editingPlatform.name);
      setStatus(editingPlatform.status);
      setAssignee(editingPlatform.assignee);
      setUrl(editingPlatform.url || '');
      setNotes(editingPlatform.notes || '');
    } else if (isOpen) {
      setName('');
      setStatus('notstarted');
      setAssignee('Krutik');
      setUrl('');
      setNotes('');
      setTimeout(() => nameRef.current?.focus(), 60);
    }
  }, [isOpen, editingPlatform]);

  const handleSave = () => {
    if (!name.trim()) {
      nameRef.current?.focus();
      return;
    }
    onSave({
      id: editingPlatform?.id,
      name: name.trim(),
      status,
      assignee,
      url: url.trim(),
      notes: notes.trim(),
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={`modal-overlay${isOpen ? ' open' : ''}`} onClick={handleOverlayClick}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">{isEditing ? 'Edit Platform' : 'Add Platform'}</div>
          <button className="modal-close" onClick={onClose}>
            <svg width="11" height="11" fill="none" viewBox="0 0 11 11" stroke="currentColor" strokeWidth="2">
              <line x1="1" y1="1" x2="10" y2="10"/><line x1="10" y1="1" x2="1" y2="10"/>
            </svg>
          </button>
        </div>
        <div className="form-row">
          <label>Platform Name</label>
          <input
            ref={nameRef}
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. LinkedIn, Clutch, Upwork"
          />
        </div>
        <div className="form-grid-2">
          <div className="form-row">
            <label>Status</label>
            <select value={status} onChange={e => setStatus(e.target.value)}>
              <option value="notstarted">Not Started</option>
              <option value="progress">In Progress</option>
              <option value="created">Profile Created</option>
            </select>
          </div>
          <div className="form-row">
            <label>Assigned To</label>
            <select value={assignee} onChange={e => setAssignee(e.target.value)}>
              <option value="Krutik">Krutik (Designer)</option>
              <option value="Karishma">Karishma (Developer)</option>
              <option value="Both">Both</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <label>Profile URL (optional)</label>
          <input
            type="url"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://..."
          />
        </div>
        <div className="form-row">
          <label>Notes (optional)</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Any context, reminders, or action items..."
          />
        </div>
        <div className="modal-actions">
          <div style={{ display: isEditing ? 'block' : 'none' }}>
            <button className="btn btn-danger" onClick={() => onRequestDelete(editingPlatform?.id)}>
              <svg width="13" height="13" fill="none" viewBox="0 0 13 13" stroke="currentColor" strokeWidth="1.7">
                <polyline points="1,3 12,3"/><path d="M5,3V1h3v2"/><path d="M2,3l1,9h7l1-9"/>
              </svg>
              Delete
            </button>
          </div>
          <div className="modal-actions-right">
            <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSave}>Save Platform</button>
          </div>
        </div>
      </div>
    </div>
  );
}

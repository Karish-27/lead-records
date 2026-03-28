'use client';

export default function ConfirmDialog({ isOpen, platformName, onClose, onConfirm }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={`confirm-overlay${isOpen ? ' open' : ''}`} onClick={handleOverlayClick}>
      <div className="confirm-box">
        <div className="confirm-title">Delete platform?</div>
        <div className="confirm-body">
          {platformName
            ? `"${platformName}" will be permanently removed from your tracker.`
            : 'This will permanently remove the platform from your tracker.'}
        </div>
        <div className="confirm-actions">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-danger" onClick={onConfirm}>Yes, delete</button>
        </div>
      </div>
    </div>
  );
}

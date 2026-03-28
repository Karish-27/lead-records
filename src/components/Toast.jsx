'use client';

export default function Toast({ message, isVisible }) {
  return (
    <div className={`toast${isVisible ? ' show' : ''}`}>
      {message}
    </div>
  );
}

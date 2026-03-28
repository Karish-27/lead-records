'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Sidebar from '@/components/Sidebar';
import StatsRow from '@/components/StatsRow';
import ProgressSection from '@/components/ProgressSection';
import Toolbar from '@/components/Toolbar';
import PlatformTable from '@/components/PlatformTable';
import PlatformModal from '@/components/PlatformModal';
import ConfirmDialog from '@/components/ConfirmDialog';
import ContextMenu from '@/components/ContextMenu';
import Toast from '@/components/Toast';

export default function Home() {
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter / sort state
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeMember, setActiveMember] = useState('all');
  const [searchQ, setSearchQ] = useState('');
  const [sortValue, setSortValue] = useState('name');

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPlatform, setEditingPlatform] = useState(null);

  // Confirm delete state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  // Context menu state
  const [ctxOpen, setCtxOpen] = useState(false);
  const [ctxPosition, setCtxPosition] = useState({ x: 0, y: 0 });
  const [ctxId, setCtxId] = useState(null);

  // Toast state
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef(null);

  // Fetch platforms
  const fetchPlatforms = useCallback(async () => {
    const res = await fetch('/api/platforms');
    const data = await res.json();
    setPlatforms(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPlatforms();
  }, [fetchPlatforms]);

  // Toast helper
  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setToastVisible(true);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 2400);
  }, []);

  // Today helper
  const today = () => new Date().toISOString().slice(0, 10);

  // Matching function for filters
  const matchFn = useCallback((p) => {
    if (activeFilter !== 'all' && p.status !== activeFilter) return false;
    if (activeMember !== 'all' && p.assignee !== activeMember && p.assignee !== 'Both') return false;
    if (searchQ && !p.name.toLowerCase().includes(searchQ.toLowerCase())) return false;
    return true;
  }, [activeFilter, activeMember, searchQ]);

  // Sorting
  const getSorted = useCallback(() => {
    const c = [...platforms];
    const so = { created: 0, progress: 1, notstarted: 2 };
    if (sortValue === 'name') c.sort((a, b) => a.name.localeCompare(b.name));
    if (sortValue === 'status') c.sort((a, b) => so[a.status] - so[b.status]);
    if (sortValue === 'date') c.sort((a, b) => b.date.localeCompare(a.date));
    if (sortValue === 'assignee') c.sort((a, b) => a.assignee.localeCompare(b.assignee));
    return c;
  }, [platforms, sortValue]);

  // Stats
  const total = platforms.length;
  const created = platforms.filter(p => p.status === 'created').length;
  const progress = platforms.filter(p => p.status === 'progress').length;
  const notstarted = platforms.filter(p => p.status === 'notstarted').length;

  // Add / Edit modal
  const openAddModal = () => {
    setEditingPlatform(null);
    setModalOpen(true);
  };

  const openEditModal = (id) => {
    const p = platforms.find(x => x.id === id);
    if (p) {
      setEditingPlatform(p);
      setModalOpen(true);
    }
  };

  const closeModal = () => setModalOpen(false);

  const handleSave = async (data) => {
    if (data.id) {
      // Update
      await fetch(`/api/platforms/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, date: today() }),
      });
      showToast('Platform updated');
    } else {
      // Create
      await fetch('/api/platforms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, date: today() }),
      });
      showToast('Platform added');
    }
    closeModal();
    fetchPlatforms();
  };

  // Delete flow
  const requestDelete = (id) => {
    closeModal();
    setPendingDeleteId(id);
    setConfirmOpen(true);
  };

  const closeConfirm = () => {
    setPendingDeleteId(null);
    setConfirmOpen(false);
  };

  const executeDelete = async () => {
    if (pendingDeleteId === null) return;
    await fetch(`/api/platforms/${pendingDeleteId}`, { method: 'DELETE' });
    closeConfirm();
    fetchPlatforms();
    showToast('Platform deleted');
  };

  // Context menu
  const openCtx = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setCtxId(id);
    setCtxPosition({
      x: Math.min(e.clientX, window.innerWidth - 190),
      y: Math.min(e.clientY, window.innerHeight - 185),
    });
    setCtxOpen(true);
  };

  const closeCtx = () => setCtxOpen(false);

  const handleCtxEdit = () => {
    const id = ctxId;
    closeCtx();
    openEditModal(id);
  };

  const handleCtxStatusChange = async (status) => {
    const id = ctxId;
    closeCtx();
    const p = platforms.find(x => x.id === id);
    if (!p) return;
    await fetch(`/api/platforms/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...p, status, date: today() }),
    });
    const labels = { created: 'Marked as Profile Created', progress: 'Marked as In Progress', notstarted: 'Marked as Not Started' };
    showToast(labels[status]);
    fetchPlatforms();
  };

  const handleCtxDelete = () => {
    const id = ctxId;
    closeCtx();
    requestDelete(id);
  };

  // Global click handler to close context menu
  useEffect(() => {
    const handler = (e) => {
      const menu = document.querySelector('.ctx-menu');
      if (menu && !menu.contains(e.target)) {
        closeCtx();
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  // Escape key handler
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        closeCtx();
        closeConfirm();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const deletingPlatform = pendingDeleteId ? platforms.find(p => p.id === pendingDeleteId) : null;

  if (loading) return null;

  return (
    <div className="app">
      <Sidebar totalCount={total} />
      <main className="main">
        <div className="page-header">
          <div>
            <h1 className="page-title">Platform Presence</h1>
            <p className="page-subtitle">Track and manage your team&apos;s profile setup across platforms</p>
          </div>
          <button className="btn btn-primary" onClick={openAddModal}>
            <svg width="14" height="14" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2">
              <line x1="7" y1="2" x2="7" y2="12"/><line x1="2" y1="7" x2="12" y2="7"/>
            </svg>
            Add Platform
          </button>
        </div>

        <StatsRow total={total} created={created} progress={progress} notstarted={notstarted} />
        <ProgressSection total={total} created={created} progress={progress} notstarted={notstarted} />

        <Toolbar
          activeFilter={activeFilter}
          activeMember={activeMember}
          sortValue={sortValue}
          onFilterChange={setActiveFilter}
          onMemberFilterChange={setActiveMember}
          onSortChange={setSortValue}
          onSearch={setSearchQ}
        />

        <PlatformTable
          platforms={getSorted()}
          matchFn={matchFn}
          onRowClick={openEditModal}
          onContextMenu={openCtx}
        />
      </main>

      <PlatformModal
        isOpen={modalOpen}
        editingPlatform={editingPlatform}
        onClose={closeModal}
        onSave={handleSave}
        onRequestDelete={requestDelete}
      />

      <ConfirmDialog
        isOpen={confirmOpen}
        platformName={deletingPlatform?.name}
        onClose={closeConfirm}
        onConfirm={executeDelete}
      />

      <ContextMenu
        isOpen={ctxOpen}
        position={ctxPosition}
        onEdit={handleCtxEdit}
        onStatusChange={handleCtxStatusChange}
        onDelete={handleCtxDelete}
      />

      <Toast message={toastMessage} isVisible={toastVisible} />
    </div>
  );
}

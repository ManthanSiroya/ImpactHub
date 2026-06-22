import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, RefreshCw } from 'lucide-react';
import { PendingActionCard } from '../components/cards/PendingActionCard';
import { LocalDataCard } from '../components/cards/LocalDataCard';
import { mockOfflineStats, mockLocalDataCards, PENDING_ACTIONS } from '../data/mockData';
import type { QueuedAction, ActionStatus, ConnectionState, LogEntry, PendingActionViewModel } from '../types/ui.types';

const initialLog: LogEntry[] = [
  { time: '10:23:05', message: 'GET /api/volunteers — 200 OK (245ms)', type: 'success' },
  { time: '10:23:12', message: 'POST /api/reports — 201 Created (180ms)', type: 'success' },
  { time: '10:24:01', message: 'SYNC — Connection lost, queuing changes', type: 'error' },
  { time: '10:24:45', message: 'SYNC — 3 changes queued for later sync', type: 'info' },
  { time: '10:25:10', message: 'GET /api/needs — ERROR: Network unreachable', type: 'error' },
  { time: '10:26:22', message: 'SYNC — Reconnected, syncing queued changes', type: 'success' },
  { time: '10:26:30', message: 'SYNC — 3/3 changes synced successfully', type: 'success' },
];

export const OfflineFieldApp: React.FC = () => {
  const [offlineMode, setOfflineMode] = useState(false);
  const [connectionState, setConnectionState] = useState<ConnectionState>('online');
  const [actions, setActions] = useState<QueuedAction[]>(PENDING_ACTIONS);
  const [expandedConflict, setExpandedConflict] = useState<number | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>(initialLog);
  const [toast, setToast] = useState<string | null>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const syncStatus = connectionState === 'offline' ? 'offline' : isSyncing ? 'syncing' : 'synced';

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
    if (connectionState === 'offline') {
      setOfflineMode(true);
    }
  }, [connectionState]);

  const handleConnectionChange = (state: ConnectionState) => {
    setConnectionState(state);
    setToast(`Switched to ${state}`);
    setTimeout(() => setToast(null), 3000);

    const now = new Date().toTimeString().slice(0, 8);
    const messages: Record<ConnectionState, string> = {
      online: 'Network connection restored — full sync mode',
      slow: 'Network degraded — switching to slow 3G mode',
      offline: 'Network unreachable — entering offline mode',
    };
    setLogs(prev => [...prev, { time: now, message: messages[state], type: state === 'offline' ? 'error' : 'info' }]);
  };

  const syncAll = () => {
    if (connectionState === 'offline') return;
    setIsSyncing(true);
    const queued = actions.filter(a => a.status === 'queued');
    let delay = 0;
    queued.forEach(action => {
      setTimeout(() => {
        setActions(prev => prev.map(a => a.id === action.id ? { ...a, status: 'syncing' as ActionStatus } : a));
        setTimeout(() => {
          setActions(prev => prev.map(a => a.id === action.id ? { ...a, status: 'synced' as ActionStatus } : a));
        }, 500);
      }, delay);
      delay += 600;
    });
    setTimeout(() => setIsSyncing(false), delay + 300);
  };

  const resolveConflict = (id: number, useMine: boolean) => {
    setActions(prev => prev.map(a => a.id === id ? { ...a, status: 'synced' as ActionStatus } : a));
    setExpandedConflict(null);
    const now = new Date().toTimeString().slice(0, 8);
    setLogs(prev => [...prev, { time: now, message: `CONFLICT — Resolved (${useMine ? 'local' : 'server'} version kept)`, type: 'success' }]);
  };

  const offlineStats = mockOfflineStats;
  const localDataCards = mockLocalDataCards;

  const mappedPendingActions: PendingActionViewModel[] = actions.map(a => ({
    id: a.id,
    title: a.title,
    desc: a.detail,
    time: a.time,
    status: a.status === 'queued' ? 'Queued' : a.status === 'syncing' ? 'Syncing' : a.status === 'synced' ? 'Synced' : 'Conflict',
    icon: a.type === 'create' ? 'fa-solid fa-plus' : a.type === 'update' ? 'fa-solid fa-pen' : 'fa-solid fa-trash-can',
    statusIcon: a.status === 'syncing' ? 'fa-solid fa-rotate' : a.status === 'synced' ? 'fa-solid fa-check' : a.status === 'conflict' ? 'fa-solid fa-triangle-exclamation' : undefined,
    actionLink: a.status === 'conflict' && expandedConflict !== a.id ? 'Resolve conflict \u2192' : undefined,
  }));

  const mappedLogs = logs.map((log, idx) => ({
    id: `log-${idx}`,
    time: `[${log.time}]`,
    message: log.message,
    typeClass: log.type === 'success' ? 'green' : log.type === 'error' ? 'red' : 'yellow',
  }));

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="dashboard-content" style={{ maxWidth: '900px', margin: '0 auto' }}
    >
      {/* Offline Mode Header */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 className="serif-title">Offline mode</h3>
            <p className="text-muted" style={{ fontSize: '13px' }}>Work without internet. Data syncs automatically when connection is restored.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
              {syncStatus === 'synced' && <><span className="status-dot green"></span> All changes synced</>}
              {syncStatus === 'syncing' && <><i className="fa-solid fa-rotate fa-spin text-sage"></i> Syncing...</>}
              {syncStatus === 'offline' && <><i className="fa-solid fa-wifi-slash"></i> Offline</>}
            </div>
            <div className={`toggle-switch ${offlineMode ? 'active' : ''}`} onClick={() => setOfflineMode(!offlineMode)} style={{ cursor: 'pointer' }}>
              <div className="toggle-knob"></div>
            </div>
          </div>
        </div>

        {/* Offline Banner */}
        <AnimatePresence>
          {offlineMode && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                backgroundColor: '#fef5e7',
                padding: '12px 16px',
                marginTop: '16px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <WifiOff size={16} style={{ color: '#D97706', flexShrink: 0 }} />
                <span style={{ fontSize: '13px', color: '#1f2937' }}>
                  You're working offline. All changes are saved locally and will sync when you reconnect.
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <span style={{ fontSize: '12px', color: '#4b5563' }} className="hidden sm:inline">
                  {actions.filter(a => a.status === 'queued').length} queued &middot; 340KB stored
                </span>
                <button
                  onClick={syncAll}
                  disabled={connectionState === 'offline' || isSyncing}
                  style={{
                    fontSize: '13px',
                    color: '#2D5A4C',
                    fontWeight: 500,
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: connectionState === 'offline' || isSyncing ? 'not-allowed' : 'pointer',
                    opacity: connectionState === 'offline' || isSyncing ? 0.5 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: 0
                  }}
                >
                  {isSyncing ? <RefreshCw size={12} className="animate-spin-slow" /> : 'Force sync'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Stats */}
      <div className="offline-stats">
        {offlineStats.map((stat, i) => (
          <motion.div 
            key={stat.id} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="card stat-card text-center"
          >
            <div className="stat-icon-small"><i className={stat.icon}></i></div>
            <h3 className="serif-value">
              {stat.label === 'CHANGES QUEUED' ? actions.filter(a => a.status === 'queued').length : stat.value}
            </h3>
            <p className="stat-label">{stat.label}</p>
            {stat.hasProgressBar && (
              <div className="progress-bar-thin mt-3">
                <div className="progress-fill" style={{ width: `${stat.progressPercent}%` }}></div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Pending Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card" style={{ marginBottom: '24px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h3 className="serif-title">Pending actions</h3>
            <p className="text-muted" style={{ fontSize: '13px' }}>These changes will sync automatically when you're back online</p>
          </div>
          <button 
            className="btn-primary-dark" 
            style={{ width: 'auto', padding: '10px 20px', borderRadius: '20px', opacity: isSyncing || connectionState === 'offline' ? 0.5 : 1 }} 
            onClick={syncAll}
            disabled={connectionState === 'offline' || isSyncing}
          >
            {isSyncing ? 'Syncing...' : 'Sync all'}
          </button>
        </div>

        <div className="action-list">
          {mappedPendingActions.map((action, i) => (
            <motion.div 
              key={action.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
            >
              <PendingActionCard action={action} onActionClick={() => setExpandedConflict(action.id as number)} />
              <AnimatePresence>
                {action.status === 'Conflict' && expandedConflict === action.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ marginLeft: '48px', marginRight: '16px', marginBottom: '16px', padding: '16px', backgroundColor: '#FCF5F5', borderRadius: '12px' }}>
                      <p style={{ fontSize: '13px', color: '#C45B5B', marginBottom: '12px' }}>Server has a newer version of this data.</p>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button onClick={() => resolveConflict(action.id as number, true)} style={{ padding: '6px 16px', backgroundColor: 'transparent', border: '1px solid #D1D5DB', borderRadius: '9999px', color: '#034A60', fontSize: '13px', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#F3F4F6'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>Use my version</button>
                        <button onClick={() => resolveConflict(action.id as number, false)} style={{ padding: '6px 16px', backgroundColor: '#2D5A4C', border: 'none', borderRadius: '9999px', color: '#FFFFFF', fontSize: '13px', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#214238'} onMouseOut={e => e.currentTarget.style.backgroundColor = '#2D5A4C'}>Use server version</button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Locally stored data */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card" style={{ marginBottom: '24px' }}
      >
        <div style={{ marginBottom: '20px' }}>
          <h3 className="serif-title">Locally stored data</h3>
          <p className="text-muted" style={{ fontSize: '13px' }}>Content available while offline</p>
        </div>
        <div className="local-data-grid">
          {localDataCards.map(card => (
            <LocalDataCard key={card.id} card={card} />
          ))}
        </div>
        <div className="storage-info mt-4">
          <p className="text-muted" style={{ fontSize: '12px', marginBottom: '8px' }}>Storage used: 340 KB of 1 MB</p>
          <div className="progress-bar-thin">
            <div className="progress-fill" style={{ width: '34%' }}></div>
          </div>
        </div>
      </motion.div>

      {/* Connection Simulator */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card"
      >
        <div style={{ marginBottom: '20px' }}>
          <h3 className="serif-title">Connection simulator</h3>
          <p className="text-muted" style={{ fontSize: '13px' }}>Test how the app behaves under different network conditions</p>
        </div>
        <div className="simulator-controls">
          <button className={`sim-btn ${connectionState === 'online' ? 'active' : ''}`} onClick={() => handleConnectionChange('online')}><i className="fa-solid fa-wifi"></i> Online</button>
          <button className={`sim-btn ${connectionState === 'slow' ? 'active' : ''}`} onClick={() => handleConnectionChange('slow')}><i className="fa-solid fa-rotate"></i> Slow 3G</button>
          <button className={`sim-btn ${connectionState === 'offline' ? 'active' : ''}`} onClick={() => handleConnectionChange('offline')}><i className="fa-solid fa-plane-slash"></i> Offline</button>
        </div>
        <div className="terminal-window mt-4 custom-scrollbar" style={{ height: '200px', overflowY: 'auto', display: 'block' }} ref={logRef}>
          <AnimatePresence initial={false}>
            {mappedLogs.map((log) => (
              <motion.div 
                key={log.id} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`term-line ${log.typeClass}`}
              >
                {log.time} {log.message}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
      
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 10, x: '-50%' }}
            style={{ position: 'fixed', bottom: '80px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#1A1A1A', color: '#F0EDE6', padding: '8px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px', zIndex: 2000 }}
          >
            {connectionState === 'offline' ? <i className="fa-solid fa-wifi-slash"></i> : <i className="fa-solid fa-wifi"></i>}
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  mockFieldReports,
  mockUsers,
  mockLocations,
  mockPipelineStats
} from '../data/mockData';
import { PipelineReportCard } from '../components/cards/PipelineReportCard';
import type { FieldReport } from '../types';

export const DataPipeline: React.FC = () => {
  const [reports, setReports] = useState<FieldReport[]>(mockFieldReports);
  const [activeFilter, setActiveFilter] = useState('all');
  const [newReportId, setNewReportId] = useState<string | number | null>(null);

  // Simulate incoming reports
  useEffect(() => {
    const interval = setInterval(() => {
      setReports(prev => {
        const randomReport = mockFieldReports[Math.floor(Math.random() * mockFieldReports.length)];
        const newReport = { ...randomReport, id: Date.now(), time: 'Just now', status: 'processing' as const };
        const next = [newReport, ...prev].slice(0, 20);
        setNewReportId(newReport.id);
        setTimeout(() => setNewReportId(null), 500);
        return next;
      });
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  // Simulate status transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setReports(prev => prev.map(r => {
        if (r.status === 'processing' && Math.random() > 0.5) {
          return { ...r, status: 'processed' as const };
        }
        return r;
      }));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const filtered = activeFilter === 'all'
    ? reports
    : reports.filter(r => r.category.toLowerCase() === activeFilter);

  const filterTabs = [
    { id: 'all', category: 'all' },
    { id: 'medical', category: 'Medical' },
    { id: 'food', category: 'Food' },
    { id: 'education', category: 'Education' },
    { id: 'infrastructure', category: 'Infrastructure' },
  ];

  const counts: Record<string, number> = { all: reports.length };
  filterTabs.slice(1).forEach(t => {
    counts[t.id] = reports.filter(r => r.category === t.category).length;
  });

  const processing = reports.filter(r => r.status === 'processing').length;
  const processed = reports.filter(r => r.status === 'processed').length;
  const flagged = reports.filter(r => r.status === 'flagged').length;

  const pipelineStats = mockPipelineStats.map(stat => {
    let value = 0;
    if (stat.type === 'reports') {
      value = reports.length;
    } else if (stat.type === 'processed') {
      value = processed;
    } else if (stat.type === 'pending') {
      value = processing;
    } else if (stat.type === 'flagged') {
      value = flagged;
    }
    return {
      ...stat,
      value
    };
  });

  const tabsConfig = [
    { id: 'all', name: 'All', icon: 'fa-solid fa-layer-group' },
    { id: 'medical', name: 'Medical', icon: 'fa-solid fa-truck-medical' },
    { id: 'food', name: 'Food', icon: 'fa-solid fa-bowl-food' },
    { id: 'education', name: 'Education', icon: 'fa-solid fa-book-open' },
    { id: 'infrastructure', name: 'Infrastructure', icon: 'fa-solid fa-helmet-safety' }
  ] as const;

  const pipelineTabs = tabsConfig.map(tab => {
    return {
      ...tab,
      count: counts[tab.id] || 0,
      active: activeFilter === tab.id
    };
  });

  return (
    <div className="dashboard-content">
      <motion.div 
        className="pipeline-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] as const }}
      >
        <h2 className="pipeline-title">Unified Data Pipeline</h2>
        <p className="pipeline-subtitle">Real-time field reports streaming from volunteers across the service area. Data is processed, categorized, and routed to the appropriate response teams.</p>

        <div className="pipeline-stats">
          {pipelineStats.map((stat, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              key={stat.id}
              className={`pipeline-stat-card ${stat.type === 'flagged'
                  ? 'border-red'
                  : ''
                }`}
            >
              <div
                className={`stat-icon ${stat.type === 'processed'
                    ? 'bg-green-light'
                    : stat.type === 'pending'
                      ? 'bg-yellow-light'
                      : stat.type === 'flagged'
                        ? 'bg-red-light'
                        : 'bg-gray-light'
                  }`}
              >
                <i
                  className={stat.icon}
                  style={{
                    color:
                      stat.type === 'flagged'
                        ? '#ef4444'
                        : undefined
                  }}
                ></i>
              </div>
              <div className="stat-info">
                <h3
                  className={
                    stat.type === 'flagged'
                      ? 'text-red'
                      : ''
                  }
                >
                  {stat.value}
                </h3>

                <p
                  className={
                    stat.type === 'flagged'
                      ? 'text-red'
                      : ''
                  }
                >
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="pipeline-nav">
        {pipelineTabs.map(tab => (
          <div 
            key={tab.id} 
            className={`pipeline-tab ${tab.active ? 'active' : ''}`}
            onClick={() => setActiveFilter(tab.id as any)}
            style={{ cursor: 'pointer' }}
          >
            <i className={tab.icon}></i> {tab.name} <span className="tab-count">{tab.count}</span>
          </div>
        ))}
      </div>

      <div className="px-[5vw] pt-4 max-w-[900px] mx-auto">
        <AnimatePresence>
          {processing > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-0.5 rounded-full overflow-hidden relative"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-sage to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "linear"
                }}
                style={{ width: "50%" }}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="pipeline-feed">
        <AnimatePresence mode="popLayout">
        {filtered.map((report, index) => {
          const author = mockUsers.find(u => u.id === report.reporterId) || mockUsers[0];
          const location = report.location || mockLocations.find(l => l.id === report.locationId)?.name || 'Unknown';
          const isNew = report.id === newReportId;
          
          return (
            <motion.div
              key={report.id}
              layout
              initial={isNew ? { opacity: 0, y: -20 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3, delay: isNew ? 0 : index * 0.1, ease: [0.4, 0, 0.2, 1] as const }}
            >
              <PipelineReportCard 
                report={{ 
                  ...report, 
                  taskType: report.category?.toUpperCase() || '',
                  urgency: report.urgency?.toUpperCase() || 'MEDIUM',
                  status: report.status === 'processed' ? 'COMPLETED' : report.status === 'processing' ? 'IN_PROGRESS' : 'PENDING'
                } as any} 
                author={author} 
                locationName={location}
                categories={[report.category?.toUpperCase() || '']}
              />
            </motion.div>
          );
        })}
        </AnimatePresence>
      </div>
    </div>
  );
};

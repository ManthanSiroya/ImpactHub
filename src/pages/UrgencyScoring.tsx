import React, { useState, useEffect } from 'react';
import { motion, animate } from 'framer-motion';
import { StatusBannerCard } from '../components/cards/StatusBannerCard';
import {
  mockTasks,
  mockLocations,
  mockUsers,
  mockTaskAssignments,
  mockScoreDrivers,
  mockStatusBanners
} from '../data/mockData';
import type { 
  StatusBannerViewModel, 
  ScoreDriverViewModel, 
  ActiveRequestViewModel 
} from '../types';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const } },
};

function useAnimatedNumber(value: number, duration: number = 1.2): number {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const controls = animate(0, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setCurrent(Math.round(v)),
    });
    return () => controls.stop();
  }, [value, duration]);
  return current;
}

const AnimatedStatusBannerCard: React.FC<{ banner: StatusBannerViewModel }> = ({ banner }) => {
  const isNumber = typeof banner.value === 'number';
  const targetValue = isNumber ? (banner.value as number) : 0;
  const animatedValue = useAnimatedNumber(targetValue);
  
  return <StatusBannerCard banner={{ ...banner, value: isNumber ? animatedValue : banner.value }} />;
};

export const UrgencyScoring: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [taskTypeFilter, setTaskTypeFilter] = useState('ALL');

  const highUrgencyCount = mockTasks.filter(t => t.urgency === 'CRITICAL' || t.urgency === 'HIGH').length;

  const statusBanners: StatusBannerViewModel[] =
  mockStatusBanners.map((banner) => ({
    ...banner,
    value:
      banner.id === 'sb1'
        ? highUrgencyCount
        : banner.value ?? 0,
  }));

  const scoreDrivers: ScoreDriverViewModel[] = mockScoreDrivers;

  const activeRequests: ActiveRequestViewModel[] = mockTasks
    .filter(t => t.status === 'PENDING' || t.status === 'IN_PROGRESS')
    .map((t): ActiveRequestViewModel => {
      const location = mockLocations.find(l => l.id === t.locationId);
      const assignment = mockTaskAssignments.find(
        ta => ta.taskId === t.id
      );

      const assignee = mockUsers.find(
        u => u.id === assignment?.userId
      );

      let urgency = 'medium';
      let scoreValue = '5.0';

      if (t.urgency === 'CRITICAL') {
        urgency = 'critical';
        scoreValue = '9.5';
      } else if (t.urgency === 'HIGH') {
        urgency = 'high';
        scoreValue = '8.2';
      }

      return {
        id: t.id,
        reqId: `#REQ-${t.id.split('-')[1] || t.id}`,
        location: location?.name || 'Unknown',
        urgency,
        scoreValue,
        taskType: t.taskType,
        peopleAffected: '50+', // Mocked as no DB field exists for this yet
        submittedTime: '10 mins ago',
        assignedTo: assignee ? assignee.name : 'Unassigned',
        assignedAvatar: assignee ? { initials: assignee.initials, fontSize: '10px', width: '24px', height: '24px' } : undefined,
        actionType: assignee ? 'secondary' : 'primary',
        actionLabel: assignee ? 'Investigate' : 'Assign Volunteer'
      };
    });

  const filteredRequests = activeRequests.filter(req => {
    if (taskTypeFilter !== 'ALL' && req.taskType !== taskTypeFilter) return false;
    
    if (statusFilter !== 'ALL') {
      const isAssigned = req.assignedTo !== 'Unassigned';
      if (statusFilter === 'ASSIGNED' && !isAssigned) return false;
      if (statusFilter === 'UNASSIGNED' && isAssigned) return false;
    }
    
    return true;
  });

  return (
    <motion.div 
      className="dashboard-content"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >

      {/* 1. Unified Status Banner (Top) */}
      <motion.div variants={itemVariants} className="grid-3 card-spacing">
        {statusBanners.map(banner => (
          <AnimatedStatusBannerCard key={banner.id} banner={banner} />
        ))}
      </motion.div>

      {/* 2. Analytical Layer (Middle) */}
      <div className="two-col card-spacing">
        <motion.div variants={itemVariants} className="card">
          <div className="flex-between urgency-card-header">
            <h3 className="serif-title">Needs Heat Map</h3>
            <div className="header-actions">
              <button className="icon-btn icon-btn-sm">
                <i className="fa-solid fa-expand"></i>
              </button>
            </div>
          </div>
          {/* Mock Interactive Map */}
          <div style={{ width: '100%', height: '250px', backgroundColor: '#e5e7eb', borderRadius: '8px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', height: '100%', opacity: 0.2, backgroundImage: 'radial-gradient(#6b7280 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

            {/* Heat map markers */}
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }} style={{ position: 'absolute', top: '30%', left: '40%', width: '40px', height: '40px', background: 'radial-gradient(circle, rgba(239,68,68,0.8) 0%, rgba(239,68,68,0) 70%)', borderRadius: '50%' }}></motion.div>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, duration: 0.4 }} style={{ position: 'absolute', top: '32%', left: '41%', width: '12px', height: '12px', backgroundColor: '#ef4444', border: '2px solid white', borderRadius: '50%', boxShadow: '0 0 10px rgba(239,68,68,0.5)' }}></motion.div>

            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }} style={{ position: 'absolute', top: '60%', left: '70%', width: '60px', height: '60px', background: 'radial-gradient(circle, rgba(245,158,11,0.6) 0%, rgba(245,158,11,0) 70%)', borderRadius: '50%' }}></motion.div>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4, duration: 0.4 }} style={{ position: 'absolute', top: '62%', left: '72%', width: '10px', height: '10px', backgroundColor: '#f59e0b', border: '2px solid white', borderRadius: '50%' }}></motion.div>

            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }} style={{ position: 'absolute', top: '75%', left: '30%', width: '50px', height: '50px', background: 'radial-gradient(circle, rgba(239,68,68,0.7) 0%, rgba(239,68,68,0) 70%)', borderRadius: '50%' }}></motion.div>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, duration: 0.4 }} style={{ position: 'absolute', top: '77%', left: '32%', width: '10px', height: '10px', backgroundColor: '#ef4444', border: '2px solid white', borderRadius: '50%' }}></motion.div>

            <div style={{ position: 'absolute', bottom: '16px', right: '16px', backgroundColor: 'white', padding: '8px 12px', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', fontSize: '11px', fontWeight: 600, display: 'flex', gap: '12px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }}></span> Critical</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></span> High</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></span> Normal</span>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="card">
          <h3 className="serif-title" style={{ marginBottom: '20px' }}>Urgency Score Drivers</h3>
          <div className="dashboard-column drivers-spacing">
            {scoreDrivers.map((driver, idx) => (
              <div key={driver.id} className="driver-row">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>
                  <span>{driver.title}</span>
                  <span>{driver.percentage}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>
                  <motion.div 
                    initial={{ width: '0%' }}
                    animate={{ width: `${driver.percentage}%` }}
                    transition={{ duration: 0.8, delay: 0.3 + (idx * 0.1), ease: 'easeOut' }}
                    style={{
                    height: '100%', backgroundColor:
                      driver.type === 'priority'
                        ? '#8b5cf6'
                        : driver.type === 'people'
                          ? '#10b981'
                          : driver.type === 'severity'
                            ? '#f59e0b'
                            : '#ef4444', borderRadius: '4px'
                  }}></motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 3. Operational Layer (Bottom) */}
      <motion.div variants={itemVariants} className="card">
        <div className="flex-between urgency-card-header">
          <h3 className="serif-title">Active Urgent Need Requests</h3>

          {/* Filtering */}
          <div className="flex-gap-sm">
            <select className="select-control" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="ALL">All Statuses</option>
              <option value="ASSIGNED">Assigned</option>
              <option value="UNASSIGNED">Unassigned</option>
            </select>
            <select className="select-control" value={taskTypeFilter} onChange={(e) => setTaskTypeFilter(e.target.value)}>
              <option value="ALL">All Task Types</option>
              <option value="MEDICAL">Medical</option>
              <option value="FOOD">Food</option>
              <option value="EDUCATION">Education</option>
              <option value="INFRASTRUCTURE">Infrastructure</option>
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Location</th>
                <th>Urgency Score</th>
                <th>Task Type</th>
                <th>People Affected</th>
                <th>Submitted Time</th>
                <th>Assigned To</th>
                <th style={{ textAlign: 'right', whiteSpace: 'nowrap', width: '1%' }}>Action</th>
              </tr>
            </thead>
            <motion.tbody variants={containerVariants} initial="hidden" animate="show">
              {filteredRequests.map((req, index) => (
                <motion.tr variants={itemVariants} key={req.id} className={index < filteredRequests.length - 1 ? 'table-row-border' : ''} >
                  <td style={{ fontWeight: 500, color: 'var(--primary)' }}>{req.reqId}</td>
                  <td>{req.location}</td>
                  <td>
                    <span
                      className={`urgency-badge ${req.urgency === 'critical'
                        ? 'critical'
                        : req.urgency === 'high'
                          ? 'high'
                          : 'medium'
                        }`}
                    >
                      <i
                        className={
                          req.urgency === 'critical'
                            ? 'fa-solid fa-circle-exclamation'
                            : req.urgency === 'high'
                              ? 'fa-solid fa-triangle-exclamation'
                              : 'fa-solid fa-circle-info'
                        }
                      ></i>{req.scoreValue}{' '}
                      {req.urgency === 'critical'
                        ? 'Critical'
                        : req.urgency === 'high'
                          ? 'High'
                          : 'Medium'}
                    </span>
                  </td>
                  <td>{req.taskType}</td>
                  <td>{req.peopleAffected}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{req.submittedTime}</td>
                  <td>
                    {req.assignedAvatar ? (
                      <div className="assigned-user-row">
                        <div className="avatar" style={{ width: req.assignedAvatar.width, height: req.assignedAvatar.height, fontSize: req.assignedAvatar.fontSize }}>
                          {req.assignedAvatar.initials}
                        </div>
                        <span>{req.assignedTo}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                        </div>
                        <span className="text-sm text-gray-500 italic">Unassigned</span>
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '16px 12px', textAlign: 'right', whiteSpace: 'nowrap', width: '1%' }}>
                    {req.actionType === 'primary' ? (
                      <button className="btn-primary btn-primary-sm" style={{ whiteSpace: 'nowrap' }}>
                        {req.actionLabel}
                      </button>
                    ) : (
                      <button className="btn-secondary" style={{ whiteSpace: 'nowrap' }}>
                        {req.actionLabel}
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

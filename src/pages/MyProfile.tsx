import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import {
  mockUsers, 
  mockBadges, 
  mockUserBadges, 
  mockUserSkills, 
  mockSkills,
  mockTaskAssignments,
  mockTasks,
  mockLocations,
  mockActivityLogs,
  mockUserPreferences,
  mockCategoryHours
} from '../data/mockData';
import type {
  VerifiedSkillViewModel,
  MobilityItemViewModel,
  TaskRosterItemViewModel,
  TimelineItemViewModel,
  PreferenceItemViewModel,
  StreakDayViewModel,
  AvailabilitySlot
} from '../types';

const CountUp: React.FC<{ value: number }> = ({ value }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const controls = animate(count, value, { duration: 1.5, ease: "easeOut" });
    return controls.stop;
  }, [count, value]);

  return <motion.span>{rounded}</motion.span>;
};

export const MyProfile: React.FC = () => {
  const currentUser = mockUsers[0];
  if (!currentUser) return null;

  const totalHours = mockCategoryHours.reduce((sum, c) => sum + c.hours, 0);
  
  const badges = mockBadges.slice(0, 6).map(badge => {
    const isUnlocked = mockUserBadges.some(ub => ub.userId === currentUser.id && ub.badgeId === badge.id);
    return {
      id: badge.id,
      icon: badge.icon,
      name: badge.name,
      isEarned: isUnlocked
    };
  });

  // Skills
  const verifiedSkills: VerifiedSkillViewModel[] = mockUserSkills
    .filter(us => us.userId === currentUser.id)
    .slice(0, 5)
    .map((us) => {
      const skill = mockSkills.find(s => s.id === us.skillId);
      let typeClass = '';
      if (skill?.category === 'HEALTHCARE') typeClass = 'medical';
      else if (skill?.category === 'LOGISTICS') typeClass = 'food';
      else if (skill?.category === 'EDUCATION') typeClass = 'education';
      return {
        id: skill?.id || us.id,
        name: skill?.name || 'Unknown',
        typeClass
      };
    });

  const mobilityItems: MobilityItemViewModel[] = [
    { id: 'mi1', text: `Primary: ${mockLocations.find(l => l.id === currentUser.locationId)?.region || 'Unknown'} & Surrounding`, icon: 'fa-solid fa-location-dot' },
    { id: 'mi2', text: `Mobility: ${currentUser.hasVehicle ? 'Has Personal Vehicle' : 'Public Transport'}`, icon: 'fa-solid fa-car' },
    { id: 'mi3', text: `Max Distance: ${currentUser.maxDistanceKm} km radius`, icon: 'fa-solid fa-route' }
  ];

  // Tasks (Derived formulas)
  const userTasks = mockTaskAssignments.filter(ta => ta.userId === currentUser.id);

  const taskRosterItems: TaskRosterItemViewModel[] = userTasks.map(ta => {
      const task = mockTasks.find(t => t.id === ta.taskId);
      const location = mockLocations.find(l => l.id === task?.locationId);
      
      let urgencyClass = 'medium';
      if (task?.urgency === 'HIGH' || task?.urgency === 'CRITICAL') urgencyClass = 'high';
      
      return {
        id: ta.id,
        title: task?.title || 'Unknown',
        urgencyLabel: `URGENCY: ${task?.urgency.substring(0,3)}`,
        urgencyClass,
        location: location?.name || 'Unknown',
        timeInfo: ta.status === 'COMPLETED' ? 'Yesterday' : 'Today, 14:00',
        timeIcon: ta.status === 'COMPLETED' ? 'fa-regular fa-calendar-check' : 'fa-regular fa-clock',
        statusText: ta.status === 'ASSIGNED' ? 'In Progress' : 'Completed',
        statusClass: ta.status === 'ASSIGNED' ? 'in-progress' : 'completed'
      };
    });

  // Timeline
  const historyTimelineItems: TimelineItemViewModel[] = mockActivityLogs
    .filter(al => al.userId === currentUser.id)
    .sort((a, b) => {
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      return timeB - timeA;
    })
    .map(al => ({
      id: al.id,
      title: al.title,
      desc: al.description,
      time: 'Recently',
      icon: 'fa-solid fa-check',
      type: 'completed',
      
    }));

  // Preferences
  const pref = mockUserPreferences.find(p => p.userId === currentUser.id);
  const [preferences, setPreferences] = useState<Record<string, boolean>>({
    'pi1': pref?.pushEnabled ?? false,
    'pi2': pref?.smsEnabled ?? true,
    'pi3': pref?.offlineSync ?? true,
    'pi4': pref?.locationSharing ?? true
  });

  const preferenceItems: PreferenceItemViewModel[] = [
    { id: 'pi1', title: 'Push Notifications', desc: 'Get alerted for urgent needs nearby', isActive: preferences['pi1'] },
    { id: 'pi2', title: 'SMS Alerts', desc: 'Receive critical updates via text', isActive: preferences['pi2'] },
    { id: 'pi3', title: 'Offline Mode Auto-Sync', desc: 'Sync field data when connection returns', isActive: preferences['pi3'] },
    { id: 'pi4', title: 'Location Sharing', desc: 'Required for accurate matchmaking', isActive: preferences['pi4'] }
  ];
  
  const hasSlot = (slot: AvailabilitySlot) => currentUser.availability.includes(slot);

  // Derived logic for Progression Track
  const tierThresholds = [
    { name: 'Bronze', points: 0, color: '#b45309' },
    { name: 'Silver', points: 500, color: '#9ca3af' },
    { name: 'Gold', points: 1500, color: '#fbbf24' },
    { name: 'Platinum', points: 4000, color: '#8b5cf6' }
  ];

  const getMilestoneClass = (threshold: number, currentPoints: number) => {
    if (currentPoints >= tierThresholds[3].points && threshold === tierThresholds[3].points) return 'completed'; // maxed out
    if (currentPoints >= threshold) {
      // Find the next threshold
      const nextTier = tierThresholds.find(t => t.points > threshold);
      if (nextTier && currentPoints < nextTier.points) return 'active';
      return 'completed';
    }
    return 'locked';
  };

  const streakDays: StreakDayViewModel[] = ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => ({
    id: `sd-${idx}`,
    label: day,
    isActive: idx < currentUser.currentStreak
  }));

  return (
    <div className="dashboard-content profile-layout">
      
      {/* Combined Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card profile-hero-card"
      >
        <div className="profile-hero-header">
          <div className="profile-user-info-wrapper">
            {/* Avatar */}
            <div className="profile-avatar-container">
              <div className="profile-avatar">{currentUser.initials}</div>
              <div className="profile-avatar-badge"><i className="fa-solid fa-star"></i></div>
            </div>
            
            {/* User Info */}
            <div className="profile-user-details">
              <h2 className="profile-user-name">{currentUser.name}</h2>
              <p className="profile-user-role">{currentUser.role}</p>
              
              {/* Stats */}
              <div className="profile-stats-container">
                <div className="profile-stat-item">
                  <span className="profile-stat-value"><CountUp value={totalHours} /></span>
                  <span className="profile-stat-label">HOURS<br/>LOGGED</span>
                </div>
                <div className="profile-stat-item">
                  <span className="profile-stat-value"><CountUp value={currentUser.tasksCompleted || 0} /></span>
                  <span className="profile-stat-label">TASKS<br/>COMPLETED</span>
                </div>
                <div className="profile-stat-item">
                  <span className="profile-stat-value"><CountUp value={Number(currentUser.livesImpacted) || 0} /></span>
                  <span className="profile-stat-label">LIVES<br/>IMPACTED</span>
                </div>
              </div>
            </div>
          </div>
          
          <button className="profile-edit-btn">Edit Profile</button>
        </div>

        {/* Progression Timeline */}
        <div className="progress-section">
          <div className="progress-bar-bg">
            <motion.div 
              className="progress-bar-fill" 
              initial={{ width: 0 }}
              animate={{ width: `${(currentUser.points / 4000) * 100}%` }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            ></motion.div>
          </div>
          <div className="progress-markers">
            {tierThresholds.map((tier) => {
              const milestoneState = getMilestoneClass(tier.points, currentUser.points);
              let iconClass = 'fa-solid fa-medal';
              if (tier.name === 'Platinum') iconClass = 'fa-regular fa-gem';
              
              return (
                <div key={tier.name} className={`marker ${tier.name.toLowerCase()} ${milestoneState}`}>
                  <div className="marker-icon"><i className={iconClass}></i></div>
                  <div className="marker-label">{tier.name}</div>
                </div>
              );
            })}
          </div>
          <div className="progress-text">
            {currentUser.pointsToNextTier?.toLocaleString()} points to reach <strong>{tierThresholds.find(t => t.points > currentUser.points)?.name || 'Max Tier'}</strong>
          </div>
        </div>
      </motion.div>

      {/* Gamification & Impact Showcase */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="two-col-grid"
      >
        <div className="card streak-card">
          <div className="streak-content">
            <h4 className="streak-title">Active Volunteer Streak</h4>
            <div className="streak-days-wrapper">
              {streakDays.map((day, idx) => (
                <motion.div 
                  key={day.id} 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + idx * 0.1, type: "spring", stiffness: 200, damping: 10 }}
                  className={`streak-day-item ${day.isActive ? 'active' : ''}`}
                >
                  <i className="fa-solid fa-fire"></i> {day.label}
                </motion.div>
              ))}
            </div>
            <div className="streak-status">🔥 {currentUser.currentStreak} Days Strong!</div>
          </div>
        </div>

        <div className="card">
          <h3 className="serif-title">Badge Case</h3>
          <div className="badge-grid">
            {badges.map(badge => (
              <div key={badge.id} className={`badge-item ${badge.isEarned ? 'earned' : 'locked'}`}>
                <div className="badge-icon">
                  {typeof badge.icon === 'string' && badge.icon.includes('fa-') ? (
                    <i className={badge.icon}></i>
                  ) : (
                    badge.icon
                  )}
                </div>
                <span>{badge.name}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Matchmaking Engine Data */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card"
      >
        <h3 className="serif-title">Matchmaking Profile</h3>
        
        <div className="matchmaking-grid">
          <div>
            <h4 className="section-subtitle">VERIFIED SKILLS</h4>
            <div className="need-tags need-tags-spacing">
              {verifiedSkills.map(skill => (
                <span key={skill.id} className={`need-tag ${skill.typeClass}`}>
                  <i className="fa-solid fa-check-circle"></i> {skill.name}
                </span>
              ))}
            </div>

            <h4 className="section-subtitle">LOCATION & MOBILITY</h4>
            <div className="mobility-list">
              {mobilityItems.map(item => (
                <div key={item.id} className="mobility-item">
                  <i className={`mobility-icon ${item.icon}`}></i> {item.text}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="section-subtitle">AVAILABILITY MATRIX</h4>
            <div className="availability-grid">
              <div className="av-header"></div>
              <div className="av-header">M</div>
              <div className="av-header">T</div>
              <div className="av-header">W</div>
              <div className="av-header">T</div>
              <div className="av-header">F</div>
              <div className="av-header">S</div>
              <div className="av-header">S</div>
              
              <div className="av-row-label">Morning</div>
              <div className={`av-cell ${hasSlot('MONDAY_AM') ? 'available' : ''}`}></div>
              <div className={`av-cell ${hasSlot('TUESDAY_AM') ? 'available' : ''}`}></div>
              <div className={`av-cell ${hasSlot('WEDNESDAY_AM') ? 'available' : ''}`}></div>
              <div className={`av-cell ${hasSlot('THURSDAY_AM') ? 'available' : ''}`}></div>
              <div className={`av-cell ${hasSlot('FRIDAY_AM') ? 'available' : ''}`}></div>
              <div className={`av-cell ${hasSlot('SATURDAY_AM') ? 'available' : ''}`}></div>
              <div className={`av-cell ${hasSlot('SUNDAY_AM') ? 'available' : ''}`}></div>
              
              <div className="av-row-label">Afternoon</div>
              <div className={`av-cell ${hasSlot('MONDAY_PM') ? 'available' : ''}`}></div>
              <div className={`av-cell ${hasSlot('TUESDAY_PM') ? 'available' : ''}`}></div>
              <div className={`av-cell ${hasSlot('WEDNESDAY_PM') ? 'available' : ''}`}></div>
              <div className={`av-cell ${hasSlot('THURSDAY_PM') ? 'available' : ''}`}></div>
              <div className={`av-cell ${hasSlot('FRIDAY_PM') ? 'available' : ''}`}></div>
              <div className={`av-cell ${hasSlot('SATURDAY_PM') ? 'available' : ''}`}></div>
              <div className={`av-cell ${hasSlot('SUNDAY_PM') ? 'available' : ''}`}></div>
              
              <div className="av-row-label">Evening</div>
              <div className={`av-cell ${hasSlot('MONDAY_EVE') ? 'available' : ''}`}></div>
              <div className={`av-cell ${hasSlot('TUESDAY_EVE') ? 'available' : ''}`}></div>
              <div className={`av-cell ${hasSlot('WEDNESDAY_EVE') ? 'available' : ''}`}></div>
              <div className={`av-cell ${hasSlot('THURSDAY_EVE') ? 'available' : ''}`}></div>
              <div className={`av-cell ${hasSlot('FRIDAY_EVE') ? 'available' : ''}`}></div>
              <div className={`av-cell ${hasSlot('SATURDAY_EVE') ? 'available' : ''}`}></div>
              <div className={`av-cell ${hasSlot('SUNDAY_EVE') ? 'available' : ''}`}></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Task History & Roster */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="two-col-grid"
      >
        <div className="card">
          <h3 className="serif-title">Active & Upcoming</h3>
          <div className="task-roster-list">
            {taskRosterItems.map(item => (
              <div key={item.id} className="task-card">
                <div className="task-card-header">
                  <h4 className="task-card-title">{item.title}</h4>
                  <span className={`urgency-pill ${item.urgencyClass}`}>{item.urgencyLabel}</span>
                </div>
                <p className="task-card-location"><i className="fa-solid fa-location-dot"></i> {item.location}</p>
                <div className="task-card-footer">
                  <span className="task-time"><i className={item.timeIcon}></i> {item.timeInfo}</span>
                  <span className={`task-status ${item.statusClass}`}>{item.statusText}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="serif-title">Recent History</h3>
          <div className="timeline">
            {historyTimelineItems.map((item, idx) => (
              <motion.div 
                key={item.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + idx * 0.15 }}
                className="timeline-item"
              >
                <div className={`timeline-dot ${item.type === 'completed' ? 'bg-green-light' : ''}`}>
                  <motion.i 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6 + idx * 0.15 + 0.3, type: "spring", stiffness: 200 }}
                    className={item.icon}
                  ></motion.i>
                </div>
                <div className="timeline-content">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                  <span className="timeline-date">{item.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* App Settings & Preferences */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card"
      >
        <h3 className="serif-title">Preferences</h3>
        <div className="preferences-grid">
          <div>
            {preferenceItems.slice(0, 2).map(item => (
              <div key={item.id} className="setting-row">
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
                <div 
                  className={`toggle-switch ${item.isActive ? 'active' : ''}`} 
                  onClick={() => setPreferences(prev => ({ ...prev, [item.id]: !prev[item.id] }))} 
                  style={{ cursor: 'pointer' }}
                >
                  <div className="toggle-knob"></div>
                </div>
              </div>
            ))}
          </div>
          <div>
            {preferenceItems.slice(2, 4).map(item => (
              <div key={item.id} className="setting-row">
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
                <div 
                  className={`toggle-switch ${item.isActive ? 'active' : ''}`} 
                  onClick={() => setPreferences(prev => ({ ...prev, [item.id]: !prev[item.id] }))} 
                  style={{ cursor: 'pointer' }}
                >
                  <div className="toggle-knob"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

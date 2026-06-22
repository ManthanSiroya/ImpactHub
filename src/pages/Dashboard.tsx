import React, { useState, useEffect } from 'react';
import { motion, animate } from 'framer-motion';
import {
  mockUsers,
  mockLocations,
  mockGlobalMetrics,
  mockActivityLogs,
  mockBadges,
  mockUserBadges,
  mockUserSkills,
  mockSkills,
  mockStreakData,
  mockCategoryHours,
  localLeaderboardUsers,
  regionalLeaderboardUsers,
  globalLeaderboardUsers
} from '../data/mockData';
import { MetricCard } from '../components/cards/MetricCard';
import { ActivityItem } from '../components/cards/ActivityItem';
import { LeaderboardItem } from '../components/cards/LeaderboardItem';
import type {
  DashboardUserProfileViewModel,
  BadgeViewModel,
  LeaderboardUserViewModel,
  CommunityImpactViewModel
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

type MetricType = React.ComponentProps<typeof MetricCard>['metric'];

const AnimatedMetricCard: React.FC<{ metric: MetricType }> = ({ metric }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  useEffect(() => {
    const controls = animate(0, Number(metric.value) || 0, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (v) => setAnimatedValue(Math.round(v))
    });
    return () => controls.stop();
  }, [metric.value]);

  return <MetricCard metric={{ ...metric, value: animatedValue }} />;
};

export const Dashboard: React.FC = () => {
  const [activeLeaderboardTab, setActiveLeaderboardTab] = useState<'LOCAL' | 'REGION' | 'GLOBAL'>('LOCAL');

  const currentUser = mockUsers[0];
  if (!currentUser) return null;
  const userLocation = mockLocations.find(l => l.id === currentUser.locationId)?.name || 'Unknown';

  const userSkills: string[] = mockUserSkills
    .filter(us => us.userId === currentUser.id)
    .map(us => mockSkills.find(s => s.id === us.skillId)?.name)
    .filter((name): name is string => Boolean(name));

  const currentUserProfile: DashboardUserProfileViewModel = {
    ...currentUser,
    role: currentUser.role,
    location: `${userLocation} - Dharavi region`,
    skills: userSkills
  };

  
  const streakData = mockStreakData;
  
  const categoryHours = mockCategoryHours;
  
  const totalHours = categoryHours.reduce((sum, c) => sum + c.hours, 0);
  
  const impactMetrics = [
    {
      id: 'gm-hours',
      metricName: 'TOTAL_HOURS',
      value: totalHours
    },
    ...mockGlobalMetrics.slice(0, 3)
  ];

  const getCategoryBarColor = (type: string): string => {
    switch (type) {
      case 'medical':
        return 'medical';
      case 'education':
        return 'education';
      case 'food':
        return 'food';
      case 'survey':
        return 'survey';
      default:
        return 'medical'; // default color
    }
  };

  const badges: BadgeViewModel[] = mockBadges.slice(0, 12).map(badge => {
    const isUnlocked = mockUserBadges.some(ub => ub.userId === currentUser.id && ub.badgeId === badge.id);
    return {
      id: badge.id,
      icon: badge.icon,
      name: badge.name,
      isLocked: !isUnlocked,
      isSpecial: badge.isSpecial || false
    };
  });

  const currentLeaderboardSource = activeLeaderboardTab === 'LOCAL'
    ? localLeaderboardUsers
    : activeLeaderboardTab === 'REGION'
      ? regionalLeaderboardUsers
      : globalLeaderboardUsers;

  const fullRankedLeaderboard: LeaderboardUserViewModel[] = [...currentLeaderboardSource].sort((a, b) => b.points - a.points).map((u, i) => ({
    ...u,
    rank: i + 1,
    isCurrentUser: u.id === currentUser.id
  }));

  const displayLeaderboard = fullRankedLeaderboard.slice(0, 7);
  const currentUserRanked = fullRankedLeaderboard.find(u => u.isCurrentUser);
  if (currentUserRanked && currentUserRanked.rank > 7) {
    displayLeaderboard.push(currentUserRanked);
  }

  const recentActivities = mockActivityLogs.filter(a => a.userId === currentUser.id);

  const communityImpact: CommunityImpactViewModel = {
    mealsDistributed: Number(mockGlobalMetrics.find(m => m.metricName === 'MEALS_DISTRIBUTED')?.value ?? 0),
    healthChecks: Number(mockGlobalMetrics.find(m => m.metricName === 'HEALTH_CHECKS')?.value ?? 0),
    childrenTutored: 620,
    userContributionPercentage: 8.3
  };

  const animatedPoints = useAnimatedNumber(currentUserProfile.points);
  const animatedMeals = useAnimatedNumber(communityImpact.mealsDistributed);
  const animatedHealthChecks = useAnimatedNumber(communityImpact.healthChecks);
  const animatedChildrenTutored = useAnimatedNumber(communityImpact.childrenTutored);

  return (
    <motion.div 
      className="dashboard-content"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Banner */}
      <motion.section variants={itemVariants} className="banner">
        <div className="banner-top">
          <div className="user-info-large">
            <div className="avatar-large">
              {currentUserProfile.initials}
              <div className="avatar-badge"><i className="fa-solid fa-star"></i></div>
            </div>
            <div className="user-details">
              <h2>{currentUserProfile.name}</h2>
              <div className="user-meta">
                <span className="meta-tag"><i className="fa-solid fa-star" style={{ color: 'var(--gold)' }}></i> {currentUserProfile.role}</span>
                <span><i className="fa-solid fa-location-dot" style={{ color: '#ef4444' }}></i> {currentUserProfile.location}</span>
              </div>
              <div className="skills-tags">
                {currentUserProfile.skills.map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="points-display">
            <h3>{animatedPoints.toLocaleString()}</h3>
            <p>IMPACT POINTS</p>
          </div>
        </div>

        <div className="progress-section">
          <div className="progress-bar-bg">
            <motion.div 
              className="progress-bar-fill" 
              initial={{ width: '0%' }}
              animate={{ width: `${(currentUserProfile.points / 4000) * 100}%` }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            ></motion.div>
          </div>
          <div className="progress-markers">
            <div className="marker bronze">
              <div className="marker-icon"><i className="fa-solid fa-medal"></i></div>
              <div className="marker-label">Bronze</div>
            </div>
            <div className="marker silver">
              <div className="marker-icon"><i className="fa-solid fa-medal"></i></div>
              <div className="marker-label">Silver</div>
            </div>
            <div className="marker gold">
              <div className="marker-icon"><i className="fa-solid fa-medal"></i></div>
              <div className="marker-label">Gold</div>
            </div>
            <div className="marker platinum">
              <div className="marker-icon"><i className="fa-solid fa-gem"></i></div>
              <div className="marker-label">Platinum</div>
            </div>
          </div>
          <div className="progress-text">
            {currentUserProfile.pointsToNextTier?.toLocaleString()} points to reach <strong>Platinum</strong>
          </div>
        </div>
      </motion.section>

      {/* Impact Metrics */}
      <motion.div variants={itemVariants} className="section-header">
        <h3>Impact metrics</h3>
        <span>Your contribution this quarter</span>
      </motion.div>

      <motion.div variants={itemVariants} className="metrics-grid">
        {impactMetrics.map(metric => (
          <AnimatedMetricCard key={metric.id} metric={metric} />
        ))}
      </motion.div>

      {/* Two Column Layout: Streak & Badges */}
      <div className="two-col">
        <motion.div variants={itemVariants} className="card">
          <div className="section-header">
            <h3><i className="fa-solid fa-fire section-icon danger"></i> Streak tracker</h3>
            <span>Last 28 days</span>
          </div>
          <div className="streak-grid">
            {streakData.map(day => (
              <div key={day.id} className={`streak-day level-${day.level}`}></div>
            ))}
          </div>
          <div className="streak-legend">
            <div className="legend-item"><div className="legend-box inactive"></div> Inactive</div>
            <div className="legend-item"><div className="legend-box light"></div> 1 task</div>
            <div className="legend-item"><div className="legend-box medium"></div> 2-3 tasks</div>
            <div className="legend-item"><div className="legend-box strong"></div> 4+ tasks</div>
          </div>

          <div className="category-hours">
            <h4>HOURS BY CATEGORY</h4>
            <div className="category-list">
              {categoryHours.map(category => (
                <div key={category.id} className="category-item">
                  <div className="category-name">{category.name}</div>
                  <div className="category-bar-bg">
                    <motion.div
                      className={`category-bar-fill ${getCategoryBarColor(category.type)}`}
                      initial={{ width: '0%' }}
                      animate={{ width: `${(category.hours / totalHours) * 100}%` }}
                      transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
                    ></motion.div>
                  </div>
                  <div className="category-time">{category.hours}h</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="card">
          <div className="section-header">
            <h3><i className="fa-solid fa-medal section-icon gold"></i> Badges earned</h3>
            <span>9 of 24 unlocked</span>
          </div>
          <div className="badges-grid">
            {badges.map(badge => (
              <div
                key={badge.id}
                className={`badge-item ${badge.isLocked ? 'locked' : ''
                  } ${badge.isSpecial ? 'special' : ''}`}
              >
                <span className="badge-icon">
                  {typeof badge.icon === 'string' && badge.icon.includes('fa-') ? (
                    <i className={badge.icon}></i>
                  ) : (
                    badge.icon
                  )}
                </span>
                <span className="badge-name">{badge.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Leaderboard */}
      <motion.div variants={itemVariants} className="card card-spacing">
        <div className="section-header">
          <h3><i className="fa-solid fa-trophy section-icon bronze"></i> Local leaderboard</h3>
          <div className="tabs">
            <div className={`tab ${activeLeaderboardTab === 'LOCAL' ? 'active' : ''}`} onClick={() => setActiveLeaderboardTab('LOCAL')}>Local</div>
            <div className={`tab ${activeLeaderboardTab === 'REGION' ? 'active' : ''}`} onClick={() => setActiveLeaderboardTab('REGION')}>Region</div>
            <div className={`tab ${activeLeaderboardTab === 'GLOBAL' ? 'active' : ''}`} onClick={() => setActiveLeaderboardTab('GLOBAL')}>Global</div>
          </div>
        </div>

        <div className="leaderboard-list">
          {displayLeaderboard.map(user => (
            <LeaderboardItem key={user.id} user={user} />
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div variants={itemVariants} className="card">
        <div className="section-header">
          <h3><i className="fa-regular fa-clipboard section-icon bronze"></i> Recent activity</h3>
          <a href="#" className="view-all">View all &rarr;</a>
        </div>

        <div className="activity-list">
          {recentActivities.map(activity => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
      </motion.div>

      {/* Community Impact Snapshot */}
      <motion.div variants={itemVariants} className="card dashboard-section-spacing">
        <h4 className="snapshot-title">COMMUNITY IMPACT SNAPSHOT</h4>

        <div className="snapshot-metrics">
          <div className="snapshot-metric">
            <h3>{animatedMeals.toLocaleString()}</h3>
            <p>meals distributed</p>
          </div>
          <div className="snapshot-metric center-border">
            <h3>{animatedHealthChecks.toLocaleString()}</h3>
            <p>health checks done</p>
          </div>
          <div className="snapshot-metric">
            <h3 className="gold-text">{animatedChildrenTutored.toLocaleString()}</h3>
            <p>children tutored</p>
          </div>
        </div>

        <div className="snapshot-footer">
          <div className="snapshot-footer-text">
            <span>Your contribution to total impact</span>
            <span className="teal-text">{communityImpact.userContributionPercentage}%</span>
          </div>
          <div className="snapshot-progress-bg">
            <motion.div 
              className="snapshot-progress-fill"
              initial={{ width: '0%' }}
              animate={{ width: `${communityImpact.userContributionPercentage}%` }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            ></motion.div>
          </div>
        </div>
      </motion.div>

    </motion.div>
  );
};

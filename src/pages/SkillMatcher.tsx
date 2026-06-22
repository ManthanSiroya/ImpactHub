import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { VolunteerCard } from '../components/cards/VolunteerCard';
import { mockSkills, mockUsers, mockUserSkills, mockLocations, mockVolunteerStats } from '../data/mockData';
import type { VolunteerStatViewModel, MatchedVolunteerViewModel } from '../types';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const } },
};

const rankLabels = [
  { bg: '#d9ff00', color: '#2D5A4C', label: 'Best match' },
  { bg: '#E0F0E8', color: '#1B4332', label: '2nd match' },
  { bg: '#FCE8E8', color: '#C45B5B', label: '3rd match' },
];

export const SkillMatcher: React.FC = () => {
  const [showMatches, setShowMatches] = useState(false);
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([]);
  const [calculatedMatches, setCalculatedMatches] = useState<typeof mockUsers>([]);
  const [urgency, setUrgency] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('MEDIUM');
  const [radius, setRadius] = useState<number>(8);

  const toggleSkill = (id: string) => {
    setSelectedSkillIds(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const calculateMatches = () => {
    if (selectedSkillIds.length === 0) {
      setCalculatedMatches([]);
      setShowMatches(true);
      return;
    }

    const selectedSkillsList = mockSkills
      .filter(s => selectedSkillIds.includes(s.id))
      .map(s => s.name.toLowerCase());

    let scored = mockUsers
      .filter(v => v.availability.length > 0 && (v.dist || 0) <= radius)
      .map(v => {
        const userSkills = v.skills || [];
        const matchingSkills = userSkills.filter(skill => 
          selectedSkillsList.includes(skill.toLowerCase())
        );
        
        const sim = selectedSkillsList.length > 0 
          ? matchingSkills.length / selectedSkillsList.length 
          : 0;

        return { ...v, sim, matchingSkills };
      });

    // Filter out users with 0 similarity
    scored = scored.filter(v => (v.sim || 0) > 0);

    // Strictly descending sort based on sim score
    scored.sort((a, b) => (b.sim || 0) - (a.sim || 0));
    const top3 = scored.slice(0, 3);

    const badgedTop3 = top3.map((user, index) => {
      let badge = 'Match';
      if (index === 0) badge = 'Best match';
      else if (index === 1) badge = '2nd match';
      else if (index === 2) badge = '3rd match';

      return {
        ...user,
        matchBadge: badge,
      };
    });

    setCalculatedMatches(badgedTop3);
    setShowMatches(true);
  };

  const getUrgencyStyles = (level: 'LOW' | 'MEDIUM' | 'HIGH') => {
    if (urgency !== level) return {};
    if (level === 'LOW') return { backgroundColor: 'var(--medical-light, #dcfce7)', borderColor: 'var(--medical, #22c55e)', color: 'var(--medical, #22c55e)' };
    if (level === 'MEDIUM') return { backgroundColor: 'var(--food-light, #fef08a)', borderColor: 'var(--food, #eab308)', color: 'var(--food, #9f7a0c)' };
    if (level === 'HIGH') return { backgroundColor: 'var(--danger-light, #fee2e2)', borderColor: 'var(--danger, #ef4444)', color: 'var(--danger, #ef4444)' };
  };

  const volunteerStats: VolunteerStatViewModel[] =
    mockVolunteerStats.map(stat => {
      if (stat.id === 'v1') {
        return {
          ...stat,
          value: mockUsers.length
        };
      }

      if (stat.id === 'v2') {
        return {
          ...stat,
          value: mockUsers.filter(
            u => u.availability.length > 0
          ).length
        };
      }

      return {
        ...stat,
        value: stat.value || 0
      };
    });

  // Derive matched volunteers from mockUsers
  const matchedVolunteers: MatchedVolunteerViewModel[] = mockUsers.filter(u => u.id !== 'usr-1').slice(0, 3).map(user => {
    // Relational lookup: User's location
    const location = mockLocations.find(l => l.id === user.locationId);

    // Relational lookup: User's skills
    const tags = mockUserSkills
      .filter(us => us.userId === user.id)
      .map(us => mockSkills.find(s => s.id === us.skillId)?.name.toLowerCase())
      .filter(Boolean) as string[];

    return {
      id: user.id,
      availability: user.availability.length > 0 ? 'Available' : 'Unavailable',
      initials: user.initials,
      name: user.name,
      role: user.role,
      tags: tags.length > 0 ? tags : ['general volunteer'],
      location: location?.region || 'Unknown',
      distance: `${user.maxDistanceKm}km`, // mock distance from maxDistance
      streak: `${user.currentStreak}d streak`,
      tier: user.tier,
    };
  });

  return (
    <motion.div
      className="dashboard-content"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <div className="two-col">
        {/* Left Column */}
        <div className="col-left dashboard-column">
          {/* Flag a Community Need */}
          <motion.div variants={itemVariants} className="card">
            <h4 className="snapshot-title card-spacing">FLAG A COMMUNITY NEED</h4>

            <div className="form-group">
              <label className="form-label">NEED DESCRIPTION</label>
              <input type="text" className="form-input" placeholder="e.g. Medical camp at Dharavi health center" />
            </div>

            <div className="form-group">
              <label className="form-label">REQUIRED SKILLS</label>
              <div className="tags-container">
                {mockSkills.map(skill => {
                  const isSelected = selectedSkillIds.includes(skill.id);
                  return (
                    <div
                      key={skill.id}
                      className={`tag-selectable ${isSelected ? 'selected' : ''}`}
                      onClick={() => toggleSkill(skill.id)}
                    >
                      {skill.name.toLowerCase()}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">URGENCY LEVEL</label>
              <div className="segmented-control">
                <div
                  className={`segment ${urgency === 'LOW' ? 'selected-low' : ''}`}
                  style={getUrgencyStyles('LOW')}
                  onClick={() => setUrgency('LOW')}
                >Low</div>
                <div
                  className={`segment ${urgency === 'MEDIUM' ? 'selected-medium' : ''}`}
                  style={getUrgencyStyles('MEDIUM')}
                  onClick={() => setUrgency('MEDIUM')}
                >Medium</div>
                <div
                  className={`segment ${urgency === 'HIGH' ? 'selected-high' : ''}`}
                  style={getUrgencyStyles('HIGH')}
                  onClick={() => setUrgency('HIGH')}
                >High</div>
              </div>
            </div>

            <div className="form-group radius-section">
              <label className="form-label">LOCATION RADIUS (KM)</label>
              <div className="range-container">
                <input
                  type="range"
                  className="range-slider"
                  min="1"
                  max="50"
                  value={radius}
                  onChange={(e) => setRadius(Number(e.target.value))}
                  style={{
                    background: `linear-gradient(to right, var(--medical, #26914d) ${(radius / 50) * 100}%, #d5d5d594 ${(radius / 50) * 100}%)`
                  }}
                />
                <div className="range-text">Within <strong>{radius} km</strong></div>
              </div>
            </div>

            <button className="btn-primary-dark" onClick={calculateMatches}>
              Find best-fit volunteers <i className="fa-solid fa-arrow-right skill-btn-icon"></i>
            </button>
          </motion.div>

          {/* Top Matches */}
          <motion.div variants={itemVariants}>
            <h4 className="sm-section-title">TOP MATCHES & NOTIFICATIONS</h4>
            {!showMatches ? (
              <div className="empty-state">
                <div className="empty-icon"><i className="fa-solid fa-magnifying-glass"></i></div>
                <div className="empty-text">Flag a need above to see AI-matched volunteers</div>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-3"
              >
                {calculatedMatches.map((m, i) => {
                  const rankClass = i === 0 ? 'best' : i === 1 ? 'second' : 'third';
                  return (
                    <motion.div
                      key={m.id}
                      variants={itemVariants}
                      className={`sm-card sm-card-${rankClass}`}
                    >
                      <div className="sm-header">
                        <div className="sm-header-left">
                          <div className={`sm-avatar sm-avatar-${rankClass}`}>
                            {m.initials}
                          </div>
                          <div className="sm-info">
                            <div className="sm-name">{m.name}</div>
                            <div className="sm-role">{m.role} &middot; {m.dist}km away</div>
                          </div>
                        </div>
                        <span className={`sm-badge sm-badge-${rankClass}`}>
                          {m.matchBadge || rankLabels[i]?.label || 'Match'}
                        </span>
                      </div>
                      <div className="sm-skills">
                        {(m.skills || []).map(s => {
                          const isMatched = (m.matchingSkills || []).includes(s);
                          return (
                            <span key={s} className={`sm-skill-pill ${isMatched ? 'sm-skill-matched' : 'sm-skill-unmatched'}`}>
                              {s}
                            </span>
                          );
                        })}
                      </div>
                      <div className="sm-progress-container">
                        <div className="sm-progress-header">
                          <span className="sm-progress-label">Cosine similarity</span>
                          <span className="sm-progress-value">{Math.round((m.sim || 0) * 100)}%</span>
                        </div>
                        <div className="sm-progress-track">
                          <motion.div
                            className={`sm-progress-fill sm-progress-fill-${rankClass}`}
                            initial={{ width: '0%' }}
                            animate={{ width: `${Math.round((m.sim || 0) * 100)}%` }}
                            transition={{ duration: 1, delay: 0.3 + i * 0.15, ease: 'easeOut' }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="col-right dashboard-column">
          {/* Volunteer Profiles */}
          <motion.div variants={itemVariants} className="card">
            <h4 className="snapshot-title card-spacing">VOLUNTEER PROFILES</h4>

            <div className="vol-stats">
              {volunteerStats.map(stat => (
                <div key={stat.id} className="vol-stat-box">
                  <div className="vol-stat-val">{stat.value}</div>
                  <div className="vol-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>

            <motion.div
              className="vol-list"
              key={selectedSkillIds.join(',') + urgency + radius}
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {matchedVolunteers.map(volunteer => (
                <motion.div key={volunteer.id} variants={itemVariants}>
                  <VolunteerCard volunteer={volunteer} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Selected Profile */}
          <motion.div variants={itemVariants} className="card">
            <h4 className="snapshot-title card-spacing">SELECTED PROFILE</h4>
            <div className="empty-state">
              <div className="empty-icon"><i className="fa-solid fa-magnifying-glass"></i></div>
              <div className="empty-text">Select a volunteer to view details</div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

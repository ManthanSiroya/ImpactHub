import React from 'react';
import type { VolunteerCardProps } from '../../types';

export const VolunteerCard: React.FC<VolunteerCardProps> = ({ volunteer }) => {

  let avatarClass = 'dark-green';
  let tierStyle = {
    backgroundColor: '#f3f4f6',
    color: 'var(--text-muted)'
  };

  if (volunteer.tier === 'BRONZE') {
    avatarClass = 'rust';

    tierStyle = {
      backgroundColor: '#f4ece4',
      color: '#854d0e'
    };
  } else if (volunteer.tier === 'GOLD') {
    avatarClass = 'gold';

    tierStyle = {
      backgroundColor: '#fef08a',
      color: '#854d0e'
    };
  }

  return (
    <div className="vol-card">
      <div className="vol-badge-top">{volunteer.availability}</div>
      <div className="vol-card-header">
        <div className={`vol-avatar ${avatarClass}`}>{volunteer.initials}</div>
        <div>
          <div className="vol-name">{volunteer.name}</div>
          <div className="vol-role">{volunteer.role}</div>
        </div>
      </div>
      <div className="matched-vol-tags">
        {volunteer.tags.map((tag: string, idx: number) => (
          <span key={idx} className="vol-tag">{tag}</span>
        ))}
      </div>
      <div className="vol-footer">
        <div className="vol-meta">
          <span><i className="fa-solid fa-location-dot"></i> {volunteer.location} &middot; {volunteer.distance}</span>
          <span><i className="fa-solid fa-fire"></i> {volunteer.streak}</span>
        </div>
        <div className="vol-tier" style={tierStyle}>
          {volunteer.tier}
        </div>
      </div>
    </div>
  );
};

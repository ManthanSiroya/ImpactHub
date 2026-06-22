import React from 'react';
import type { LocationNeedCardProps } from '../../types';

export const LocationNeedCard: React.FC<LocationNeedCardProps> = ({ card }) => {
  let urgencyLabel = 'Normal';
  let urgencyStyle = { color: '#6b7280', backgroundColor: '#f3f4f6' };

  if (card.urgency === 'CRITICAL') {
    urgencyLabel = 'Critical';
    urgencyStyle = { color: '#ef4444', backgroundColor: '#fef2f2' };
  } else if (card.urgency === 'HIGH') {
    urgencyLabel = 'High';
    urgencyStyle = { color: '#F97316', backgroundColor: '#FFEDD5' };
  }
  else if (card.urgency === 'MEDIUM') {
    urgencyLabel = 'Medium';
    urgencyStyle = { color: '#EAB308', backgroundColor: '#FEF9C3' };
  }

  const getCategoryClass = (name: string) => {
    const lowerName = (name || '').toLowerCase();
    if (lowerName === 'infrastructure') return 'infra';
    return lowerName;
  };

  return (
    <div className="location-need-card">
      <div className="location-card-header">
        <span>{card.name}</span>
        <span className="location-urgency-pill" style={urgencyStyle}>
          {urgencyLabel}
        </span>
      </div>
      <div className="location-needs-wrap">
        {card.needs.map(need => {
          return (
            <span key={need.name} className="category-badge">
              <div className={`map-node ${getCategoryClass(need.name)}`}></div> {need.name}
            </span>
          );
        })}
      </div>
    </div>
  );
};

import React from 'react';
import type { LocalDataCardProps } from '../../types';

export const LocalDataCard: React.FC<LocalDataCardProps> = ({ card }) => {

  let statusClass = 'green';

  if (card.statusText === 'Pending') {
    statusClass = 'yellow';
  }

  let iconBgClass = '';
  let iconColor = '';

  if (card.title === 'Community needs') {
    iconBgClass = 'bg-red-light';
    iconColor = '#ef4444';
  } else if (card.title === 'Field reports') {
    iconBgClass = 'bg-yellow-light';
    iconColor = '#d97706';
  }

  return (
    <div className="local-data-card">
      <div className={`data-icon ${iconBgClass || ''}`}>
        <i className={card.icon} style={{ color: iconColor }}></i>
      </div>
      <div className="data-info">
        <h4>{card.title}</h4>
        <p>{card.countText}</p>
      </div>
      <div className="data-status">
        <span className={`status-dot ${statusClass}`}></span> {card.statusText} <i className="fa-solid fa-chevron-right"></i>
      </div>
    </div>
  );
};

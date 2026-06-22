import React from 'react';
import type { ActivityLog } from '../../types';

interface ActivityItemProps {
  activity: ActivityLog;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  let icon = 'fa-solid fa-clipboard';
  let bgClass = 'bg-gray-light';
  
  if (activity.title.includes('MEDICAL')) {
    icon = 'fa-solid fa-truck-medical';
    bgClass = 'bg-red-light';
  } else if (activity.title.includes('EDUCATION')) {
    icon = 'fa-solid fa-chalkboard-user';
    bgClass = 'bg-blue-light';
  } else {
    icon = 'fa-solid fa-box-open';
    bgClass = 'bg-yellow-light';
  }

  // derive timeAgo roughly from createdAt or hardcode
  const timeAgo = "Recently";

  return (
    <div className="activity-item">
      <div className={`activity-icon ${bgClass}`}>
        <i className={icon}></i>
      </div>
      <div className="activity-details">
        <h4>{activity.title}</h4>
        <p>{activity.description}</p>
        <span className="activity-time">{timeAgo}</span>
      </div>
      <div className="activity-points">+{activity.pointsEarned} pts</div>
    </div>
  );
};

import React from 'react';
import type { PendingActionCardProps } from '../../types';

export const PendingActionCard: React.FC<PendingActionCardProps & { onActionClick?: () => void }> = ({ action, onActionClick }) => {

  let statusClass = 'gray';

  if (action.status === 'Syncing') {
    statusClass = 'green-light';
  } else if (action.status === 'Synced') {
    statusClass = 'green';
  } else if (action.status === 'Conflict') {
    statusClass = 'red';
  }

  let iconBgClass = 'bg-green-light';

  if (
    action.icon.includes('trash')
  ) {
    iconBgClass = 'bg-red-light';
  }

  return (
    <div className={`action-item ${action.isBorderNone ? 'border-none' : ''}`}>
      <div className={`action-icon ${iconBgClass}`}>
        <i className={action.icon}></i>
      </div>
      <div className="action-details">
        <h4 className="action-title">{action.title}</h4>
        <p className="action-desc">{action.desc}</p>
        {action.actionLink && (
          <button onClick={(e) => { e.preventDefault(); onActionClick?.(); }} className="action-link" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>{action.actionLink}</button>
        )}
      </div>
      <div className={`action-meta ${action.actionLink ? 'align-top' : ''}`}>
        <span className="action-time">{action.time}</span>
        <span className={`status-pill ${statusClass}`}>
          {action.statusIcon && <i className={action.statusIcon}></i>} {action.status}
        </span>
      </div>
    </div>
  );
};

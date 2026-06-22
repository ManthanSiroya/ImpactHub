import React from 'react';
import type { User } from '../../types';

interface LeaderboardItemProps {
  user: User & { rank: number; isCurrentUser?: boolean };
}

export const LeaderboardItem: React.FC<LeaderboardItemProps> = ({ user }) => {
  const isTop3 = user.rank <= 3;
  
  let avatarClass = 'purple';
  let icon: string | null = 'fa-solid fa-medal';
  
  if (user.tier === 'PLATINUM') {
    avatarClass = 'purple';
    icon = 'fa-solid fa-gem';
  } else if (user.tier === 'GOLD') {
    avatarClass = 'orange';
  } else if (user.tier === 'SILVER') {
    avatarClass = 'blue';
  } else if (user.tier === 'BRONZE') {
    avatarClass = 'green';
  }

  // derive hours or mock
  const hours = Math.floor(user.points / 20); // mock calculation

  return (
    <div className={`leaderboard-item ${user.isCurrentUser ? 'current-user' : ''}`}>
      <div
        className={`rank leaderboard-rank ${isTop3 ? `rank-${user.rank}` : ''} ${!isTop3 ? 'leaderboard-rank-default' : ''} `} >
        {user.rank}
      </div>
      <div className="lb-user-info">
        <div className={`lb-avatar ${avatarClass}`}>{user.initials}</div>
        <div className="lb-details">
          <h4>
            {user.name} {user.isCurrentUser ? '(You)' : ''}
            {icon && (
              <React.Fragment>
                {' '}
                <i className={`${icon} tier-icon ${user.tier.toLowerCase()}`}></i>
              </React.Fragment>
            )}
          </h4>
          <p>{user.tier} &middot; {hours} hrs</p>
        </div>
      </div>
      <div className="lb-points">
        <h4>{user.points.toLocaleString()}</h4>
        <p>points</p>
      </div>
    </div>
  );
};

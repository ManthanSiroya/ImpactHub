import React from 'react';
import type { StatusBannerCardProps } from '../../types';

export const StatusBannerCard: React.FC<StatusBannerCardProps> = ({ banner }) => {

  let styles: {
    borderLeft?: string;
    background?: string;
    titleColor?: string;
    valueColor?: string;
    changeColor?: string;
    iconBgColor?: string;
    iconColor?: string;
  } = {};

  if (banner.variant === 'CRITICAL') {
    styles = {
      borderLeft: '4px solid #ef4444',
      background:
        'linear-gradient(to right, rgba(239,68,68,0.05), transparent)',
      titleColor: '#ef4444',
      valueColor: '#ef4444',
      changeColor: '#ef4444',
      iconBgColor: '#fef2f2',
      iconColor: '#ef4444'
    };
  } else if (banner.variant === 'SUCCESS') {
    styles = {
      valueColor: '#10b981',
      iconBgColor: '#d1fae5',
      iconColor: '#10b981'
    };
  }

  return (
    <div
      className="card"
      style={{
        borderLeft: styles.borderLeft ,
        background: styles.background
      }}
    >
      <div className="status-banner-header">
        <div className={`stat-title ${styles.titleColor ? 'status-highlight-title' : ''}`} style={{ color: styles.titleColor }}>
          {banner.title}
        </div>
        <div
          className="stat-icon"
          style={{
            backgroundColor: styles.iconBgColor,
            color: styles.iconColor,
            ...(styles.iconBgColor ? {} : {})
          }}
        >
          <i className={banner.icon}></i>
        </div>
      </div>
      <div className={`stat-value ${styles.valueColor ? 'status-highlight-value' : ''}`} style={{ color: styles.valueColor }}>
        {banner.value}
        {banner.valueSuffix && <span className="status-value-suffix"> {banner.valueSuffix}</span>}
      </div>
      <div className={`stat-change ${styles.changeColor ? 'status-highlight-change' : ''}`} style={{ color: styles.changeColor }}>
        {banner.changeText}
      </div>
    </div>
  );
};

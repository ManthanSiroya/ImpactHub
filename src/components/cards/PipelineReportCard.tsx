import React from 'react';
import type { Task, User } from '../../types';

interface PipelineReportCardProps {
  report: Task;
  author: User;
  locationName: string;
  categories?: string[];
  reportCount?: number;
}

export const PipelineReportCard: React.FC<PipelineReportCardProps> = ({ report, author, locationName, categories, reportCount }) => {
  let needTagClass = 'medical';
  if (report.taskType.includes('FOOD')) needTagClass = 'food';

  let urgencyDotClass = 'medium';
  if (report.urgency === 'HIGH' || report.urgency === 'CRITICAL') urgencyDotClass = 'high';

  let statusClass = 'pending';
  let statusIcon = 'fa-regular fa-clock';
  let statusLabel = 'Pending';
  if (report.status === 'COMPLETED') {
    statusClass = 'processed';
    statusIcon = 'fa-regular fa-circle-check';
    statusLabel = 'Processed';
  } else if (report.status === 'IN_PROGRESS' || report.status === 'PENDING') {
    statusClass = 'pending'; // Changed class to look processing
    statusIcon = 'fa-solid fa-spinner animate-spin';
    statusLabel = 'Processing';
  }

  return (
    <div className="report-card">
      <div className="report-header">
        <div className="report-author">
          <div className="vol-avatar dark-green">{author.initials}</div>
          <div>
            <div className="vol-name">{author.name}</div>
            <div className="vol-role">{author.role}</div>
          </div>
        </div>
        <div className="report-meta-top" style={{ display: 'flex', gap: '8px' }}>
          <span className="report-time">Recently</span>
          {categories ? (
            categories.map(cat => {
              let tagClass = 'medical';
              if (cat.includes('FOOD')) tagClass = 'food';
              if (cat.includes('EDUCATION')) tagClass = 'education';
              if (cat.includes('INFRASTRUCTURE')) tagClass = 'infra';
              return <span key={cat} className={`need-tag ${tagClass}`}>{cat}</span>;
            })
          ) : (
            <span className={`need-tag ${needTagClass}`}>{report.taskType}</span>
          )}
        </div>
      </div>
      <div className="report-content">
        {reportCount && reportCount > 1 
          ? `Submitted ${reportCount} reports recently. Latest: ${report.description}` 
          : report.description}
      </div>
      <div className="report-footer">
        <div className="report-location">
          <i className="fa-solid fa-location-dot"></i> {locationName}
          <span style={{ margin: '0 4px', color: '#d1d5db' }}>&bull;</span> 
          <span className={`urgency-dot ${urgencyDotClass}`}></span> {report.urgency}
        </div>
        <div className={`report-status ${statusClass} ${statusClass === 'pending' ? 'animate-pulse' : ''}`}>
          <i className={statusIcon}></i> {statusLabel}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import type { MetricCardProps } from '../../types';

export const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  let label = 'Metric';
  let icon = 'fa-solid fa-chart-line';
  let trend = 'Up';
  let trendDirection = 'up';

  if (metric.metricName === 'TOTAL_HOURS') {
    label = 'Hours given'; icon = 'fa-solid fa-stopwatch'; trend = '12% vs last month';
  } else if (metric.metricName === 'LIVES_IMPACTED') {
    label = 'Lives impacted'; icon = 'fa-solid fa-heart'; trend = '28% vs last month';
  } else if (metric.metricName === 'TASKS_COMPLETED') {
    label = 'Tasks completed'; icon = 'fa-solid fa-check-square'; trend = '4 this week';
  } else if (metric.metricName === 'MEALS_DISTRIBUTED') {
    label = 'Meals distributed'; icon = 'fa-solid fa-box-open'; trendDirection = 'neutral'; trend = 'Steady';
  } else if (metric.metricName === 'HEALTH_CHECKS') {
    label = 'Health checks'; icon = 'fa-solid fa-stethoscope';
  }

  return (
    <div className="metric-card">
      <div className="metric-icon"><i className={icon}></i></div>
      <div className="metric-value">{metric.value}</div>
      <div className="metric-label">{label}</div>
      <div className={`metric-trend trend-${trendDirection}`}>
        {trendDirection === 'up' && <i className="fa-solid fa-arrow-up"></i>}
        {trendDirection === 'down' && <i className="fa-solid fa-arrow-down"></i>}
        {trendDirection !== 'neutral' ? ` ${trend}` : trend}
      </div>
    </div>
  );
};

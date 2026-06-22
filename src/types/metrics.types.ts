import { type DateLike } from './user.types';

export interface GlobalMetric {
  id: string;
  metricName: string;
  value: number | string;
  totalVolunteers?: number;
  totalHoursLogged?: number;
  totalTasksCompleted?: number;
  activeNgos?: number;
  impactPointsGenerated?: number;
  lastCalculatedAt?: DateLike;
  createdAt?: DateLike;
  updatedAt?: DateLike;
}

// Keep GlobalMetrics for backward compatibility just in case
export interface GlobalMetrics extends GlobalMetric {}

export interface UserMetrics {
  id: string;
  userId: string;
  totalHours: number;
  tasksCompleted: number;
  impactPoints: number;
  badgesCount: number;
  streakDays: number;
  lastActivityAt: DateLike;
  createdAt?: DateLike;
  updatedAt?: DateLike;
}

export interface NgoMetrics {
  id: string;
  ngoId: string;
  tasksCreated: number;
  tasksCompleted: number;
  totalVolunteerHours: number;
  uniqueVolunteersEngaged: number;
  createdAt?: DateLike;
  updatedAt?: DateLike;
}

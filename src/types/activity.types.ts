import { type DateLike } from './user.types';

export type ActivityType =
  | 'ACCOUNT_CREATED'
  | 'PROFILE_UPDATED'
  | 'TASK_ASSIGNED'
  | 'TASK_COMPLETED'
  | 'BADGE_EARNED'
  | 'SKILL_VERIFIED'
  | 'FIELD_REPORT_SUBMITTED'
  | 'COMPLETED_TASK'
  | 'FILED_REPORT'
  | 'RANK_UP'
  | 'SYSTEM';

export interface ActivityLog {
  id: string;
  userId: string;
  type: ActivityType;
  title: string;
  description: string;
  pointsEarned?: number;
  metadata?: Record<string, unknown>;
  timestamp?: DateLike;
  createdAt?: DateLike;
  updatedAt?: DateLike;
}

export interface TimelineEvent {
  id: string;
  userId: string;
  title: string;
  description: string;
  date: DateLike;
  icon?: string;
  createdAt?: DateLike;
  updatedAt?: DateLike;
}

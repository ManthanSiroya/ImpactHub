export interface VolunteerViewModel {
  tier: string;
  availability: string;
  initials: string;
  name: string;
  role: string;
  tags: string[];
  location: string;
  distance: string;
  streak: number | string;
}

export interface VolunteerCardProps {
  volunteer: VolunteerViewModel;
}

export interface PendingActionViewModel {
  id: string | number;
  status: string;
  icon: string;
  isBorderNone?: boolean;
  title: string;
  desc: string;
  actionLink?: string;
  time: string;
  statusIcon?: string;
}

export interface PendingActionCardProps {
  action: PendingActionViewModel;
}

export interface StatusBannerViewModel {
  id?: string;
  variant?: string;
  title?: string;
  icon?: string;
  value: string | number;
  valueSuffix?: string;
  changeText?: string;
}

export interface StatusBannerCardProps {
  banner: StatusBannerViewModel;
}

export interface LocalDataViewModel {
  statusText?: string;
  title?: string;
  icon?: string;
  countText?: string;
}

export interface LocalDataCardProps {
  card: LocalDataViewModel;
}

export interface LocationNeedViewModel {
  name: string;
  urgency: 'critical' | 'high' | 'normal' | string;
  needs: {
    name: string;
  }[];
}

export interface LocationNeedCardProps {
  card: LocationNeedViewModel;
}

export interface MetricViewData {
  metricName: string;
  value: string | number;
}

export interface MetricCardProps {
  metric: MetricViewData;
}

import type { User } from './user.types';

export interface SkillTagViewModel {
  id: string;
  name: string;
  selected: boolean;
}

export interface VolunteerStatViewModel {
  id: string;
  label: string;
  value: number;
}

export interface MatchedVolunteerViewModel extends VolunteerViewModel {
  id: string;
}

export interface DashboardUserProfileViewModel extends User {
  location: string;
  skills: string[];
}

export interface BadgeViewModel {
  id: string;
  icon: string;
  name: string;
  isLocked: boolean;
  isSpecial: boolean;
}

export interface LeaderboardUserViewModel extends User {
  rank: number;
  isCurrentUser: boolean;
}

export interface CommunityImpactViewModel {
  mealsDistributed: number;
  healthChecks: number;
  childrenTutored: number;
  userContributionPercentage: number;
}

export interface ProfileBadgeViewModel {
  id: string;
  name: string;
  icon: string;
  isEarned: boolean;
  iconBgColor: string;
  iconColor: string;
}

export interface VerifiedSkillViewModel {
  id: string;
  name: string;
  typeClass: string;
}

export interface MobilityItemViewModel {
  id: string;
  text: string;
  icon: string;
}

export interface TaskRosterItemViewModel {
  id: string;
  title: string;
  urgencyLabel: string;
  urgencyClass: string;
  location: string;
  timeInfo: string;
  timeIcon: string;
  statusText: string;
  statusClass: string;
}

export interface TimelineItemViewModel {
  id: string;
  title: string;
  desc: string;
  time: string;
  icon: string;
  type: string;
}

export interface PreferenceItemViewModel {
  id: string;
  title: string;
  desc: string;
  isActive: boolean;
}

export interface StreakDayViewModel {
  id: string;
  label: string;
  isActive: boolean;
}

export interface ScoreDriverViewModel {
  id: string;
  title: string;
  percentage: number;
  type: string;
}

export interface ActiveRequestViewModel {
  id: string;
  reqId: string;
  location: string;
  urgency: string;
  scoreValue: string;
  taskType: string;
  peopleAffected: string | number;
  submittedTime: string;
  assignedTo: string;
  assignedAvatar?: { initials: string; fontSize: string; width: string; height: string };
  actionType: 'primary' | 'secondary';
  actionLabel: string;
}

export type ConnectionState = 'online' | 'slow' | 'offline';
export type ActionType = 'create' | 'update' | 'delete';
export type ActionStatus = 'queued' | 'syncing' | 'synced' | 'conflict';

export interface QueuedAction {
  id: number;
  type: ActionType;
  title: string;
  detail: string;
  time: string;
  status: ActionStatus;
}

export interface LogEntry {
  time: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}



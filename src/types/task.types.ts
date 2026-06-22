import { type DateLike } from './user.types';

export type TaskUrgency = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type TaskStatus = 'OPEN' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'PENDING';

export interface Task {
  id: string;
  ngoId: string;
  title: string;
  description: string;
  locationId: string;
  urgency: TaskUrgency;
  status: TaskStatus;
  taskType: string;
  requiredSkills?: string[];
  estimatedHours?: number;
  startDate?: DateLike;
  endDate?: DateLike;
  requiredVolunteers: number;
  pointsEarned: number;
  currentVolunteers?: number;
  createdAt?: DateLike;
  updatedAt?: DateLike;
}

export type AssignmentStatus = 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'COMPLETED' | 'DROPPED' | 'ASSIGNED';

export interface TaskAssignment {
  id: string;
  taskId: string;
  userId?: string;
  status: AssignmentStatus;
  assignedAt?: DateLike;
  completedAt?: DateLike;
  hoursLogged?: number;
  createdAt?: DateLike;
  updatedAt?: DateLike;
}

export type ReportStatus = 'PENDING' | 'VERIFIED' | 'RESOLVED' | 'processing' | 'processed' | 'flagged' | string;
export type ReportUrgency = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | 'low' | 'medium' | 'high' | string;
export type ReportCategory = 'MEDICAL' | 'FOOD' | 'SHELTER' | 'INFRASTRUCTURE' | 'WATER' | 'EDUCATION' | 'OTHER' | 'LOGISTICS' | 'Medical' | 'Food' | 'Infrastructure' | 'Education' | string;

export interface FieldReport {
  id: string | number;
  reporterId: string;
  locationId: string;
  category: ReportCategory;
  urgency: ReportUrgency;
  description: string;
  peopleAffected: number;
  status: ReportStatus;
  mediaUrls?: string[];
  reportedAt?: DateLike;
  createdAt?: DateLike;
  updatedAt?: DateLike;
  time?: string;
  avatarColor?: string;
  avatarTextColor?: string;
  initials?: string;
  reporter?: string;
  role?: string;
  content?: string;
  location?: string;
}

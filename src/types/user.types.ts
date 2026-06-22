export type DateLike = Date | string;

export type UserRole = 'ADMIN' | 'ORGANIZER' | 'VOLUNTEER';
export type VolunteerTier = 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING_VERIFICATION';

export interface MobilityInfo {
  hasVehicle: boolean;
  vehicleType?: 'CAR' | 'TRUCK' | 'VAN' | 'MOTORCYCLE' | 'BICYCLE';
  maxTravelDistanceKm: number;
  requiresAccessibleFacilities: boolean;
}

export interface AuthShape {
  provider: 'EMAIL' | 'GOOGLE' | 'FACEBOOK' | 'APPLE';
  providerId?: string;
  emailVerified: boolean;
  lastLoginAt?: DateLike;
}

export interface BaseUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  role: UserRole;
  status?: UserStatus;
  auth?: AuthShape;
  createdAt?: DateLike;
  updatedAt?: DateLike;
}

export type AvailabilitySlot = 
  | 'MONDAY_AM' | 'MONDAY_PM' | 'MONDAY_EVE'
  | 'TUESDAY_AM' | 'TUESDAY_PM' | 'TUESDAY_EVE'
  | 'WEDNESDAY_AM' | 'WEDNESDAY_PM' | 'WEDNESDAY_EVE'
  | 'THURSDAY_AM' | 'THURSDAY_PM' | 'THURSDAY_EVE'
  | 'FRIDAY_AM' | 'FRIDAY_PM' | 'FRIDAY_EVE'
  | 'SATURDAY_AM' | 'SATURDAY_PM' | 'SATURDAY_EVE'
  | 'SUNDAY_AM' | 'SUNDAY_PM' | 'SUNDAY_EVE';

export interface User extends BaseUser {
  name: string;
  points: number;
  tier: VolunteerTier;
  pointsToNextTier: number;
  initials: string;
  currentStreak: number;
  highestStreak: number;
  hoursLogged?: number;
  tasksCompleted?: number;
  livesImpacted?: string | number;
  hasVehicle: boolean;
  maxDistanceKm: number;
  availability: AvailabilitySlot[];
  locationId: string;
  sim?: number;
  dist?: number;
  avatarColor?: string;
  avatarTextColor?: string;
  skills?: string[];
  matchingSkills?: string[];
  matchBadge?: string;
}

export interface Volunteer extends User {
  role: 'VOLUNTEER';
  totalHoursLogged?: number;
  mobilityInfo?: MobilityInfo;
  bio?: string;
}

export interface Organizer extends User {
  role: 'ORGANIZER';
  organizationName?: string;
  organizationId?: string;
  contactEmail?: string;
}

export interface NGO {
  id: string;
  name: string;
  description: string;
  contactEmail: string;
  verified: boolean;
  createdAt?: DateLike;
  updatedAt?: DateLike;
}

export interface UserNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  type: string;
  createdAt?: DateLike;
  updatedAt?: DateLike;
}

export interface UserPreference {
  id: string;
  userId: string;
  pushEnabled: boolean;
  smsEnabled: boolean;
  offlineSync: boolean;
  locationSharing: boolean;
  createdAt?: DateLike;
  updatedAt?: DateLike;
}

export interface MatchedVolunteer {
  id: string;
  name: string;
  role: string;
  initials: string;
  avatarColor: string;
  avatarTextColor: string;
  dist: number;
  sim: number;
  skills: string[];
  matchingSkills: string[];
}

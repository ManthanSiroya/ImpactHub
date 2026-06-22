import type {
  User, Location, NGO, Task, TaskAssignment, FieldReport, Skill, UserSkill, Badge, UserBadge, ActivityLog, GlobalMetric, UserNotification, UserPreference
} from '../types';

const now = new Date();
const yesterday = new Date(Date.now() - 86400000);
const twoDaysAgo = new Date(Date.now() - 172800000);

export const mockLocations: Location[] = [
  { id: 'loc-1', name: 'Dharavi', city: 'Mumbai', state: 'Maharashtra', region: 'ASIA', coordinates: { latitude: 18.9500, longitude: 72.8200 }, createdAt: now, updatedAt: now },
  { id: 'loc-2', name: 'Bandra West Station', city: 'Mumbai', state: 'Maharashtra', region: 'ASIA', coordinates: { latitude: 19.0500, longitude: 72.7500 }, createdAt: now, updatedAt: now },
  { id: 'loc-3', name: 'Kurla East', city: 'Mumbai', state: 'Maharashtra', region: 'ASIA', coordinates: { latitude: 19.0500, longitude: 72.9500 }, createdAt: now, updatedAt: now },
  { id: 'loc-4', name: 'Andheri', city: 'Mumbai', state: 'Maharashtra', region: 'ASIA', coordinates: { latitude: 19.1500, longitude: 72.8500 }, createdAt: now, updatedAt: now },
  { id: 'loc-5', name: 'Dharavi Community Center', city: 'Mumbai', state: 'Maharashtra', region: 'ASIA', coordinates: { latitude: 19.0390, longitude: 72.8550 }, createdAt: now, updatedAt: now },
  { id: 'loc-6', name: 'Dharavi North', city: 'Mumbai', state: 'Maharashtra', region: 'ASIA', coordinates: { latitude: 19.0400, longitude: 72.8560 }, createdAt: now, updatedAt: now },
  { id: 'loc-7', name: 'LNMIIT HA HA', city: 'Udaipur', state: 'Maharashtra', region: 'ASIA', coordinates: { latitude: 19.0650, longitude: 72.8800 }, createdAt: now, updatedAt: now },
  { id: 'loc-8', name: 'Bandra East', city: 'Mumbai', state: 'Maharashtra', region: 'ASIA', coordinates: { latitude: 19.0550, longitude: 72.8450 }, createdAt: now, updatedAt: now },
  { id: 'loc-9', name: 'Mota Chor', city: 'Mumbai', state: 'Maharashtra', region: 'ASIA', coordinates: { latitude: 19.0555, longitude: 72.8475 }, createdAt: now, updatedAt: now },
];

export const mockNGOs: NGO[] = [
  { id: 'ngo-1', name: 'Mumbai Relief Team', description: 'Local disaster relief and community aid.', contactEmail: 'contact@mumbairelief.org', verified: true, createdAt: now, updatedAt: now },
  { id: 'ngo-2', name: 'Education For All', description: 'Providing education and childcare services.', contactEmail: 'info@eduforall.org', verified: true, createdAt: now, updatedAt: now },
];

export const mockUsers: User[] = [
  {
    id: 'usr-1', name: 'Priya Ramesh', email: 'priya@example.com', role: 'ORGANIZER', locationId: 'loc-1', points: 2480, tier: 'GOLD', pointsToNextTier: (4000-2480), initials: 'PR',
    currentStreak: 4, highestStreak: 14, hoursLogged: 200, tasksCompleted: 185, livesImpacted: 3200, hasVehicle: true, maxDistanceKm: 15,
    availability: ['MONDAY_AM', 'WEDNESDAY_AM', 'FRIDAY_AM', 'SATURDAY_AM', 'SUNDAY_AM', 'TUESDAY_PM', 'THURSDAY_PM', 'SATURDAY_PM', 'SUNDAY_PM', 'FRIDAY_EVE', 'SATURDAY_EVE', 'SUNDAY_EVE'],
    createdAt: twoDaysAgo, updatedAt: now , skills: ['pharmacy', 'inventory']
  },
  {
    id: 'usr-2', name: 'Arjun Mehta', email: 'arjun@example.com', role: 'VOLUNTEER', locationId: 'loc-2', points: 450, tier: 'BRONZE', pointsToNextTier: (1000-450), initials: 'AM',
    currentStreak: 7, highestStreak: 7, hoursLogged: 28, hasVehicle: true, maxDistanceKm: 25,
    availability: ['SATURDAY_AM', 'SUNDAY_AM'],
    createdAt: twoDaysAgo, updatedAt: now, skills: ['first aid', 'data entry']
  },
  {
    id: 'usr-3', name: 'Sneha Rao', email: 'sneha@example.com', role: 'VOLUNTEER', locationId: 'loc-3', points: 2100, tier: 'GOLD', pointsToNextTier: 900, initials: 'SR',
    currentStreak: 22, highestStreak: 30, hoursLogged: 105, hasVehicle: false, maxDistanceKm: 5,
    availability: ['MONDAY_EVE', 'WEDNESDAY_EVE', 'FRIDAY_EVE'],
    createdAt: twoDaysAgo, updatedAt: now,
    dist: 1.5, avatarColor: '#FCE8E8', avatarTextColor: '#C45B5B', skills: ['pharmacy', 'inventory']
  },
  {
    id: 'usr-4', name: 'Priya Nair', email: 'pnair@example.com', role: 'VOLUNTEER', locationId: 'loc-1', points: 800, tier: 'SILVER', pointsToNextTier: 200, initials: 'PN',
    currentStreak: 14, highestStreak: 14, hoursLogged: 45, hasVehicle: false, maxDistanceKm: 10,
    availability: ['MONDAY_AM', 'TUESDAY_AM', 'WEDNESDAY_AM'],
    createdAt: twoDaysAgo, updatedAt: now,
    dist: 4, avatarColor: '#F0EDE6', avatarTextColor: '#1A1A1A', skills: ['first aid', 'data entry']
  },
  {
    id: 'usr-5', name: 'Fatima Sheikh', email: 'fatima@example.com', role: 'VOLUNTEER', locationId: 'loc-7', points: 650, tier: 'SILVER', pointsToNextTier: 350, initials: 'FS',
    currentStreak: 2, highestStreak: 5, hoursLogged: 30, hasVehicle: true, maxDistanceKm: 20,
    availability: ['SUNDAY_AM', 'SUNDAY_PM'],
    createdAt: twoDaysAgo, updatedAt: now,
    dist: 2, avatarColor: '#E8F0EC', avatarTextColor: '#2D5A4C', skills: ['basic nursing', 'first aid', 'triage']
  },
  {
    id: 'usr-6', name: 'Rahul Verma', email: 'rahul@example.com', role: 'VOLUNTEER', locationId: 'loc-2', points: 400, tier: 'BRONZE', pointsToNextTier: 100, initials: 'RV',
    currentStreak: 1, highestStreak: 3, hoursLogged: 15, hasVehicle: true, maxDistanceKm: 30,
    availability: ['SATURDAY_AM', 'SUNDAY_AM'],
    createdAt: twoDaysAgo, updatedAt: now,
    dist: 8, avatarColor: '#E3F2FD', avatarTextColor: '#1565C0', skills: ['logistics', 'driving', 'inventory']
  },
  {
    id: 'usr-7', name: 'Anita Desai', email: 'anita@example.com', role: 'VOLUNTEER', locationId: 'loc-3', points: 1200, tier: 'SILVER', pointsToNextTier: 300, initials: 'AD',
    currentStreak: 10, highestStreak: 12, hoursLogged: 60, hasVehicle: false, maxDistanceKm: 8,
    availability: ['MONDAY_EVE', 'WEDNESDAY_EVE'],
    createdAt: twoDaysAgo, updatedAt: now,
    dist: 3, avatarColor: '#F3E5F5', avatarTextColor: '#6A1B9A', skills: ['teaching', 'child care', 'counselling']
  },
  {
    id: 'usr-8', name: 'Vikram Singh', email: 'vikram@example.com', role: 'VOLUNTEER', locationId: 'loc-4', points: 3000, tier: 'GOLD', pointsToNextTier: 1000, initials: 'VS',
    currentStreak: 45, highestStreak: 50, hoursLogged: 200, hasVehicle: true, maxDistanceKm: 15,
    availability: ['FRIDAY_EVE', 'SATURDAY_EVE'],
    createdAt: twoDaysAgo, updatedAt: now,
    dist: 5, avatarColor: '#FFF3E0', avatarTextColor: '#E65100', skills: ['cpr certified', 'advanced first aid', 'crowd control']
  },
  {
    id: 'usr-9', name: 'Meera Reddy', email: 'meera@example.com', role: 'VOLUNTEER', locationId: 'loc-5', points: 950, tier: 'SILVER', pointsToNextTier: 50, initials: 'MR',
    currentStreak: 5, highestStreak: 10, hoursLogged: 40, hasVehicle: false, maxDistanceKm: 5,
    availability: ['TUESDAY_AM', 'THURSDAY_AM'],
    createdAt: twoDaysAgo, updatedAt: now,
    dist: 1.2, avatarColor: '#E8F5E9', avatarTextColor: '#2E7D32', skills: ['food handling', 'inventory', 'logistics']
  },
  {
    id: 'usr-10', name: 'Kabir Khan', email: 'kabir@example.com', role: 'VOLUNTEER', locationId: 'loc-6', points: 250, tier: 'BRONZE', pointsToNextTier: 250, initials: 'KK',
    currentStreak: 0, highestStreak: 2, hoursLogged: 10, hasVehicle: false, maxDistanceKm: 12,
    availability: ['SUNDAY_EVE'],
    createdAt: twoDaysAgo, updatedAt: now,
    dist: 9, avatarColor: '#FBE9E7', avatarTextColor: '#D84315', skills: ['basic nursing', 'cpr certified', 'data entry']
  },
  {
    id: 'usr-11', name: 'Sarah Thomas', email: 'sarah@example.com', role: 'VOLUNTEER', locationId: 'loc-1', points: 1800, tier: 'GOLD', pointsToNextTier: 200, initials: 'ST',
    currentStreak: 15, highestStreak: 20, hoursLogged: 90, hasVehicle: true, maxDistanceKm: 25,
    availability: ['MONDAY_AM', 'FRIDAY_AM'],
    createdAt: twoDaysAgo, updatedAt: now,
    dist: 6, avatarColor: '#FCE4EC', avatarTextColor: '#C2185B', skills: ['counselling', 'child care', 'teaching']
  }
];

export const mockTasks: Task[] = [
  { id: 'tsk-1', ngoId: 'ngo-1', locationId: 'loc-5', title: 'Medical Camp Setup', description: 'Help setup tents and triage stations for the free medical camp.', taskType: 'MEDICAL', urgency: 'CRITICAL', status: 'IN_PROGRESS', requiredVolunteers: 5, pointsEarned: 50, createdAt: now, updatedAt: now },
  { id: 'tsk-2', ngoId: 'ngo-1', locationId: 'loc-2', title: 'Food Distribution', description: 'Distribute hot meals to homeless individuals around the station.', taskType: 'FOOD', urgency: 'MEDIUM', status: 'PENDING', requiredVolunteers: 10, pointsEarned: 30, createdAt: now, updatedAt: now },
  { id: 'tsk-3', ngoId: 'ngo-2', locationId: 'loc-3', title: 'Teaching Basic Math', description: 'Assist primary school children with basic mathematics.', taskType: 'EDUCATION', urgency: 'LOW', status: 'COMPLETED', requiredVolunteers: 2, pointsEarned: 40, createdAt: yesterday, updatedAt: yesterday },
  { id: 'tsk-4', ngoId: 'ngo-2', locationId: 'loc-4', title: 'Road Debris Clearance', description: 'Clear fallen branches blocking main arterial road.', taskType: 'INFRASTRUCTURE', urgency: 'HIGH', status: 'PENDING', requiredVolunteers: 8, pointsEarned: 45, createdAt: now, updatedAt: now },
  { id: 'tsk-5', ngoId: 'ngo-1', locationId: 'loc-1', title: 'Emergency Blood Drive', description: 'Coordinate donors for rare blood types.', taskType: 'MEDICAL', urgency: 'CRITICAL', status: 'PENDING', requiredVolunteers: 3, pointsEarned: 60, createdAt: now, updatedAt: now },
  { id: 'tsk-6', ngoId: 'ngo-2', locationId: 'loc-8', title: 'Community Kitchen Aid', description: 'Prep ingredients for 500 evening meals.', taskType: 'FOOD', urgency: 'HIGH', status: 'IN_PROGRESS', requiredVolunteers: 6, pointsEarned: 35, createdAt: now, updatedAt: now },
  { id: 'tsk-7', ngoId: 'ngo-1', locationId: 'loc-7', title: 'School Repair Work', description: 'Fix broken desks before term starts.', taskType: 'INFRASTRUCTURE', urgency: 'MEDIUM', status: 'COMPLETED', requiredVolunteers: 4, pointsEarned: 25, createdAt: yesterday, updatedAt: yesterday },
  { id: 'tsk-8', ngoId: 'ngo-2', locationId: 'loc-6', title: 'Adult Literacy Evening', description: 'Evening reading classes for adult learners.', taskType: 'EDUCATION', urgency: 'LOW', status: 'PENDING', requiredVolunteers: 2, pointsEarned: 40, createdAt: now, updatedAt: now },
  { id: 'tsk-9', ngoId: 'ngo-1', locationId: 'loc-1', title: 'Flood Relief Kit Assembly', description: 'Assemble relief kits with essentials for flood victims.', taskType: 'LOGISTICS', urgency: 'HIGH', status: 'IN_PROGRESS', requiredVolunteers: 15, pointsEarned: 40, createdAt: now, updatedAt: now },
  { id: 'tsk-10', ngoId: 'ngo-2', locationId: 'loc-3', title: 'Senior Care Wellness Check', description: 'Door-to-door wellness checks for senior citizens in the neighborhood.', taskType: 'MEDICAL', urgency: 'MEDIUM', status: 'COMPLETED', requiredVolunteers: 4, pointsEarned: 55, createdAt: yesterday, updatedAt: yesterday },
  { id: 'tsk-11', ngoId: 'ngo-1', locationId: 'loc-5', title: 'Local Park Cleanup', description: 'Community cleanup drive after the recent storm.', taskType: 'INFRASTRUCTURE', urgency: 'LOW', status: 'PENDING', requiredVolunteers: 20, pointsEarned: 20, createdAt: now, updatedAt: now },
  { id: 'tsk-12', ngoId: 'ngo-2', locationId: 'loc-8', title: 'Vaccination Drive Support', description: 'Assist with data entry and queue management at the vaccination center.', taskType: 'MEDICAL', urgency: 'CRITICAL', status: 'PENDING', requiredVolunteers: 5, pointsEarned: 70, createdAt: now, updatedAt: now },
  { id: 'tsk-13', ngoId: 'ngo-1', locationId: 'loc-2', title: 'Orphanage Library Setup', description: 'Sort and organize donated books for the new orphanage library.', taskType: 'EDUCATION', urgency: 'MEDIUM', status: 'COMPLETED', requiredVolunteers: 3, pointsEarned: 45, createdAt: yesterday, updatedAt: yesterday },
  { id: 'tsk-14', ngoId: 'ngo-2', locationId: 'loc-4', title: 'Water Tanker Distribution', description: 'Manage distribution of potable water in drought-affected zones.', taskType: 'WATER', urgency: 'HIGH', status: 'PENDING', requiredVolunteers: 6, pointsEarned: 50, createdAt: now, updatedAt: now },
  { id: 'tsk-15', ngoId: 'ngo-1', locationId: 'loc-6', title: 'Stray Animal Rescue', description: 'Assist in relocating stray animals to local shelters.', taskType: 'OTHER', urgency: 'MEDIUM', status: 'IN_PROGRESS', requiredVolunteers: 2, pointsEarned: 60, createdAt: now, updatedAt: now },
];

export const mockTaskAssignments: TaskAssignment[] = [
  { id: 'ta-1', taskId: 'tsk-1', userId: 'usr-1', status: 'ASSIGNED', createdAt: now, updatedAt: now },
  { id: 'ta-2', taskId: 'tsk-2', userId: 'usr-1', status: 'ASSIGNED', createdAt: now, updatedAt: now },
  { id: 'ta-3', taskId: 'tsk-3', userId: 'usr-2', status: 'COMPLETED', createdAt: yesterday, updatedAt: yesterday },
  { id: 'ta-4', taskId: 'tsk-4', userId: undefined, status: 'PENDING', createdAt: now, updatedAt: now },
  { id: 'ta-5', taskId: 'tsk-5', userId: undefined, status: 'PENDING', createdAt: now, updatedAt: now },
  { id: 'ta-6', taskId: 'tsk-6', userId: 'usr-3', status: 'ASSIGNED', createdAt: now, updatedAt: now },
  { id: 'ta-7', taskId: 'tsk-7', userId: 'usr-5', status: 'COMPLETED', createdAt: yesterday, updatedAt: yesterday },
  { id: 'ta-8', taskId: 'tsk-8', userId: undefined, status: 'PENDING', createdAt: now, updatedAt: now },
  { id: 'ta-9', taskId: 'tsk-9', userId: 'usr-4', status: 'ASSIGNED', createdAt: now, updatedAt: now },
  { id: 'ta-10', taskId: 'tsk-10', userId: 'usr-6', status: 'COMPLETED', createdAt: yesterday, updatedAt: yesterday },
  { id: 'ta-11', taskId: 'tsk-11', userId: undefined, status: 'PENDING', createdAt: now, updatedAt: now },
  { id: 'ta-12', taskId: 'tsk-12', userId: undefined, status: 'PENDING', createdAt: now, updatedAt: now },
  { id: 'ta-13', taskId: 'tsk-13', userId: 'usr-7', status: 'COMPLETED', createdAt: yesterday, updatedAt: yesterday },
  { id: 'ta-14', taskId: 'tsk-14', userId: undefined, status: 'PENDING', createdAt: now, updatedAt: now },
  { id: 'ta-15', taskId: 'tsk-15', userId: 'usr-11', status: 'ASSIGNED', createdAt: now, updatedAt: now },
];

export const mockFieldReports: FieldReport[] = [
  { id: 'fr-1', reporterId: 'usr-1', locationId: 'loc-1', category: 'Medical', urgency: 'high', description: '#REQ-9942 - Medical aid required immediately.', content: '#REQ-9942 - Medical aid required immediately.', peopleAffected: 50, status: 'processing', createdAt: now, updatedAt: now, avatarColor: '#FCE8E8', avatarTextColor: '#C45B5B', initials: 'PR', reporter: 'Priya Ramesh', role: 'ORGANIZER', time: '10:23 AM', location: 'Dharavi' },
  { id: 'fr-2', reporterId: 'usr-5', locationId: 'loc-4', category: 'Infrastructure', urgency: 'high', description: '#REQ-9940 - Water Supply pipeline broken.', content: '#REQ-9940 - Water Supply pipeline broken.', peopleAffected: 120, status: 'processing', createdAt: now, updatedAt: now, avatarColor: '#E8F0EC', avatarTextColor: '#2D5A4C', initials: 'FS', reporter: 'Fatima Sheikh', role: 'VOLUNTEER', time: '10:15 AM', location: 'Andheri' },
  { id: 'fr-3', reporterId: 'usr-2', locationId: 'loc-3', category: 'Education', urgency: 'high', description: '#REQ-9937 - Emergency education supplies needed.', content: '#REQ-9937 - Emergency education supplies needed.', peopleAffected: 15, status: 'processing', createdAt: now, updatedAt: now, avatarColor: '#F0EDE6', avatarTextColor: '#1A1A1A', initials: 'AM', reporter: 'Arjun Mehta', role: 'VOLUNTEER', time: '9:48 AM', location: 'Kurla East' },
  { id: 'fr-4', reporterId: 'usr-1', locationId: 'loc-1', category: 'Medical', urgency: 'medium', description: 'Health screening data uploaded.', content: 'Health screening data uploaded.', peopleAffected: 0, status: 'processing', createdAt: now, updatedAt: now, avatarColor: '#FCE8E8', avatarTextColor: '#C45B5B', initials: 'PR', reporter: 'Priya Ramesh', role: 'ORGANIZER', time: '9:32 AM', location: 'Dharavi' },
  { id: 'fr-5', reporterId: 'usr-1', locationId: 'loc-2', category: 'Food', urgency: 'high', description: '50 families require meal support.', content: '50 families require meal support.', peopleAffected: 50, status: 'processed', createdAt: now, updatedAt: now, avatarColor: '#FCE8E8', avatarTextColor: '#C45B5B', initials: 'PR', reporter: 'Priya Ramesh', role: 'ORGANIZER', time: '8:42 AM', location: 'Bandra West Station' },
];

export const mockSkills: Skill[] = [
  { id: 'skl-1', name: 'CPR Certified', category: 'HEALTHCARE', isVerified: true, createdAt: now, updatedAt: now },
  { id: 'skl-2', name: 'Advanced First Aid', category: 'HEALTHCARE', isVerified: true, createdAt: now, updatedAt: now },
  { id: 'skl-3', name: 'Food Handling', category: 'LOGISTICS', isVerified: true, createdAt: now, updatedAt: now },
  { id: 'skl-4', name: 'Child Care', category: 'EDUCATION', isVerified: true, createdAt: now, updatedAt: now },
  { id: 'skl-5', name: 'Crowd Control', category: 'OTHER', isVerified: true, createdAt: now, updatedAt: now },
  { id: 'skl-6', name: 'Basic Nursing', category: 'HEALTHCARE', isVerified: false, createdAt: now, updatedAt: now },
  { id: 'skl-7', name: 'Teaching', category: 'EDUCATION', isVerified: false, createdAt: now, updatedAt: now },
  { id: 'skl-8', name: 'Logistics', category: 'LOGISTICS', isVerified: false, createdAt: now, updatedAt: now },
  { id: 'skl-9', name: 'Data Entry', category: 'OTHER', isVerified: false, createdAt: now, updatedAt: now },
  { id: 'skl-10', name: 'Driving', category: 'LOGISTICS', isVerified: false, createdAt: now, updatedAt: now },
  { id: 'skl-11', name: 'Counselling', category: 'HEALTHCARE', isVerified: false, createdAt: now, updatedAt: now },
];

export const mockUserSkills: UserSkill[] = [
  { id: 'uskl-1', userId: 'usr-1', skillId: 'skl-1', level: 'EXPERT', createdAt: now, updatedAt: now },
  { id: 'uskl-2', userId: 'usr-1', skillId: 'skl-2', level: 'INTERMEDIATE', createdAt: now, updatedAt: now },
  { id: 'uskl-3', userId: 'usr-1', skillId: 'skl-3', level: 'INTERMEDIATE', createdAt: now, updatedAt: now },
  { id: 'uskl-4', userId: 'usr-1', skillId: 'skl-4', level: 'BEGINNER', createdAt: now, updatedAt: now },
  { id: 'uskl-5', userId: 'usr-1', skillId: 'skl-5', level: 'EXPERT', createdAt: now, updatedAt: now },
  { id: 'uskl-6', userId: 'usr-4', skillId: 'skl-6', level: 'INTERMEDIATE', createdAt: now, updatedAt: now },
  { id: 'uskl-7', userId: 'usr-2', skillId: 'skl-8', level: 'EXPERT', createdAt: now, updatedAt: now },
  { id: 'uskl-8', userId: 'usr-3', skillId: 'skl-11', level: 'EXPERT', createdAt: now, updatedAt: now },
];

export const mockBadges: Badge[] = [
  { id: 'bdg-1', name: 'First Aid', icon: '🩺', description: 'Completed first aid training and applied it in the field.', pointsRequired: 100, createdAt: now, updatedAt: now },
  { id: 'bdg-2', name: 'Food Drive', icon: '🍱', description: 'Participated in 5 food distribution events.', pointsRequired: 200, createdAt: now, updatedAt: now },
  { id: 'bdg-3', name: 'Mentor', icon: '🎓', description: 'Tutored children for over 50 hours.', pointsRequired: 500, createdAt: now, updatedAt: now },
  { id: 'bdg-4', name: 'Logistics', icon: '🚚', description: 'Assisted in complex logistics operations.', pointsRequired: 300, createdAt: now, updatedAt: now },
  { id: 'bdg-5', name: 'Translator', icon: '🌍', description: 'Provided translation services for local communities.', pointsRequired: 150, createdAt: now, updatedAt: now },
  { id: 'bdg-6', name: 'Shelter', icon: '🏠', description: 'Helped setup emergency shelters.', pointsRequired: 400, createdAt: now, updatedAt: now },
  { id: 'bdg-7', name: 'First Responder', icon: '🚑', description: 'First to arrive at 10 high-urgency tasks.', pointsRequired: 600, createdAt: now, updatedAt: now },
  { id: 'bdg-8', name: 'Educator', icon: '📚', description: 'Lead education workshops.', pointsRequired: 350, createdAt: now, updatedAt: now },
  { id: 'bdg-9', name: 'Rising Star', icon: '🌟', description: 'Earned 1000 points in first month.', pointsRequired: 1000, createdAt: now, updatedAt: now },
  { id: 'bdg-10', name: 'Team Player', icon: '🤝', description: 'Collaborated with 20 different volunteers.', pointsRequired: 450, createdAt: now, updatedAt: now },
  { id: 'bdg-11', name: '10-Day Streak', icon: '🔥', description: 'Volunteered for 10 consecutive days.', pointsRequired: 500, createdAt: now, updatedAt: now },
  { id: 'bdg-12', name: 'Marathon', icon: '💪', description: 'Logged over 100 hours.', pointsRequired: 1000, createdAt: now, updatedAt: now },
  { id: 'bdg-13', name: 'Sharpshooter', icon: '🎯', description: 'Perfect rating on 50 tasks.', pointsRequired: 800, createdAt: now, updatedAt: now },
  { id: 'bdg-14', name: 'Community Hero', icon: '🌍', description: 'Impacted over 1000 lives.', pointsRequired: 2000, createdAt: now, updatedAt: now },
  { id: 'bdg-15', name: 'Quick Responder', icon: '⚡', description: 'Accepted tasks within 5 minutes.', pointsRequired: 700, isSpecial: true, createdAt: now, updatedAt: now },
  { id: 'bdg-16', name: 'Centurion', icon: '🏆', description: 'Completed 100 tasks.', pointsRequired: 3000, createdAt: now, updatedAt: now },
  { id: 'bdg-17', name: 'Platinum', icon: '💎', description: 'Reached Platinum Tier.', pointsRequired: 4000, createdAt: now, updatedAt: now },
  { id: 'bdg-18', name: 'Legend', icon: '👑', description: 'Top 10 on global leaderboard.', pointsRequired: 10000, createdAt: now, updatedAt: now },
];

export const mockUserBadges: UserBadge[] = [
  { id: 'ub-1', userId: 'usr-1', badgeId: 'bdg-1', createdAt: now, updatedAt: now },
  { id: 'ub-2', userId: 'usr-1', badgeId: 'bdg-2', createdAt: now, updatedAt: now },
  { id: 'ub-3', userId: 'usr-1', badgeId: 'bdg-3', createdAt: now, updatedAt: now },
  { id: 'ub-4', userId: 'usr-1', badgeId: 'bdg-7', createdAt: now, updatedAt: now },
  { id: 'ub-5', userId: 'usr-1', badgeId: 'bdg-8', createdAt: now, updatedAt: now },
  { id: 'ub-6', userId: 'usr-1', badgeId: 'bdg-9', createdAt: now, updatedAt: now },
  { id: 'ub-7', userId: 'usr-1', badgeId: 'bdg-10', createdAt: now, updatedAt: now },
  { id: 'ub-8', userId: 'usr-1', badgeId: 'bdg-11', createdAt: now, updatedAt: now },
  { id: 'ub-9', userId: 'usr-1', badgeId: 'bdg-12', createdAt: now, updatedAt: now },
  { id: 'ub-10', userId: 'usr-1', badgeId: 'bdg-13', createdAt: now, updatedAt: now },
  { id: 'ub-11', userId: 'usr-1', badgeId: 'bdg-14', createdAt: now, updatedAt: now },
  { id: 'ub-12', userId: 'usr-1', badgeId: 'bdg-15', createdAt: now, updatedAt: now },
];

export const mockActivityLogs: ActivityLog[] = [
  { id: 'act-1', userId: 'usr-1', type: 'COMPLETED_TASK', title: 'MEDICAL: Health Screening', description: 'Screened 45 children at Kurla East.', pointsEarned: 50, createdAt: yesterday, updatedAt: yesterday },
  { id: 'act-2', userId: 'usr-1', type: 'FILED_REPORT', title: 'Inventory Audit', description: 'Verified 500 meal packs at central warehouse.', pointsEarned: 15, createdAt: twoDaysAgo, updatedAt: twoDaysAgo },
  { id: 'act-3', userId: 'usr-1', type: 'RANK_UP', title: 'Earned Gold Tier Rank', description: 'Surpassed 1,200 total volunteering hours.', pointsEarned: 100, createdAt: twoDaysAgo, updatedAt: twoDaysAgo },
  { id: 'act-4', userId: 'usr-1', type: 'COMPLETED_TASK', title: 'MEDICAL: Camp Setup', description: 'Helped setup tents for the free medical camp.', pointsEarned: 50, createdAt: now, updatedAt: now },
];

// --- LEADERBOARD DATA ---
export const localLeaderboardUsers: User[] = [...mockUsers];

export const regionalLeaderboardUsers: User[] = [
  ...mockUsers.filter(u => u.id === 'usr-1'),
  { id: 'reg-1', name: 'Aarav Singh', email: 'aarav@ex.com', role: 'ORGANIZER', locationId: 'loc-1', points: 7800, tier: 'PLATINUM', pointsToNextTier: 0, initials: 'AS', currentStreak: 45, highestStreak: 50, hoursLogged: 320, hasVehicle: true, maxDistanceKm: 50, availability: ['MONDAY_AM'], createdAt: now, updatedAt: now },
  { id: 'reg-2', name: 'Meera Joshi', email: 'meera@ex.com', role: 'VOLUNTEER', locationId: 'loc-2', points: 6500, tier: 'PLATINUM', pointsToNextTier: 0, initials: 'MJ', currentStreak: 30, highestStreak: 40, hoursLogged: 210, hasVehicle: false, maxDistanceKm: 15, availability: ['TUESDAY_PM'], createdAt: now, updatedAt: now },
  { id: 'reg-3', name: 'Rohan Desai', email: 'rohan@ex.com', role: 'VOLUNTEER', locationId: 'loc-3', points: 5400, tier: 'PLATINUM', pointsToNextTier: 0, initials: 'RD', currentStreak: 25, highestStreak: 35, hoursLogged: 190, hasVehicle: true, maxDistanceKm: 30, availability: ['WEDNESDAY_EVE'], createdAt: now, updatedAt: now },
  { id: 'reg-4', name: 'Kavya Patel', email: 'kavya@ex.com', role: 'ORGANIZER', locationId: 'loc-4', points: 4900, tier: 'PLATINUM', pointsToNextTier: 0, initials: 'KP', currentStreak: 20, highestStreak: 25, hoursLogged: 150, hasVehicle: true, maxDistanceKm: 25, availability: ['THURSDAY_AM'], createdAt: now, updatedAt: now },
  { id: 'reg-5', name: 'Vikram Malhotra', email: 'vikram@ex.com', role: 'VOLUNTEER', locationId: 'loc-5', points: 4200, tier: 'PLATINUM', pointsToNextTier: 0, initials: 'VM', currentStreak: 15, highestStreak: 20, hoursLogged: 120, hasVehicle: false, maxDistanceKm: 10, availability: ['FRIDAY_PM'], createdAt: now, updatedAt: now },
  ...Array.from({ length: 12 }).map((_, i) => ({
    id: `reg-p${i}`, name: `Regional Star ${i + 1}`, email: `rs${i}@ex.com`, role: 'VOLUNTEER' as const, locationId: 'loc-1', points: 2600 + i * 100, tier: 'GOLD' as const, pointsToNextTier: 1400 - (i * 100), initials: 'RS', currentStreak: 10, highestStreak: 15, hoursLogged: 80, hasVehicle: false, maxDistanceKm: 10, availability: ['SATURDAY_AM'] as any, createdAt: now, updatedAt: now
  }))
];

export const globalLeaderboardUsers: User[] = [
  ...mockUsers.filter(u => u.id === 'usr-1'),
  { id: 'glb-1', name: 'Sophia Kim', email: 'sophia@ex.com', role: 'ORGANIZER', locationId: 'loc-1', points: 48000, tier: 'PLATINUM', pointsToNextTier: 0, initials: 'SK', currentStreak: 120, highestStreak: 150, hoursLogged: 1500, hasVehicle: true, maxDistanceKm: 100, availability: ['MONDAY_AM'], createdAt: now, updatedAt: now },
  { id: 'glb-2', name: 'Carlos Mendes', email: 'carlos@ex.com', role: 'VOLUNTEER', locationId: 'loc-2', points: 45000, tier: 'PLATINUM', pointsToNextTier: 0, initials: 'CM', currentStreak: 110, highestStreak: 130, hoursLogged: 1400, hasVehicle: true, maxDistanceKm: 80, availability: ['TUESDAY_PM'], createdAt: now, updatedAt: now },
  { id: 'glb-3', name: 'Amina Al-Fayed', email: 'amina@ex.com', role: 'ORGANIZER', locationId: 'loc-3', points: 41000, tier: 'PLATINUM', pointsToNextTier: 0, initials: 'AA', currentStreak: 100, highestStreak: 110, hoursLogged: 1200, hasVehicle: false, maxDistanceKm: 50, availability: ['WEDNESDAY_EVE'], createdAt: now, updatedAt: now },
  { id: 'glb-4', name: 'Liam O\'Connor', email: 'liam@ex.com', role: 'VOLUNTEER', locationId: 'loc-4', points: 38000, tier: 'PLATINUM', pointsToNextTier: 0, initials: 'LO', currentStreak: 95, highestStreak: 105, hoursLogged: 1100, hasVehicle: true, maxDistanceKm: 70, availability: ['THURSDAY_AM'], createdAt: now, updatedAt: now },
  { id: 'glb-5', name: 'Yuki Tanaka', email: 'yuki@ex.com', role: 'VOLUNTEER', locationId: 'loc-5', points: 35000, tier: 'PLATINUM', pointsToNextTier: 0, initials: 'YT', currentStreak: 85, highestStreak: 95, hoursLogged: 1000, hasVehicle: false, maxDistanceKm: 40, availability: ['FRIDAY_PM'], createdAt: now, updatedAt: now },
  ...Array.from({ length: 141 }).map((_, i) => ({
    id: `glb-p${i}`, name: `Global Hero ${i + 1}`, email: `gh${i}@ex.com`, role: 'VOLUNTEER' as const, locationId: 'loc-1', points: 2500 + i * 200, tier: 'PLATINUM' as const, pointsToNextTier: 0, initials: 'GH', currentStreak: 50, highestStreak: 60, hoursLogged: 400, hasVehicle: false, maxDistanceKm: 20, availability: ['SUNDAY_AM'] as any, createdAt: now, updatedAt: now
  }))
];

export const mockGlobalMetrics: GlobalMetric[] = [
  { id: 'gm-2', metricName: 'TASKS_COMPLETED', value: 185, createdAt: now, updatedAt: now },
  { id: 'gm-3', metricName: 'LIVES_IMPACTED', value: 3200, createdAt: now, updatedAt: now },
  { id: 'gm-4', metricName: 'MEALS_DISTRIBUTED', value: 5400, createdAt: now, updatedAt: now },
  { id: 'gm-5', metricName: 'HEALTH_CHECKS', value: 1200, createdAt: now, updatedAt: now },
];

export const mockUserNotifications: UserNotification[] = [
  { id: 'notif-1', userId: 'usr-1', title: 'New Urgent Task', message: 'Medical aid required near Dharavi North.', isRead: false, type: 'ALERT', createdAt: now, updatedAt: now },
  { id: 'notif-2', userId: 'usr-1', title: 'Badge Unlocked!', message: 'You earned the Quick Responder badge.', isRead: true, type: 'ACHIEVEMENT', createdAt: yesterday, updatedAt: yesterday },
];

export const mockUserPreferences: UserPreference[] = [
  { id: 'pref-4', userId: 'usr-4', pushEnabled: false, smsEnabled: false, offlineSync: false, locationSharing: false, createdAt: yesterday, updatedAt: now },
  { id: 'pref-1', userId: 'usr-1', pushEnabled: true, smsEnabled: false, offlineSync: true, locationSharing: true, createdAt: now, updatedAt: now },
  { id: 'pref-2', userId: 'usr-2', pushEnabled: true, smsEnabled: true, offlineSync: true, locationSharing: true, createdAt: now, updatedAt: now },
];

export const mockOfflineStats = [
  { id: 'os1', value: '5 min ago', label: 'LAST SYNC', icon: 'fa-regular fa-clock' },
  { id: 'os2', value: '4', label: 'CHANGES QUEUED', icon: 'fa-solid fa-cloud-arrow-up' },
  { id: 'os3', value: '340 KB', label: 'LOCAL STORAGE', icon: 'fa-solid fa-database', hasProgressBar: true, progressPercent: 34 },
  { id: 'os4', value: '98.2%', label: 'SUCCESS RATE', icon: 'fa-solid fa-arrow-trend-up' }
];

export const mockPendingActions = [
  { id: 'pa1', title: 'Added field report', desc: 'Health screening data', time: '10:23 AM', status: 'Queued', icon: 'fa-solid fa-plus' },
  { id: 'pa2', title: 'Updated volunteer availability', desc: 'Marked as available weekends', time: '10:15 AM', status: 'Queued', icon: 'fa-solid fa-pen' },
  { id: 'pa3', title: 'Added new need', desc: '50 families require meal support', time: '9:48 AM', status: 'Syncing', statusIcon: 'fa-solid fa-rotate', icon: 'fa-solid fa-plus' },
  { id: 'pa4', title: 'Edited task status', desc: 'Medical camp marked complete', time: '9:32 AM', status: 'Synced', statusIcon: 'fa-solid fa-check', icon: 'fa-solid fa-pen' },
  { id: 'pa5', title: 'Added impact metric', desc: 'Vaccination drive', time: '8:42 AM', status: 'Conflict', statusIcon: 'fa-solid fa-triangle-exclamation', icon: 'fa-solid fa-plus', actionLink: 'Resolve conflict \u2192' },
  { id: 'pa6', title: 'Removed outdated need', desc: 'Resolved water leak', time: '8:30 AM', status: 'Queued', icon: 'fa-solid fa-trash-can', isBorderNone: true }
];

import type { QueuedAction } from '../types/ui.types';

export const PENDING_ACTIONS: QueuedAction[] = [
  { id: 1, type: 'create', title: 'Added field report', detail: 'Health screening data', time: '10:23 AM', status: 'queued' },
  { id: 2, type: 'update', title: 'Updated volunteer availability', detail: 'Marked as available weekends', time: '10:15 AM', status: 'queued' },
  { id: 3, type: 'create', title: 'Added new need', detail: '50 families require meal support', time: '9:48 AM', status: 'syncing' },
  { id: 4, type: 'update', title: 'Edited task status', detail: 'Medical camp marked complete', time: '9:32 AM', status: 'synced' },
  { id: 5, type: 'create', title: 'Added impact metric', detail: 'Vaccination drive', time: '8:42 AM', status: 'conflict' },
  { id: 6, type: 'delete', title: 'Removed outdated need', detail: 'Resolved water leak', time: '8:30 AM', status: 'queued' }
];

export const mockLocalDataCards = [
  { id: 'ld1', title: 'Volunteer profiles', countText: `${mockUsers.length} records`, statusText: 'In sync', icon: 'fa-solid fa-users' },
  { id: 'ld2', title: 'Community needs', countText: `${mockTasks.length} records`, statusText: 'In sync', icon: 'fa-solid fa-location-dot' },
  { id: 'ld3', title: 'Field reports', countText: `${mockFieldReports.length} records`, statusText: 'Pending', icon: 'fa-regular fa-clipboard' },
  { id: 'ld4', title: 'Resource guides', countText: '8 records', statusText: 'In sync', icon: 'fa-solid fa-book-open' }
];

export const mockSimulatorLogs = [
  { id: 'sl1', time: '[10:23:05]', message: 'GET /api/volunteers - 200 OK (245ms)', typeClass: 'green' },
  { id: 'sl2', time: '[10:23:12]', message: 'POST /api/reports - 201 Created (180ms)', typeClass: 'green' },
  { id: 'sl3', time: '[10:24:01]', message: 'SYNC - Connection lost, queuing changes', typeClass: 'red' },
  { id: 'sl4', time: '[10:24:45]', message: 'SYNC - 3 changes queued for later sync', typeClass: 'yellow' },
  { id: 'sl5', time: '[10:25:10]', message: 'GET /api/needs - ERROR: Network unreachable', typeClass: 'red' },
  { id: 'sl6', time: '[10:26:22]', message: 'SYNC - Reconnected, syncing queued changes', typeClass: 'green' }
];

export const mockScoreDrivers = [
  {
    id: 'sd1',
    title: 'Absolute Priority Needs (e.g. Medical)',
    percentage: 45,
    type: 'priority'
  },
  {
    id: 'sd2',
    title: 'Number of Vulnerable People',
    percentage: 30,
    type: 'people'
  },
  {
    id: 'sd3',
    title: 'Reporter Severity Assessment',
    percentage: 15,
    type: 'severity'
  },
  {
    id: 'sd4',
    title: 'Time Elapsed Since Report',
    percentage: 10,
    type: 'time'
  }
];

export const mockStatusBanners = [
  {
    id: 'sb1',
    variant: 'CRITICAL',
    title: 'Total High-Urgency Tasks',
    value: 0,
    changeText: 'Critical Needs Unresolved',
    icon: 'fa-solid fa-heart-pulse'
  },
  { id: 'sb2', title: 'Average Response Time', value: 45, valueSuffix: 'mins', changeText: 'to accept critical tasks', icon: 'fa-solid fa-stopwatch' },
  {
    id: 'sb3',
    variant: 'SUCCESS',
    title: 'Field Report Pipeline Status',
    value: 'Online & Syncing',
    changeText: 'Last update: 2 mins ago',
    icon: 'fa-solid fa-tower-broadcast'
  }
];

export const mockVolunteerStats = [
  { id: 'v1', label: 'VOLUNTEERS' },
  { id: 'v2', label: 'AVAILABLE' },
  { id: 'v3', label: 'NEARBY', value: 3 }
];

export const mockPipelineStats = [
  {
    id: 'ps1',
    label: 'REPORTS TODAY',
    icon: 'fa-solid fa-inbox',
    type: 'reports'
  },
  {
    id: 'ps2',
    label: 'PROCESSED',
    icon: 'fa-regular fa-circle-check',
    type: 'processed'
  },
  {
    id: 'ps3',
    label: 'PENDING',
    icon: 'fa-regular fa-clock',
    type: 'pending'
  },
  {
    id: 'ps4',
    label: 'FLAGGED FOR REVIEW',
    icon: 'fa-solid fa-triangle-exclamation',
    type: 'flagged'
  }
];

export const mockPipelineTabs = [
  {
    id: 'pt1',
    name: 'All',
    icon: 'fa-solid fa-layer-group',
    type: 'all',
    active: true
  },
  {
    id: 'pt2',
    name: 'Medical',
    icon: 'fa-solid fa-heart-pulse',
    type: 'medical'
  },
  {
    id: 'pt3',
    name: 'Food',
    icon: 'fa-solid fa-utensils',
    type: 'food'
  },
  {
    id: 'pt4',
    name: 'Education',
    icon: 'fa-solid fa-book-open',
    type: 'education'
  }
];

export const mockStreakData = [
  { id: 's1', level: 3 }, { id: 's2', level: 3 }, { id: 's3', level: 2 }, { id: 's4', level: 4 }, { id: 's5', level: 3 }, { id: 's6', level: 4 }, { id: 's7', level: 3 }, { id: 's8', level: 4 }, { id: 's9', level: 3 }, { id: 's10', level: 4 }, { id: 's11', level: 2 }, { id: 's12', level: 1 }, { id: 's13', level: 2 }, { id: 's14', level: 3 },
  { id: 's15', level: 0 }, { id: 's16', level: 1 }, { id: 's17', level: 2 }, { id: 's18', level: 3 }, { id: 's19', level: 2 }, { id: 's20', level: 3 }, { id: 's21', level: 4 }, { id: 's22', level: 4 }, { id: 's23', level: 3 }, { id: 's24', level: 3 }, { id: 's25', level: 2 }, { id: 's26', level: 0 }, { id: 's27', level: 1 }, { id: 's28', level: 2 }
];

export const mockCategoryHours: Array<{ id: string; name: string; hours: number; type: string; colorClass?: string }> = [
  { id: 'c1', name: 'Medical aid', hours: 114, type: 'medical' },
  { id: 'c2', name: 'Education', hours: 45, type: 'education' },
  { id: 'c3', name: 'Food & logistics', hours: 28, type: 'food' },
  { id: 'c4', name: 'Survey & data', hours: 13, type: 'survey' }
];
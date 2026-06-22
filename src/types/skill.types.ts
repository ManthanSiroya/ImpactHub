import { type DateLike } from './user.types';

export type SkillCategory =
  | 'TECHNOLOGY'
  | 'HEALTHCARE'
  | 'EDUCATION'
  | 'CONSTRUCTION'
  | 'EVENT_MANAGEMENT'
  | 'COMMUNICATION'
  | 'LOGISTICS'
  | 'OTHER';

export type SkillProficiency = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  description?: string;
  isVerified?: boolean;
  createdAt?: DateLike;
  updatedAt?: DateLike;
}

export interface UserSkill {
  id: string;
  userId: string;
  skillId: string;
  level: SkillProficiency;
  proficiency?: SkillProficiency;
  yearsOfExperience?: number;
  isVerified?: boolean;
  createdAt?: DateLike;
  updatedAt?: DateLike;
}

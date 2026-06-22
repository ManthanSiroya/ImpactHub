import { type DateLike } from './user.types';

export type BadgeCategory = 'HOURS' | 'SKILL' | 'EVENT' | 'SPECIAL';

export type BadgeRarity = 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';

export interface Badge {
  id: string;
  name: string;
  description: string;
  category?: BadgeCategory;
  rarity?: BadgeRarity;
  icon: string;
  iconUrl?: string;
  pointsRequired: number;
  isSpecial?: boolean;
  criteria?: string;
  pointsValue?: number;
  createdAt?: DateLike;
  updatedAt?: DateLike;
}

export interface UserBadge {
  id: string;
  userId: string;
  badgeId: string;
  earnedAt?: DateLike;
  createdAt?: DateLike;
  updatedAt?: DateLike;
}

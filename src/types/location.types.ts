import { type DateLike } from './user.types';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export type Region =
  | 'NORTH_AMERICA'
  | 'SOUTH_AMERICA'
  | 'EUROPE'
  | 'ASIA'
  | 'AFRICA'
  | 'OCEANIA'
  | 'ANTARCTICA';

export interface Location {
  id: string;
  name: string;
  address?: string;
  city: string;
  stateOrProvince?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  region: Region;
  coordinates?: Coordinates;
  createdAt?: DateLike;
  updatedAt?: DateLike;
}

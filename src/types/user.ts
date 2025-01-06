import { Profile } from "./profile";

export type UserStatus = 'active' | 'suspended' | 'banned';
export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  profile?: Profile;
}
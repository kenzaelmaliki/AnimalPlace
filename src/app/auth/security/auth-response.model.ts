import { User } from '../../models/user.model';

export type AuthResponse = {
  token: string;
  user: User;
};
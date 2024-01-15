import { User } from '../../models/user.model';

export type AuthResponse = {
  Token: string;
  User: User;
};
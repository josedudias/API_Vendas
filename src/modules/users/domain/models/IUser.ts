export interface IUser {
  id: string;
  name: string;
  email: string;
  number: string;
  password: string;
  avatar: string;
  created_at: Date;
  updated_at: Date;
  getAvatarUrl(): string | null;
}

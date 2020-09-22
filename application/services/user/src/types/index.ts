import { Model } from 'sequelize';

export interface User extends Model {
  id: string;
  userHandle: string;
  userFirstName: string;
  userLastName: string;
  userEmailAddress: string;
  userPassword?: string;
  userLocation?: string;
  userRole?: UserType;
  userLastLoginDate?: string;
  userRegisterDate?: string;
  passwordValidator: (userPassword: string) => Promise<boolean>;
}

type UserType = 'admin' | 'standard';

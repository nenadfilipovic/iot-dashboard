export interface UserAttributes {
  userUniqueIndentifier: string;
  userHandle: string;
  userFirstName: string;
  userLastName: string;
  userEmailAddress: string;
  userPassword: string;
  userRole: UserType;
  userModifyDate: Date;
  userRegisterDate: Date;
}

export enum UserType {
  admin = 'admin',
  standard = 'standard',
}

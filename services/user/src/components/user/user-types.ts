export interface UserAttributes {
  id: string;
  handle: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  role: Role;
  modifyDate: Date;
  registerDate: Date;
}

export enum Role {
  admin = 'admin',
  standard = 'standard',
}

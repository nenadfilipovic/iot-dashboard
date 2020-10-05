export interface UserAttributes {
  id: string;
  handle: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  role: Type;
  modifyDate: Date;
  registerDate: Date;
}

export enum Type {
  admin = 'admin',
  standard = 'standard',
}

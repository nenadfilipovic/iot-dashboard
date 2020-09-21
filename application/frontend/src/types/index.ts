export interface User {
  userHandle: string;
  userFirstName: string;
  userLastName: string;
  userEmailAddress: string;
  userPassword?: string;
  userLocation?: string;
  userRole?: UserType;
  userLastLoginDate?: string;
  userRegisterDate?: string;
}

export enum UserAttributesCasting {
  userHandle = 'userHandle',
  userFirstName = 'userFirstName',
  userLastName = 'userLastName',
  userEmailAddress = 'userEmailAddress',
  userPassword = 'userPassword',
  userLocation = 'userLocation',
  userRole = 'userRole',
  userLastLoginDate = 'userLastLoginDate',
  userRegisterDate = 'userRegisterDate',
}

type UserType = 'admin' | 'standard';

export interface Device {
  deviceUniqueIndentifier: string;
  deviceName: string;
  deviceChannel: string;
  deviceDescription: string;
  deviceType: DeviceType;
  deviceCreateDate: string;
}

export enum DeviceAttributesCasting {
  deviceUniqueIndentifier = 'deviceUniqueIndentifier',
  deviceName = 'deviceName',
  deviceChannel = 'deviceChannel',
  deviceDescription = 'deviceDescription',
  deviceType = 'deviceType',
  deviceCreateDate = 'deviceCreateDate',
}

export type DeviceType = 'esp32' | 'esp8266';

export type ReactSVGComponent = React.FC<React.SVGProps<SVGSVGElement>>;

//

export interface MenuItemAttributes {
  itemPath: string;
  itemTitle: string;
  itemIcon: ReactSVGComponent;
}

export interface PageSegmentAttributes {
  headerTitle: string;
  headerSubtitle: string;
  headerIcon: ReactSVGComponent;
  headerActions?: JSX.Element;
  bodyContent?: JSX.Element;
  bodyActions?: JSX.Element;
}

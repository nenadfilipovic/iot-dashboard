declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    custom: {
      sidebarWidth: React.CSSProperties['width'];
      sidebarBackgroundColor: React.CSSProperties['backgroundColor'];
    };
  }
  interface ThemeOptions {
    custom?: {
      sidebarWidth?: React.CSSProperties['width'];
      sidebarBackgroundColor?: React.CSSProperties['backgroundColor'];
    };
  }
}

export type ReactIconComponent = React.FC<React.SVGProps<SVGSVGElement>>;

export interface DeviceAttributes {
  deviceId: string;
  deviceName: string;
  deviceTopic: string;
  deviceDescription: string;
  deviceType: DeviceTypes;
  deviceCreatedDate: string;
}

export enum DeviceAttributesCasting {
  deviceName = 'deviceName',
  deviceTopic = 'deviceTopic',
  deviceDescription = 'deviceDescription',
  deviceType = 'deviceType',
  deviceCreatedDate = 'deviceCreatedDate',
}

export enum DeviceTypesCasting {
  esp32 = 'esp32',
  esp8266 = 'esp8266',
}

type DeviceTypes = 'esp32' | 'esp8266';

export interface UserAttributes {
  userFirstName: string;
  userLastName: string;
  userUniqueId: string;
  userPassword?: string;
  userEmail: string;
  userImage: string;
  userLocation: string;
  userLastLogin: string;
  userCreatedAccount: string;
}

export enum UserAttributesCasting {
  userFirstName = 'userFirstName',
  userLastName = 'userLastName',
  userUniqueId = 'userUniqueId',
  userPassword = 'userPassword',
  userEmail = 'userEmail',
  userImage = 'userImage',
  userLocation = 'userLocation',
}

export interface MenuItemAttributes {
  itemPath: string;
  itemTitle: string;
  itemIcon: ReactIconComponent;
}

export interface PageSegmentAttributes {
  headerTitle: string;
  headerSubtitle: string;
  headerIcon: ReactIconComponent;
  headerActions?: JSX.Element;
  bodyContent?: JSX.Element;
  bodyActions?: JSX.Element;
}

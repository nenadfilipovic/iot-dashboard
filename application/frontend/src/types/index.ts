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

export interface DeviceAttributes {
  deviceName: string;
  deviceTopic: string;
  deviceDescription: string;
  deviceType: DeviceTypes;
  deviceCreationDate: string;
}

export enum DeviceAttributesCasting {
  deviceName = 'deviceName',
  deviceTopic = 'deviceTopic',
  deviceDescription = 'deviceDescription',
  deviceType = 'deviceType',
  deviceCreationDate = 'deviceCreationDate',
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
  userCountry: string;
  userImage: string;
  userLastLogin: string;
}

export enum UserAttributesCasting {
  userFirstName = 'userFirstName',
  userLastName = 'userLastName',
  userUniqueId = 'userUniqueId',
  userPassword = 'userPassword',
  userEmail = 'userEmail',
  userCountry = 'userCountry',
  userImage = 'userImage',
}

export interface MenuItemAttributes {
  itemPath: string;
  itemTitle: string;
  itemIcon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface PageSegmentAttributes {
  headerTitle: string;
  headerSubtitle: string;
  headerIcon: React.FC<React.SVGProps<SVGSVGElement>>;
  headerActions?: JSX.Element;
  bodyContent?: JSX.Element;
  bodyActions?: JSX.Element;
}

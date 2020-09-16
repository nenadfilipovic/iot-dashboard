declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    customProperties: {
      sidebarWidth: React.CSSProperties['width'];
      appBarHeight: React.CSSProperties['height'];
    };
  }
  interface ThemeOptions {
    customProperties?: {
      sidebarWidth?: React.CSSProperties['width'];
      appBarHeight?: React.CSSProperties['height'];
    };
  }
}

export interface DeviceAttributes {
  deviceName: string;
  deviceTopic: string;
  deviceDescription: string;
  deviceType: string;
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

export interface UserAttributes {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
}

export enum UserAttributesCasting {
  firstName = 'firstName',
  lastName = 'lastName',
  username = 'username',
  password = 'password',
  email = 'email',
}

export interface MenuItemAttributes {
  itemPath: string;
  itemTitle: string;
  itemIcon: React.FC<React.SVGProps<SVGSVGElement>>;
}

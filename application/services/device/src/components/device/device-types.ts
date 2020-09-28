export interface DeviceAttributes {
  deviceUniqueIndentifier: string;
  deviceOwner: string;
  deviceName: string;
  deviceChannel: string;
  deviceDescription: string;
  deviceType: DeviceType;
  deviceModifyDate: Date;
  deviceRegisterDate: Date;
}

export enum DeviceType {
  esp32 = 'esp32',
  esp8266 = 'esp8266',
}

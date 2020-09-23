import { Model } from 'sequelize';

export interface Device extends Model {
  deviceUniqueIndentifier: string;
  deviceOwner: string;
  deviceName: string;
  deviceChannel: string;
  deviceDescription: string;
  deviceType: DeviceType;
  deviceCreateDate: string;
}

type DeviceType = 'esp32' | 'esp8266';

export interface DeviceAttributes {
  id: string;
  owner: string;
  name: string;
  channel: string;
  description: string;
  type: Type;
  modifyDate: Date;
  registerDate: Date;
}

export enum Type {
  esp32 = 'esp32',
  esp8266 = 'esp8266',
}

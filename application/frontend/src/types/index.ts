export enum Type {
  esp32,
  esp8266,
}

export interface PageSegmentAttributes {
  title: string;
  subheader: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  content?: JSX.Element;
  actions?: JSX.Element;
}

export interface DeviceAttributes {
  name: string;
  topic: string;
  type: Type;
  description: string;
}

export interface LoginAttributes {
  username: string;
  password: string;
}

export interface RegisterAttributes {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

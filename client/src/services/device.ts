import { buildClient } from '../api/client';
import { DeviceAttributes, DevicesApi } from '../types';

const client = buildClient('devices');

const _registerDevice = (formData: DeviceAttributes) => {
  return client.post<DevicesApi>('/', formData);
};

const _modifyDevice = (
  id: DeviceAttributes['id'],
  formData: DeviceAttributes,
) => {
  return client.patch<DevicesApi>(`/${id}`, formData);
};

const _removeDevice = (id: DeviceAttributes['id']) => {
  return client.delete<DevicesApi>(`/${id}`);
};

const _getSingleDevice = (id: DeviceAttributes['id']) => {
  return client.get<DevicesApi>(`/${id}`);
};

const _getAllDevices = () => {
  return client.get<DevicesApi>(`/`);
};

export {
  _getAllDevices,
  _removeDevice,
  _registerDevice,
  _modifyDevice,
  _getSingleDevice,
};

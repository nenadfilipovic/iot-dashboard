import { client } from '../api/client';
import { DeviceAttributes } from '../types';

const _registerDevice = (formData: DeviceAttributes) => {
  return client.post('/devices', formData);
};

const _modifyDevice = (
  id: DeviceAttributes['id'],
  formData: DeviceAttributes,
) => {
  return client.patch(`/devices/${id}`, formData);
};

const _removeDevice = (id: DeviceAttributes['id']) => {
  return client.delete(`/devices/${id}`);
};

const _getSingleDevice = (id: DeviceAttributes['id']) => {
  return client.get(`/devices/${id}`);
};

const _getAllDevices = () => {
  return client.get(`/devices/`);
};

export {
  _getAllDevices,
  _removeDevice,
  _registerDevice,
  _modifyDevice,
  _getSingleDevice,
};

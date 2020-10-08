import { buildClient } from '../api/client';
import { DeviceAttributes } from '../types';

const client = buildClient('devices');

const _registerDevice = (formData: DeviceAttributes) => {
  return client.post('/', formData);
};

const _modifyDevice = (
  id: DeviceAttributes['id'],
  formData: DeviceAttributes,
) => {
  return client.patch(`/${id}`, formData);
};

const _removeDevice = (id: DeviceAttributes['id']) => {
  return client.delete(`/${id}`);
};

const _getSingleDevice = (id: DeviceAttributes['id']) => {
  return client.get(`/${id}`);
};

const _getAllDevices = () => {
  return client.get(`/`);
};

export {
  _getAllDevices,
  _removeDevice,
  _registerDevice,
  _modifyDevice,
  _getSingleDevice,
};

import { client } from '../api/client';
import { Device } from '../types';

const _registerDevice = (formData: Device) => {
  return client.post('/devices', formData);
};

const _modifyDevice = (
  deviceUniqueIndentifier: Device['deviceUniqueIndentifier'],
  formData: Device,
) => {
  return client.patch(`/devices/${deviceUniqueIndentifier}`, formData);
};

const _removeDevice = (
  deviceUniqueIndentifier: Device['deviceUniqueIndentifier'],
) => {
  return client.delete(`/devices/${deviceUniqueIndentifier}`);
};

const _getSingleDevice = (
  deviceUniqueIndentifier: Device['deviceUniqueIndentifier'],
) => {
  return client.get(`/devices/${deviceUniqueIndentifier}`);
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

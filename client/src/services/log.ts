import { buildClient } from '../api/client';
import { LogsApi } from '../types';

const client = buildClient('logs');

const _getLogs = async (deviceId: string) => {
  return client.get<LogsApi>(`/${deviceId}`);
};

export { _getLogs };

import { LogAttributes, GET_LOGS, LogActionTypes } from '../types';

const getLogs = (deviceLogs: LogAttributes): LogActionTypes => {
  return {
    type: GET_LOGS,
    payload: deviceLogs,
  };
};

export { getLogs };

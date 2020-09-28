import { queue } from '../index';
import { registerLog } from '../../components/log';

const logAddedListener = (): void => {
  queue.activateConsumer(registerLog);
};

export { logAddedListener };

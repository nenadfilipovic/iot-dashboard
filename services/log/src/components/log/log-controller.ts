import { Message } from 'amqp-ts';
import { DefaultContext } from 'koa';

import { influxDatabase } from '../../database';

/**
 * Display all device logs
 */

const getAllLogs = async (ctx: DefaultContext): Promise<void> => {
  const deviceOwner = ctx.state.user.id;
  const deviceChannel = ctx.request.params.id;

  const recievedLogs = await influxDatabase.query(
    `select *::field from "${deviceOwner}" where device = '${deviceChannel}' order by time desc`,
  );

  ctx.body = {
    status: 'success',
    message: 'You have successfully retrieved all your logs.',
    data: recievedLogs,
  };
};

/**
 * Register log on event
 */

const registerLogViaMqtt = async (payload: Message): Promise<void> => {
  try {
    const { topic, message } = payload.getContent() as {
      topic: string;
      message: { [key: string]: number };
    };

    /**
     * In influxDB measurement is something like
     * table and tag is like unique column
     */

    /**
     * Mqtt topic carry 2 important information,
     * user unique handler and device channel,
     * example admin/dashboard,
     * we use user handle as measurement name,
     * and device channel as unique tag inside measurement
     */

    const [userHandle, deviceChannel] = topic.split('/');

    await influxDatabase.writeMeasurement(userHandle, [
      {
        tags: { device: deviceChannel },
        fields: message,
      },
    ]);

    payload.ack();
  } catch {
    payload.reject();
  }
};

/**
 * Remove complete measurement when
 * belonging user remove its account
 */

const removeMeasurementOnRemoveUser = async (
  payload: Message,
): Promise<void> => {
  try {
    const userHandle = payload.getContent() as string;

    /**
     * Every user have its measurement table
     * so we destroy it after he
     * disable his account
     */

    await influxDatabase.query(`
        drop measurement "${userHandle}"
      `);

    payload.ack();
  } catch {
    payload.reject();
  }
};

/**
 * Remove only series that belong to device
 * that is beign deleted
 */

const removeSeriesOnRemoveDevice = async (payload: Message): Promise<void> => {
  try {
    const { deviceOwner, deviceChannel } = payload.getContent() as {
      deviceOwner: string;
      deviceChannel: string;
    };

    await influxDatabase.query(`
        drop series from "${deviceOwner}" where "device"='${deviceChannel}'
      `);

    payload.ack();
  } catch {
    payload.reject();
  }
};

export {
  getAllLogs,
  registerLogViaMqtt,
  removeMeasurementOnRemoveUser,
  removeSeriesOnRemoveDevice,
};

import { Message } from 'amqp-ts';
import { DefaultContext } from 'koa';

import { influxDatabase } from '../../database';

/**
 * Display all device logs
 */

const getAllLogs = async (ctx: DefaultContext): Promise<void> => {
  const owner = ctx.state.user.id;
  const channel = ctx.request.params.id;

  const logs = await influxDatabase.query(
    `select *::field from "${owner}" where device = '${channel}' order by time desc`,
  );

  ctx.body = {
    status: 'success',
    data: { logs },
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

    const [handle, channel] = topic.split('/');

    await influxDatabase.writeMeasurement(handle, [
      {
        tags: { device: channel },
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
    const handle = payload.getContent() as string;

    /**
     * Every user have its measurement table
     * so we destroy it after he
     * disable his account
     */

    await influxDatabase.query(`
        drop measurement "${handle}"
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
    const { owner, channel } = payload.getContent() as {
      owner: string;
      channel: string;
    };

    await influxDatabase.query(`
        drop series from "${owner}" where "device"='${channel}'
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

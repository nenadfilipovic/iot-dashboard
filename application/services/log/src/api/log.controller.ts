import { DefaultContext } from 'koa';

import { db } from '../db/influx';

/**
 * Create log...
 */

const create = async (ctx: Context): Promise<void> => {
  // trying
  db.writeMeasurement('test', [
    {
      tags: { device: 'device-1' },
      fields: {},
    },
  ]).then(() =>
    db
      .query(
        `
  select * from test
  where device = 'device-1'
  order by time desc
  limit 10
`,
      )
      .then((result) => console.log(result)),
  );
};

/**
 * Display all logs...
 */

const getAll = async (ctx: Context): Promise<void> => {
  // trying
  db.queryRaw(
    `
  select * from test
  where device = 'device-1'
  order by time desc
  limit 10
`,
  ).then((rawData) => console.log(rawData));
};
/**
 * Destroy all logs...
 */

const destroyAll = async (ctx: Context): Promise<void> => {};

export { create, getAll, destroyAll };

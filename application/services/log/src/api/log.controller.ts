import { DefaultContext } from 'koa';

/**
 * Create log...
 */

const create = async (ctx: Context): Promise<void> => {};

/**
 * Display all logs...
 */

const getAll = async (ctx: Context): Promise<void> => {};

/**
 * Destroy all logs...
 */

const destroyAll = async (ctx: Context): Promise<void> => {};

export { create, getAll, destroyAll };

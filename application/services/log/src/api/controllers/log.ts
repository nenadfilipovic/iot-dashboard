import { Context } from 'koa';

const create = async (ctx: Context): Promise<void> => {
  /**
   * Check provided user email
   * If it exist, compare provided password with users password
   * If ok generate JWT
   * Store token in session object
   */
};

const getMany = async (ctx: Context): Promise<void> => {
  /**
   * Check provided user email
   * If it exist, compare provided password with users password
   * If ok generate JWT
   * Store token in session object
   */
};

const destroyMany = async (ctx: Context): Promise<void> => {
  /**
   * Check provided user email
   * If it exist, compare provided password with users password
   * If ok generate JWT
   * Store token in session object
   */
};

export { create, getMany, destroyMany };

import { Context } from 'koa';

const add = async (ctx: Context): Promise<void> => {
  /**
   * Check provided user email
   * If it exist, compare provided password with users password
   * If ok generate JWT
   * Store token in session object
   */
};

const getAll = async (ctx: Context): Promise<void> => {
  /**
   * Set session as null, delete session
   */
};

const removeAll = async (ctx: Context): Promise<void> => {
  /**
   * Set session as null, delete session
   */
};

export { add, getAll, removeAll };

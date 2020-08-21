import { Context } from 'koa';

const create = async (ctx: Context): Promise<void> => {
  /*const { email, password } = ctx.request.body;
  const existingUser = await prisma.authentication.findOne({ where: { email: email } });
  if (!existingUser) {
    // Add custom error
    throw new Error('User with provided email does not exist.');
  }*/
  /**
   * Check provided user email
   * If it exist, compare provided password with users password
   * If ok generate JWT
   * Store token in session object
   */
};

const modify = async (ctx: Context): Promise<void> => {
  /*const { email, password } = ctx.request.body;
  const existingUser = await prisma.authentication.findOne({ where: { email: email } });
  if (!existingUser) {
    // Add custom error
    throw new Error('User with provided email does not exist.');
  }*/
  /**
   * Check provided user email
   * If it exist, compare provided password with users password
   * If ok generate JWT
   * Store token in session object
   */
};

const destroy = async (ctx: Context): Promise<void> => {
  /*const { email, password } = ctx.request.body;
  const existingUser = await prisma.authentication.findOne({ where: { email: email } });
  if (!existingUser) {
    // Add custom error
    throw new Error('User with provided email does not exist.');
  }*/
  /**
   * Check provided user email
   * If it exist, compare provided password with users password
   * If ok generate JWT
   * Store token in session object
   */
};

const getOne = async (ctx: Context): Promise<void> => {
  /*const { email, password } = ctx.request.body;
  const existingUser = await prisma.authentication.findOne({ where: { email: email } });
  if (!existingUser) {
    // Add custom error
    throw new Error('User with provided email does not exist.');
  }*/
  /**
   * Check provided user email
   * If it exist, compare provided password with users password
   * If ok generate JWT
   * Store token in session object
   */
};

export { create, modify, destroy, getOne };

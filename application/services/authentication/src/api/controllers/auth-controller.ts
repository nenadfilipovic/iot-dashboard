import { Context } from 'koa';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const login = async (ctx: Context): Promise<void> => {
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

const logout = async (ctx: Context): Promise<void> => {
  /**
   * Set session as null, delete session
   */
};

export { login, logout };

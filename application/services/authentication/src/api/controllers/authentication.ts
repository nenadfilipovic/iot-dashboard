import { Context } from 'koa';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

import { Password } from '../../helpers/password';
import { jwtSecret } from '../../config';

const prisma = new PrismaClient();

const login = async (ctx: Context): Promise<void> => {
  /*
  const { email, password } = ctx.request.body;
  // Validation here
  const existingUser = await prisma.authentication.findOne({
    where: { email: email },
  });
  if (!existingUser) {
    // Add custom error
    throw new Error('User with provided email does not exist.');
  }
  const correctPassword = Password.compare(existingUser.password, password);
  if (!correctPassword) {
    // Add custom error
    throw new Error('Provided password is not correct.');
  }
  const token = jwt.sign({ id: existingUser.user_id }, jwtSecret);

  ctx.body = { existingUser };
  
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

import { Context } from 'koa';

const logout = async (ctx: Context): Promise<void> => {
  try {
    // Set session as null, delete session
  } catch (error) {
    console.error(error);
  }
};

export { logout };

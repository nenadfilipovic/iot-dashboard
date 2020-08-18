import { Context } from 'koa';

const login = async (ctx: Context): Promise<void> => {
  try {
    // Check if user exist by email
    //
    // Compare provided password with users password
    //
    // If ok generate JWT
    //
    // Store token in session object
  } catch (error) {
    console.error(error);
  }
};

export { login };

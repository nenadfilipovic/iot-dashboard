import { DefaultContext } from 'koa';

import { loginSchema } from '../../services/schemas';
import { ValidationError } from '../../errors/validation';
import { CustomError } from '../../errors/custom';
import { Authentication } from '../models/Authentication';
import { Password } from '../../services/password';
import { createToken } from '../../services/jwt';

const login = async (ctx: DefaultContext): Promise<void> => {
  const { email, password } = ctx.request.body;

  const { error, value: validData } = loginSchema.validate({ email, password });

  if (error) {
    throw new ValidationError(error);
  }

  const user = await Authentication.findOne({
    where: { email: validData.email },
  });

  if (!user) {
    throw new CustomError('Incorrect email or password.', 401);
  }

  const correctPassword = await Password.compare(
    validData.password,
    user.password,
  );

  if (!correctPassword) {
    throw new CustomError('Incorrect email or password.', 401);
  }

  const token = createToken(user.userId);

  ctx.session = {
    jwt: token,
  };

  Object.assign(user, { password: undefined });

  ctx.body = {
    status: 'success',
    data: { user },
  };
};

export { login };

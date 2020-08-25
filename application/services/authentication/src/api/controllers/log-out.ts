import { DefaultContext } from 'koa';

const logout = async (ctx: DefaultContext): Promise<void> => {
  ctx.session = null;
  ctx.body = {};
};

export { logout };

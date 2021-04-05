import { Context, Next } from 'koa';

import { log } from '../utils/helper';

export default async (ctx: Context, next: Next) => {
  // log(`[CORS] request method: ${ctx.request.method}\n`);
  // log(`[CORS] request path: ${ctx.request.origin}\n`);

  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, client-name, client-version'
  );
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method === 'OPTIONS') {
    return (ctx.body = 200);
  } else {
    await next();
  }
};

import 'reflect-metadata';
import Koa from 'koa';
import dotenv from 'dotenv';
import cors from './app/middlewares/cors';
import { log } from './app/utils/helper';
import initialize from './app/server';

const dev = process.env.NODE_ENV === 'development';

dotenv.config({ path: dev ? '.env' : '.env.prod' });

log(`[Env] Loading ${dev ? '[DEV]' : '[PROD]'} File`);

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  try {
    const app = new Koa();

    app.use(cors);

    const server = await initialize();

    const httpServer = app.listen(PORT, () => {
      log(`[Apollo Server] Server ready at http://localhost:${PORT}/graphql`);
    });

    // or app.use(server.getMiddleware({}))
    server.applyMiddleware({ app });

    server.installSubscriptionHandlers(httpServer);
  } catch (error) {
    console.log(error);
  }
}

log(`=== [GraphQL Explorer] Bootstrapping ===`);

bootstrap();

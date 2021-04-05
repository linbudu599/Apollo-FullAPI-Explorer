import 'reflect-metadata';
import { buildSchemaSync } from 'type-graphql';
import { ApolloServer as ApolloVercelServer } from '@saeris/apollo-server-vercel';

import SubstanceResolver from './resolver';

const schema = buildSchemaSync({
  resolvers: [SubstanceResolver],
});

const server = new ApolloVercelServer({
  schema,
  playground: true,
  introspection: true,
});

export default server.createHandler({
  cors: {
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
  },
});

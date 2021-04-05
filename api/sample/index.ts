import 'reflect-metadata';
import { buildSchemaSync } from 'type-graphql';
import * as TypeORM from 'typeorm';
import { ApolloServer as ApolloVercelServer } from '@saeris/apollo-server-vercel';

import RecipeResolver from './resolver';

const schema = buildSchemaSync({
  resolvers: [RecipeResolver],
});

const server = new ApolloVercelServer({
  schema,
  playground: true,
  introspection: true,
});

export default server.createHandler();

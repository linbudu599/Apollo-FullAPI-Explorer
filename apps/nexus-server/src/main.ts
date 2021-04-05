import { makeSchema } from 'nexus';
import { ApolloServer } from 'apollo-server';
import * as path from 'path';
import * as chalk from 'chalk';
import { TodoType } from './app/types/todo';
import { Query } from './app/types/query';

const schema = makeSchema({
  types: { Query, TodoType },
  outputs: {
    schema: path.join(__dirname, '../nexus-schema.graphql'),
    typegen: path.join(__dirname, 'nexus-typegen.ts'),
  },
  sourceTypes: {
    modules: [
      {
        module: path.join(__dirname, 'typeDefs.ts'),
        alias: 't',
      },
    ],
  },
});

const server = new ApolloServer({
  schema,
  introspection: true,
});

server.listen({ port: 4000 }, () =>
  console.log(
    chalk.green(`Server ready at http://localhost:4000${server.graphqlPath}`)
  )
);

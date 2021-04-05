import { objectType } from 'nexus';

export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.list.field('todos', {
      type: 'Todo',
      resolve: (root, args, ctx) => {
        return [{ id: 1, title: 'Nexus', content: 'Nexus + GraphQL' }];
      },
    });
  },
});

import { objectType } from 'nexus';

export const TodoType = objectType({
  name: 'Todo',
  definition(t) {
    t.id('id');
    t.string('title');
    t.string('content');
  },
});

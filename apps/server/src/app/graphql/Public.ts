import { registerEnumType, createUnionType } from 'type-graphql';

import Executor from '../entities/Executor';
import Task from '../entities/Task';

export enum DifficultyLevel {
  ROOKIE,
  NOVICE,
  BEGINNER,
  SKILLED,
  MASTER,
  LEGEND,
  OLD_DOMINATOR,
}

registerEnumType(DifficultyLevel, {
  name: 'DifficultyLevel',
  description: 'Executor Skill & Task Difficulty Level Enum',
});

export const LevelQueryResult = createUnionType({
  name: 'LevelQueryResult',
  types: () => [Executor, Task] as const,
});

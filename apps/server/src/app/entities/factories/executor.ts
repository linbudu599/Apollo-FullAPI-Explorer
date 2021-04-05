import * as Faker from 'faker';
import Executor from '../Executor';
import { define } from 'typeorm-seeding';

define(Executor, (faker: typeof Faker) => {
  const executor = new Executor();

  executor.name = faker.name.firstName();

  return executor;
});

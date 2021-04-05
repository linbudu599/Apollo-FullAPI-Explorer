import type { Seeder, Factory } from 'typeorm-seeding';
import Executor from '../Executor';

export default class CreateExcutor implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Executor)().createMany(10);
  }
}

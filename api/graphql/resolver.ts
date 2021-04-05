// @ts-nocheck
import { Resolver, Query } from 'type-graphql';
import { Connection } from 'typeorm';

import SubstanceEntity from './entity';
import Substance from './module';

import { connector } from './util';

@Resolver((of) => Substance)
export default class SubstanceResolver {
  connection: Connection;

  @Query(() => [Substance])
  async QueryAllSubstances() {
    try {
      this.connection = await connector(this.connection, [SubstanceEntity]);
      return await this.connection.manager.find(SubstanceEntity);
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

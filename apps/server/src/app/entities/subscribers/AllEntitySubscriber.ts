import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';

import Account from '../Account';
import Executor from '../Executor';
import Task from '../Task';
import Substance from '../Substance';
import Record from '../Record';

type AvaliableEntities = Account | Executor | Task | Substance | Record;

/**
 *
 * TypeORM Subscribers (listen to all entities)
 * @export
 * @class PostSubscriber
 * @implements {EntitySubscriberInterface}
 */
@EventSubscriber()
export class AllSubscriber implements EntitySubscriberInterface {
  beforeInsert(event: InsertEvent<AvaliableEntities>) {
    // console.log(`BEFORE ENTITY INSERTED: `, event.entity);
  }

  afterInsert(event: InsertEvent<AvaliableEntities>) {
    // console.log(`AFTER ENTITY INSERTED: `, event.entity);
  }

  beforeUpdate(event: UpdateEvent<AvaliableEntities>) {
    // console.log(`BEFORE ENTITY UPDATED: `, event.entity);
  }

  afterUpdate(event: UpdateEvent<AvaliableEntities>) {
    // console.log(`AFTER ENTITY UPDATED: `, event.entity);
  }

  beforeRemove(event: RemoveEvent<AvaliableEntities>) {
    // console.log(
    //   `BEFORE ENTITY WITH ID ${event.entityId} REMOVED: `,
    //   event.entity
    // );
  }

  afterRemove(event: RemoveEvent<AvaliableEntities>) {
    // console.log(
    //   `AFTER ENTITY WITH ID ${event.entityId} REMOVED: `,
    //   event.entity
    // );
  }

  afterLoad(entity: AvaliableEntities) {
    // console.log(`AFTER ENTITY LOADED: `, entity);
  }
}

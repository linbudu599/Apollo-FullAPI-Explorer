import DataLoader from 'dataloader';
import { UseMiddleware } from 'type-graphql';
import Container from 'typedi';

import { RelationMetadata } from 'typeorm/metadata/RelationMetadata';
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';

import { keyBy, groupBy, Dictionary } from 'lodash';

import type { ObjectType, Connection } from 'typeorm';
import type { IContext, TypeGraphQLDataLoaderContext } from '../../typing';

type KeyFunc = (root: any) => any | any[] | undefined;

type ReturnTypeFunc<T> = (type?: void) => ObjectType<T>;

interface TypeormLoaderOption {
  selfKey: boolean;
}

export function TypeormLoader(
  keyFunc: KeyFunc,
  option?: TypeormLoaderOption
): PropertyDecorator;

export function TypeormLoader<V>(
  typeFunc: ReturnTypeFunc<V>,
  keyFunc: KeyFunc,
  option?: TypeormLoaderOption
): PropertyDecorator;

// TODO: reduce overload
// @TypeormLoader((type) => User, (photo: Photo) => photo.userId)
export function TypeormLoader<V>(
  typeFuncOrKeyFunc: ReturnTypeFunc<V> | KeyFunc,
  keyFuncOrOption?: KeyFunc | TypeormLoaderOption,
  option?: TypeormLoaderOption
): PropertyDecorator {
  const getArgs = (): [KeyFunc, TypeormLoaderOption | undefined] => {
    return option != null || typeof keyFuncOrOption == 'function'
      ? [keyFuncOrOption as KeyFunc, option]
      : [typeFuncOrKeyFunc as KeyFunc, keyFuncOrOption as TypeormLoaderOption];
  };
  return TypeormLoaderImpl<V>(...getArgs());
}

function TypeormLoaderImpl<V>(
  keyFunc: KeyFunc,
  option?: TypeormLoaderOption
): PropertyDecorator {
  return (target: any, propertyKey: string | symbol) => {
    UseMiddleware(async ({ root, context }, next) => {
      // tgdLoader will be attached at ApolloServerLoaderPlugin
      // (with connectionGetter option)
      const tgdContext = (context as IContext).tgdLoader;

      if (tgdContext.connectionGetter == null) {
        throw Error('[TypeGraphQL DataLoader] typeormGetConnection is not set');
      }

      const relation = tgdContext
        .connectionGetter()
        // Class which @TypeormLoader() applied
        // get class metadata as TypeORM entity
        .getMetadata(target.constructor)
        // get props relation by property name
        .findRelationWithPropertyPath(propertyKey.toString());

      // skip if decorated prop has no relations
      if (relation == null) {
        return await next();
      }

      // selfKey option provided
      // only work at OneToMany/OneToOne withour @JoinColumn
      // (which means prop cannot be the OneToOne Relation Owner)
      if (
        option?.selfKey &&
        !(relation.isOneToMany || relation.isOneToOneNotOwner)
      ) {
        throw Error(
          '[TypeGraphQL DataLoader] selfKey option is available only for OneToMany or OneToOneNotOwner'
        );
      }

      // pick a special loader
      const appropriateHandler =
        relation.isManyToOne || relation.isOneToOneOwner
          ? handleToOne
          : relation.isOneToMany
          ? option?.selfKey
            ? handleOneToManyWithSelfKey
            : handleToMany
          : relation.isOneToOneNotOwner
          ? option?.selfKey
            ? handleOneToOneNotOwnerWithSelfKey
            : handleToOne
          : relation.isManyToMany
          ? handleToMany
          : () => next();

      return await appropriateHandler<V>(keyFunc, root, tgdContext, relation);
    })(target, propertyKey);
  };
}

async function handler<V>(
  { requestId, connectionGetter }: TypeGraphQLDataLoaderContext,
  relation: RelationMetadata,
  columns: ColumnMetadata[],
  newDataloader: (connection: Connection) => DataLoader<any, V>,
  callback: (
    dataloader: DataLoader<any, V>,
    columns: ColumnMetadata[]
  ) => Promise<any>
) {
  if (connectionGetter == null) {
    throw Error('Connection is not available');
  }

  if (columns.length !== 1) {
    throw Error('Loading by multiple columns as foreign key is not supported.');
  }

  // register dataloader
  const serviceId = `tgd-typeorm#${relation.entityMetadata.tableName}#${relation.propertyName}`;
  const container = Container.of(requestId);
  if (!container.has(serviceId)) {
    container.set(serviceId, newDataloader(connectionGetter()));
  }

  return callback(container.get<DataLoader<any, any>>(serviceId), columns);
}

async function handleToMany<V>(
  foreignKeyFunc: (root: any) => any | undefined,
  root: any,
  tgdContext: TypeGraphQLDataLoaderContext,
  relation: RelationMetadata
) {
  return handler(
    tgdContext,
    relation,
    relation.inverseEntityMetadata.primaryColumns,
    (connection) => new ToManyDataloader<V>(relation, connection),
    async (dataloader) => {
      const fks = foreignKeyFunc(root);
      return await dataloader.loadMany(fks);
    }
  );
}

async function handleToOne<V>(
  foreignKeyFunc: (root: any) => any | undefined,
  root: any,
  tgdContext: TypeGraphQLDataLoaderContext,
  relation: RelationMetadata
) {
  return handler(
    tgdContext,
    relation,
    relation.inverseEntityMetadata.primaryColumns,
    (connection) => new ToOneDataloader<V>(relation, connection),
    async (dataloader) => {
      const fk = foreignKeyFunc(root);
      return fk != null ? await dataloader.load(fk) : null;
    }
  );
}

async function handleOneToManyWithSelfKey<V>(
  selfKeyFunc: (root: any) => any | any[],
  root: any,
  tgdContext: TypeGraphQLDataLoaderContext,
  relation: RelationMetadata
) {
  return handler(
    tgdContext,
    relation,
    relation.entityMetadata.primaryColumns,
    (connection) => new SelfKeyDataloader<V>(relation, connection, selfKeyFunc),
    async (dataloader, columns) => {
      const pk = columns[0].getEntityValue(root);
      return await dataloader.load(pk);
    }
  );
}

async function handleOneToOneNotOwnerWithSelfKey<V>(
  selfKeyFunc: (root: any) => any | undefined,
  root: any,
  tgdContext: TypeGraphQLDataLoaderContext,
  relation: RelationMetadata
) {
  return handler(
    tgdContext,
    relation,
    relation.entityMetadata.primaryColumns,
    (connection) => new SelfKeyDataloader<V>(relation, connection, selfKeyFunc),
    async (dataloader, columns) => {
      const pk = columns[0].getEntityValue(root);
      return (await dataloader.load(pk))[0] ?? null;
    }
  );
}

function directLoader<V>(
  relation: RelationMetadata,
  connection: Connection,
  grouper: string | ((entity: V) => any)
) {
  return async (ids: readonly any[]) => {
    const entities = keyBy(
      await connection
        .createQueryBuilder<V>(relation.type, relation.propertyName)
        .whereInIds(ids)
        .getMany(),
      grouper
    ) as Dictionary<V>;
    return ids.map((id) => entities[id]);
  };
}

// Relation specific DataLoader instances

class ToManyDataloader<V> extends DataLoader<any, V> {
  constructor(relation: RelationMetadata, connection: Connection) {
    super(
      directLoader(relation, connection, (entity) =>
        relation.inverseEntityMetadata.primaryColumns[0].getEntityValue(entity)
      )
    );
  }
}

class ToOneDataloader<V> extends DataLoader<any, V> {
  constructor(relation: RelationMetadata, connection: Connection) {
    super(
      directLoader(
        relation,
        connection,
        relation.inverseEntityMetadata.primaryColumns[0].propertyName
      )
    );
  }
}

class SelfKeyDataloader<V> extends DataLoader<any, V[]> {
  constructor(
    relation: RelationMetadata,
    connection: Connection,
    selfKeyFunc: (root: any) => any
  ) {
    super(async (ids) => {
      const columns = relation.inverseRelation!.joinColumns;
      const k = `${relation.propertyName}_${columns[0].propertyName}`;
      const entities = groupBy(
        await connection
          .createQueryBuilder<V>(relation.type, relation.propertyName)
          .where(
            `${relation.propertyName}.${columns[0].propertyPath} IN (:...${k})`
          )
          .setParameter(k, ids)
          .getMany(),
        selfKeyFunc
      );
      return ids.map((id) => entities[id] ?? []);
    });
  }
}

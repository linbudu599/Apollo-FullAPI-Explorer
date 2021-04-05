/**
 * Client
 **/

import * as runtime from './runtime';
declare const prisma: unique symbol;
export type PrismaPromise<A> = Promise<A> & { [prisma]: true };
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P;
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}`
    ? Tuple[K] extends PrismaPromise<infer X>
      ? X
      : UnwrapPromise<Tuple[K]>
    : UnwrapPromise<Tuple[K]>;
};

/**
 * Model User
 */

export type User = {
  id: number;
  name: string;
  nickName: string | null;
};

/**
 * Model Item
 */

export type Item = {
  id: number;
  title: string;
  content: string | null;
  ownerId: number | null;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T
    ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<T['log']>
      : never
    : never,
  GlobalReject = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;

  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends U | 'beforeExit'>(
    eventType: V,
    callback: (
      event: V extends 'query'
        ? Prisma.QueryEvent
        : V extends 'beforeExit'
        ? () => Promise<void>
        : Prisma.LogEvent
    ) => void
  ): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void;

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = any>(
    query: string | TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): PrismaPromise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = any>(
    query: string | TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(
    arg: [...P]
  ): Promise<UnwrapTuple<P>>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   */
  get user(): Prisma.UserDelegate<GlobalReject>;

  /**
   * `prisma.item`: Exposes CRUD operations for the **Item** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Items
   * const items = await prisma.item.findMany()
   * ```
   */
  get item(): Prisma.ItemDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF;

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
  export import PrismaClientValidationError = runtime.PrismaClientValidationError;

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag;
  export import empty = runtime.empty;
  export import join = runtime.join;
  export import raw = runtime.raw;
  export import Sql = runtime.Sql;

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal;

  /**
   * Prisma Client JS version: 2.20.1
   * Query Engine version: c1455d0b443d66b0d9db9bcb1bb9ee0d5bbc511d
   */
  export type PrismaVersion = {
    client: string;
  };

  export const prismaVersion: PrismaVersion;

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from.
   */
  export type JsonObject = { [Key in string]?: JsonValue };

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue =
    | string
    | number
    | boolean
    | null
    | JsonObject
    | JsonArray;

  /**
   * Same as JsonObject, but allows undefined
   */
  export type InputJsonObject = { [Key in string]?: JsonValue };

  export interface InputJsonArray extends Array<JsonValue> {}

  export type InputJsonValue =
    | undefined
    | string
    | number
    | boolean
    | null
    | InputJsonObject
    | InputJsonArray;
  type SelectAndInclude = {
    select: any;
    include: any;
  };
  type HasSelect = {
    select: any;
  };
  type HasInclude = {
    include: any;
  };
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S;

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<
    infer U
  >
    ? U
    : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<
    T extends (...args: any) => Promise<any>
  > = PromiseType<ReturnType<T>>;

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
  }[keyof T];

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key;
  }[keyof T];

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } &
    K;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T | U extends object
    ? (Without<T, U> & U) | (Without<U, T> & T)
    : T | U;

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
    ? False
    : T extends Date
    ? False
    : T extends Buffer
    ? False
    : T extends BigInt
    ? False
    : T extends object
    ? True
    : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  export type Union = any;

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never;

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>;
      }
    >
  >;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O
    ? O[K]
    : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown
    ? AtStrict<O, K>
    : never;
  export type At<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function
    ? A
    : {
        [K in keyof A]: A[K];
      } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  type _Strict<U, _U = U> = U extends unknown
    ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
    : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False;

  // /**
  // 1
  // */
  export type True = 1;

  /**
  0
  */
  export type False = 0;

  export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0;

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >;

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  type Exact<A, W = unknown> = W extends unknown
    ? A extends Narrowable
      ? Cast<A, W>
      : Cast<
          { [K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never },
          { [K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K] }
        >
    : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never;
      }
    : never;

  type FieldPaths<
    T,
    U = Omit<T, 'avg' | 'sum' | 'count' | 'min' | 'max'>
  > = IsObject<T> extends True ? U : T;

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<
            UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never
          >
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K;
  }[keyof T];

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<
    T,
    TupleToUnion<K>
  >;

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(
      prisma: PrismaClient<any, any>,
      debug?: boolean,
      hooks?: Hooks | undefined
    );
    request<T>(
      document: any,
      dataPath?: string[],
      rootField?: string,
      typeName?: string,
      isList?: boolean,
      callsite?: string
    ): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(
      document: any,
      data: any,
      path: string[],
      rootField?: string,
      isList?: boolean
    ): any;
  }

  export const ModelName: {
    User: 'User';
    Item: 'Item';
  };

  export type ModelName = typeof ModelName[keyof typeof ModelName];

  export type Datasources = {
    db?: Datasource;
  };

  export type RejectOnNotFound = boolean | ((error: Error) => Error);
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound };
  export type RejectPerOperation = {
    [P in 'findUnique' | 'findFirst']?: RejectPerModel | RejectOnNotFound;
  };
  type IsReject<T> = T extends true
    ? True
    : T extends (err: Error) => Error
    ? True
    : False;
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends boolean
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>;
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null.
     *  * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation;
    /**
     * Overwrites the datasource url from your prisma.schema file
     */
    datasources?: Datasources;

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>;
  }

  export type Hooks = {
    beforeRequest?: (options: {
      query: string;
      path: string[];
      rootField?: string;
      typeName?: string;
      document: any;
    }) => any;
  };

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error';
  export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
  };

  export type GetLogType<
    T extends LogLevel | LogDefinition
  > = T extends LogDefinition
    ? T['emit'] extends 'event'
      ? T['level']
      : never
    : never;
  export type GetEvents<T extends any> = T extends Array<
    LogLevel | LogDefinition
  >
    ? GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never;

  export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  };

  export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
  };
  /* End Types for Logging */

  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count';

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName;
    action: PrismaAction;
    args: any;
    dataPath: string[];
    runInTransaction: boolean;
  };

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>
  ) => Promise<T>;

  // tested in getLogLevel.test.ts
  export function getLogLevel(
    log: Array<LogLevel | LogDefinition>
  ): LogLevel | undefined;
  export type Datasource = {
    url?: string;
  };

  /**
   * Count Types
   */

  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    count: UserCountAggregateOutputType | null;
    avg: UserAvgAggregateOutputType | null;
    sum: UserSumAggregateOutputType | null;
    min: UserMinAggregateOutputType | null;
    max: UserMaxAggregateOutputType | null;
  };

  export type UserAvgAggregateOutputType = {
    id: number;
  };

  export type UserSumAggregateOutputType = {
    id: number;
  };

  export type UserMinAggregateOutputType = {
    id: number;
    name: string | null;
    nickName: string | null;
  };

  export type UserMaxAggregateOutputType = {
    id: number;
    name: string | null;
    nickName: string | null;
  };

  export type UserCountAggregateOutputType = {
    id: number;
    name: number | null;
    nickName: number | null;
    _all: number;
  };

  export type UserAvgAggregateInputType = {
    id?: true;
  };

  export type UserSumAggregateInputType = {
    id?: true;
  };

  export type UserMinAggregateInputType = {
    id?: true;
    name?: true;
    nickName?: true;
  };

  export type UserMaxAggregateInputType = {
    id?: true;
    name?: true;
    nickName?: true;
  };

  export type UserCountAggregateInputType = {
    id?: true;
    name?: true;
    nickName?: true;
    _all?: true;
  };

  export type UserAggregateArgs = {
    /**
     * Filter which User to aggregate.
     **/
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     **/
    orderBy?: Enumerable<UserOrderByInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     **/
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     **/
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     **/
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
     **/
    count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    avg?: UserAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    sum?: UserSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    max?: UserMaxAggregateInputType;
  };

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>;
  };

  export type UserGroupByArgs = {
    where?: UserWhereInput;
    orderBy?: Enumerable<UserOrderByInput>;
    by: Array<UserScalarFieldEnum>;
    having?: UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    count?: UserCountAggregateInputType | true;
    avg?: UserAvgAggregateInputType;
    sum?: UserSumAggregateInputType;
    min?: UserMinAggregateInputType;
    max?: UserMaxAggregateInputType;
  };

  export type UserGroupByOutputType = {
    id: number;
    name: string;
    nickName: string | null;
    count: UserCountAggregateOutputType | null;
    avg: UserAvgAggregateOutputType | null;
    sum: UserSumAggregateOutputType | null;
    min: UserMinAggregateOutputType | null;
    max: UserMaxAggregateOutputType | null;
  };

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Promise<
    Array<
      PickArray<UserGroupByOutputType, T['by']> &
        {
          [P in keyof T & keyof UserGroupByOutputType]: GetScalarType<
            T[P],
            UserGroupByOutputType[P]
          >;
        }
    >
  >;

  export type UserSelect = {
    id?: boolean;
    name?: boolean;
    nickName?: boolean;
    items?: boolean | ItemFindManyArgs;
  };

  export type UserInclude = {
    items?: boolean | ItemFindManyArgs;
  };

  export type UserGetPayload<
    S extends boolean | null | undefined | UserArgs,
    U = keyof S
  > = S extends true
    ? User
    : S extends undefined
    ? never
    : S extends UserArgs | UserFindManyArgs
    ? 'include' extends U
      ? User &
          {
            [P in TrueKeys<S['include']>]: P extends 'items'
              ? Array<ItemGetPayload<S['include'][P]>>
              : never;
          }
      : 'select' extends U
      ? {
          [P in TrueKeys<S['select']>]: P extends keyof User
            ? User[P]
            : P extends 'items'
            ? Array<ItemGetPayload<S['select'][P]>>
            : never;
        }
      : User
    : User;

  type UserCountArgs = Merge<
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true;
    }
  >;

  export interface UserDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUnique<
      T extends UserFindUniqueArgs,
      LocalRejectSettings = T['rejectOnNotFound'] extends RejectOnNotFound
        ? T['rejectOnNotFound']
        : undefined
    >(
      args: SelectSubset<T, UserFindUniqueArgs>
    ): HasReject<
      GlobalRejectSettings,
      LocalRejectSettings,
      'findUnique',
      'User'
    > extends True
      ? CheckSelect<
          T,
          Prisma__UserClient<User>,
          Prisma__UserClient<UserGetPayload<T>>
        >
      : CheckSelect<
          T,
          Prisma__UserClient<User | null>,
          Prisma__UserClient<UserGetPayload<T> | null>
        >;

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirst<
      T extends UserFindFirstArgs,
      LocalRejectSettings = T['rejectOnNotFound'] extends RejectOnNotFound
        ? T['rejectOnNotFound']
        : undefined
    >(
      args?: SelectSubset<T, UserFindFirstArgs>
    ): HasReject<
      GlobalRejectSettings,
      LocalRejectSettings,
      'findFirst',
      'User'
    > extends True
      ? CheckSelect<
          T,
          Prisma__UserClient<User>,
          Prisma__UserClient<UserGetPayload<T>>
        >
      : CheckSelect<
          T,
          Prisma__UserClient<User | null>,
          Prisma__UserClient<UserGetPayload<T> | null>
        >;

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
     **/
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs>
    ): CheckSelect<
      T,
      PrismaPromise<Array<User>>,
      PrismaPromise<Array<UserGetPayload<T>>>
    >;

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     **/
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs>
    ): CheckSelect<
      T,
      Prisma__UserClient<User>,
      Prisma__UserClient<UserGetPayload<T>>
    >;

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     **/
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs>
    ): CheckSelect<
      T,
      Prisma__UserClient<User>,
      Prisma__UserClient<UserGetPayload<T>>
    >;

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs>
    ): CheckSelect<
      T,
      Prisma__UserClient<User>,
      Prisma__UserClient<UserGetPayload<T>>
    >;

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     **/
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs>
    ): PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs>
    ): PrismaPromise<BatchPayload>;

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     **/
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs>
    ): CheckSelect<
      T,
      Prisma__UserClient<User>,
      Prisma__UserClient<UserGetPayload<T>>
    >;

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
     **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends UserAggregateArgs>(
      args: Subset<T, UserAggregateArgs>
    ): PrismaPromise<GetUserAggregateType<T>>;

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends Keys<MaybeTupleToUnion<T['orderBy']>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
        ? {
            [P in HavingFields]: P extends ByFields
              ? never
              : P extends string
              ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
              : [
                  Error,
                  'Field ',
                  P,
                  ` in "having" needs to be provided in "by"`
                ];
          }[HavingFields]
        : 'take' extends Keys<T>
        ? 'orderBy' extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "take", you also need to provide "orderBy"'
        : 'skip' extends Keys<T>
        ? 'orderBy' extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "skip", you also need to provide "orderBy"'
        : ByValid extends True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
          }[OrderFields]
    >(
      args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors ? GetUserGroupByPayload<T> : Promise<InputErrors>;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(
      _dmmf: runtime.DMMFClass,
      _fetcher: PrismaClientFetcher,
      _queryType: 'query' | 'mutation',
      _rootField: string,
      _clientMethod: string,
      _args: any,
      _dataPath: string[],
      _errorFormat: ErrorFormat,
      _measurePerformance?: boolean | undefined,
      _isList?: boolean
    );
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    items<T extends ItemFindManyArgs = {}>(
      args?: Subset<T, ItemFindManyArgs>
    ): CheckSelect<
      T,
      PrismaPromise<Array<Item>>,
      PrismaPromise<Array<ItemGetPayload<T>>>
    >;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * User findUnique
   */
  export type UserFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the User
     **/
    select?: UserSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: UserInclude | null;
    /**
     * Throw an Error if a User can't be found
     **/
    rejectOnNotFound?: RejectOnNotFound;
    /**
     * Filter, which User to fetch.
     **/
    where: UserWhereUniqueInput;
  };

  /**
   * User findFirst
   */
  export type UserFindFirstArgs = {
    /**
     * Select specific fields to fetch from the User
     **/
    select?: UserSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: UserInclude | null;
    /**
     * Throw an Error if a User can't be found
     **/
    rejectOnNotFound?: RejectOnNotFound;
    /**
     * Filter, which User to fetch.
     **/
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     **/
    orderBy?: Enumerable<UserOrderByInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     **/
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     **/
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     **/
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     **/
    distinct?: Enumerable<UserScalarFieldEnum>;
  };

  /**
   * User findMany
   */
  export type UserFindManyArgs = {
    /**
     * Select specific fields to fetch from the User
     **/
    select?: UserSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: UserInclude | null;
    /**
     * Filter, which Users to fetch.
     **/
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     **/
    orderBy?: Enumerable<UserOrderByInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Users.
     **/
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     **/
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     **/
    skip?: number;
    distinct?: Enumerable<UserScalarFieldEnum>;
  };

  /**
   * User create
   */
  export type UserCreateArgs = {
    /**
     * Select specific fields to fetch from the User
     **/
    select?: UserSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: UserInclude | null;
    /**
     * The data needed to create a User.
     **/
    data: XOR<UserCreateInput, UserUncheckedCreateInput>;
  };

  /**
   * User update
   */
  export type UserUpdateArgs = {
    /**
     * Select specific fields to fetch from the User
     **/
    select?: UserSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: UserInclude | null;
    /**
     * The data needed to update a User.
     **/
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     **/
    where: UserWhereUniqueInput;
  };

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs = {
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    where?: UserWhereInput;
  };

  /**
   * User upsert
   */
  export type UserUpsertArgs = {
    /**
     * Select specific fields to fetch from the User
     **/
    select?: UserSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: UserInclude | null;
    /**
     * The filter to search for the User to update in case it exists.
     **/
    where: UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     **/
    create: XOR<UserCreateInput, UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     **/
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
  };

  /**
   * User delete
   */
  export type UserDeleteArgs = {
    /**
     * Select specific fields to fetch from the User
     **/
    select?: UserSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: UserInclude | null;
    /**
     * Filter which User to delete.
     **/
    where: UserWhereUniqueInput;
  };

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs = {
    where?: UserWhereInput;
  };

  /**
   * User without action
   */
  export type UserArgs = {
    /**
     * Select specific fields to fetch from the User
     **/
    select?: UserSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: UserInclude | null;
  };

  /**
   * Model Item
   */

  export type AggregateItem = {
    count: ItemCountAggregateOutputType | null;
    avg: ItemAvgAggregateOutputType | null;
    sum: ItemSumAggregateOutputType | null;
    min: ItemMinAggregateOutputType | null;
    max: ItemMaxAggregateOutputType | null;
  };

  export type ItemAvgAggregateOutputType = {
    id: number;
    ownerId: number | null;
  };

  export type ItemSumAggregateOutputType = {
    id: number;
    ownerId: number | null;
  };

  export type ItemMinAggregateOutputType = {
    id: number;
    title: string | null;
    content: string | null;
    ownerId: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ItemMaxAggregateOutputType = {
    id: number;
    title: string | null;
    content: string | null;
    ownerId: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ItemCountAggregateOutputType = {
    id: number;
    title: number | null;
    content: number | null;
    ownerId: number | null;
    createdAt: number | null;
    updatedAt: number | null;
    _all: number;
  };

  export type ItemAvgAggregateInputType = {
    id?: true;
    ownerId?: true;
  };

  export type ItemSumAggregateInputType = {
    id?: true;
    ownerId?: true;
  };

  export type ItemMinAggregateInputType = {
    id?: true;
    title?: true;
    content?: true;
    ownerId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ItemMaxAggregateInputType = {
    id?: true;
    title?: true;
    content?: true;
    ownerId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ItemCountAggregateInputType = {
    id?: true;
    title?: true;
    content?: true;
    ownerId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type ItemAggregateArgs = {
    /**
     * Filter which Item to aggregate.
     **/
    where?: ItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Items to fetch.
     **/
    orderBy?: Enumerable<ItemOrderByInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     **/
    cursor?: ItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Items from the position of the cursor.
     **/
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Items.
     **/
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Items
     **/
    count?: true | ItemCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    avg?: ItemAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    sum?: ItemSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    min?: ItemMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    max?: ItemMaxAggregateInputType;
  };

  export type GetItemAggregateType<T extends ItemAggregateArgs> = {
    [P in keyof T & keyof AggregateItem]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItem[P]>
      : GetScalarType<T[P], AggregateItem[P]>;
  };

  export type ItemGroupByArgs = {
    where?: ItemWhereInput;
    orderBy?: Enumerable<ItemOrderByInput>;
    by: Array<ItemScalarFieldEnum>;
    having?: ItemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    count?: ItemCountAggregateInputType | true;
    avg?: ItemAvgAggregateInputType;
    sum?: ItemSumAggregateInputType;
    min?: ItemMinAggregateInputType;
    max?: ItemMaxAggregateInputType;
  };

  export type ItemGroupByOutputType = {
    id: number;
    title: string;
    content: string | null;
    ownerId: number | null;
    createdAt: Date;
    updatedAt: Date;
    count: ItemCountAggregateOutputType | null;
    avg: ItemAvgAggregateOutputType | null;
    sum: ItemSumAggregateOutputType | null;
    min: ItemMinAggregateOutputType | null;
    max: ItemMaxAggregateOutputType | null;
  };

  type GetItemGroupByPayload<T extends ItemGroupByArgs> = Promise<
    Array<
      PickArray<ItemGroupByOutputType, T['by']> &
        {
          [P in keyof T & keyof ItemGroupByOutputType]: GetScalarType<
            T[P],
            ItemGroupByOutputType[P]
          >;
        }
    >
  >;

  export type ItemSelect = {
    id?: boolean;
    title?: boolean;
    content?: boolean;
    ownerId?: boolean;
    owner?: boolean | UserArgs;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type ItemInclude = {
    owner?: boolean | UserArgs;
  };

  export type ItemGetPayload<
    S extends boolean | null | undefined | ItemArgs,
    U = keyof S
  > = S extends true
    ? Item
    : S extends undefined
    ? never
    : S extends ItemArgs | ItemFindManyArgs
    ? 'include' extends U
      ? Item &
          {
            [P in TrueKeys<S['include']>]: P extends 'owner'
              ? UserGetPayload<S['include'][P]> | null
              : never;
          }
      : 'select' extends U
      ? {
          [P in TrueKeys<S['select']>]: P extends keyof Item
            ? Item[P]
            : P extends 'owner'
            ? UserGetPayload<S['select'][P]> | null
            : never;
        }
      : Item
    : Item;

  type ItemCountArgs = Merge<
    Omit<ItemFindManyArgs, 'select' | 'include'> & {
      select?: ItemCountAggregateInputType | true;
    }
  >;

  export interface ItemDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Item that matches the filter.
     * @param {ItemFindUniqueArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUnique<
      T extends ItemFindUniqueArgs,
      LocalRejectSettings = T['rejectOnNotFound'] extends RejectOnNotFound
        ? T['rejectOnNotFound']
        : undefined
    >(
      args: SelectSubset<T, ItemFindUniqueArgs>
    ): HasReject<
      GlobalRejectSettings,
      LocalRejectSettings,
      'findUnique',
      'Item'
    > extends True
      ? CheckSelect<
          T,
          Prisma__ItemClient<Item>,
          Prisma__ItemClient<ItemGetPayload<T>>
        >
      : CheckSelect<
          T,
          Prisma__ItemClient<Item | null>,
          Prisma__ItemClient<ItemGetPayload<T> | null>
        >;

    /**
     * Find the first Item that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFindFirstArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirst<
      T extends ItemFindFirstArgs,
      LocalRejectSettings = T['rejectOnNotFound'] extends RejectOnNotFound
        ? T['rejectOnNotFound']
        : undefined
    >(
      args?: SelectSubset<T, ItemFindFirstArgs>
    ): HasReject<
      GlobalRejectSettings,
      LocalRejectSettings,
      'findFirst',
      'Item'
    > extends True
      ? CheckSelect<
          T,
          Prisma__ItemClient<Item>,
          Prisma__ItemClient<ItemGetPayload<T>>
        >
      : CheckSelect<
          T,
          Prisma__ItemClient<Item | null>,
          Prisma__ItemClient<ItemGetPayload<T> | null>
        >;

    /**
     * Find zero or more Items that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Items
     * const items = await prisma.item.findMany()
     *
     * // Get first 10 Items
     * const items = await prisma.item.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const itemWithIdOnly = await prisma.item.findMany({ select: { id: true } })
     *
     **/
    findMany<T extends ItemFindManyArgs>(
      args?: SelectSubset<T, ItemFindManyArgs>
    ): CheckSelect<
      T,
      PrismaPromise<Array<Item>>,
      PrismaPromise<Array<ItemGetPayload<T>>>
    >;

    /**
     * Create a Item.
     * @param {ItemCreateArgs} args - Arguments to create a Item.
     * @example
     * // Create one Item
     * const Item = await prisma.item.create({
     *   data: {
     *     // ... data to create a Item
     *   }
     * })
     *
     **/
    create<T extends ItemCreateArgs>(
      args: SelectSubset<T, ItemCreateArgs>
    ): CheckSelect<
      T,
      Prisma__ItemClient<Item>,
      Prisma__ItemClient<ItemGetPayload<T>>
    >;

    /**
     * Delete a Item.
     * @param {ItemDeleteArgs} args - Arguments to delete one Item.
     * @example
     * // Delete one Item
     * const Item = await prisma.item.delete({
     *   where: {
     *     // ... filter to delete one Item
     *   }
     * })
     *
     **/
    delete<T extends ItemDeleteArgs>(
      args: SelectSubset<T, ItemDeleteArgs>
    ): CheckSelect<
      T,
      Prisma__ItemClient<Item>,
      Prisma__ItemClient<ItemGetPayload<T>>
    >;

    /**
     * Update one Item.
     * @param {ItemUpdateArgs} args - Arguments to update one Item.
     * @example
     * // Update one Item
     * const item = await prisma.item.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    update<T extends ItemUpdateArgs>(
      args: SelectSubset<T, ItemUpdateArgs>
    ): CheckSelect<
      T,
      Prisma__ItemClient<Item>,
      Prisma__ItemClient<ItemGetPayload<T>>
    >;

    /**
     * Delete zero or more Items.
     * @param {ItemDeleteManyArgs} args - Arguments to filter Items to delete.
     * @example
     * // Delete a few Items
     * const { count } = await prisma.item.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     **/
    deleteMany<T extends ItemDeleteManyArgs>(
      args?: SelectSubset<T, ItemDeleteManyArgs>
    ): PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Items
     * const item = await prisma.item.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    updateMany<T extends ItemUpdateManyArgs>(
      args: SelectSubset<T, ItemUpdateManyArgs>
    ): PrismaPromise<BatchPayload>;

    /**
     * Create or update one Item.
     * @param {ItemUpsertArgs} args - Arguments to update or create a Item.
     * @example
     * // Update or create a Item
     * const item = await prisma.item.upsert({
     *   create: {
     *     // ... data to create a Item
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Item we want to update
     *   }
     * })
     **/
    upsert<T extends ItemUpsertArgs>(
      args: SelectSubset<T, ItemUpsertArgs>
    ): CheckSelect<
      T,
      Prisma__ItemClient<Item>,
      Prisma__ItemClient<ItemGetPayload<T>>
    >;

    /**
     * Count the number of Items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemCountArgs} args - Arguments to filter Items to count.
     * @example
     * // Count the number of Items
     * const count = await prisma.item.count({
     *   where: {
     *     // ... the filter for the Items we want to count
     *   }
     * })
     **/
    count<T extends ItemCountArgs>(
      args?: Subset<T, ItemCountArgs>
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ItemCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Item.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ItemAggregateArgs>(
      args: Subset<T, ItemAggregateArgs>
    ): PrismaPromise<GetItemAggregateType<T>>;

    /**
     * Group by Item.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ItemGroupByArgs['orderBy'] }
        : { orderBy?: ItemGroupByArgs['orderBy'] },
      OrderFields extends Keys<MaybeTupleToUnion<T['orderBy']>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
        ? {
            [P in HavingFields]: P extends ByFields
              ? never
              : P extends string
              ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
              : [
                  Error,
                  'Field ',
                  P,
                  ` in "having" needs to be provided in "by"`
                ];
          }[HavingFields]
        : 'take' extends Keys<T>
        ? 'orderBy' extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "take", you also need to provide "orderBy"'
        : 'skip' extends Keys<T>
        ? 'orderBy' extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "skip", you also need to provide "orderBy"'
        : ByValid extends True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
          }[OrderFields]
    >(
      args: SubsetIntersection<T, ItemGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors ? GetItemGroupByPayload<T> : Promise<InputErrors>;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Item.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ItemClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(
      _dmmf: runtime.DMMFClass,
      _fetcher: PrismaClientFetcher,
      _queryType: 'query' | 'mutation',
      _rootField: string,
      _clientMethod: string,
      _args: any,
      _dataPath: string[],
      _errorFormat: ErrorFormat,
      _measurePerformance?: boolean | undefined,
      _isList?: boolean
    );
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    owner<T extends UserArgs = {}>(
      args?: Subset<T, UserArgs>
    ): CheckSelect<
      T,
      Prisma__UserClient<User | null>,
      Prisma__UserClient<UserGetPayload<T> | null>
    >;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Item findUnique
   */
  export type ItemFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Item
     **/
    select?: ItemSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: ItemInclude | null;
    /**
     * Throw an Error if a Item can't be found
     **/
    rejectOnNotFound?: RejectOnNotFound;
    /**
     * Filter, which Item to fetch.
     **/
    where: ItemWhereUniqueInput;
  };

  /**
   * Item findFirst
   */
  export type ItemFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Item
     **/
    select?: ItemSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: ItemInclude | null;
    /**
     * Throw an Error if a Item can't be found
     **/
    rejectOnNotFound?: RejectOnNotFound;
    /**
     * Filter, which Item to fetch.
     **/
    where?: ItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Items to fetch.
     **/
    orderBy?: Enumerable<ItemOrderByInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Items.
     **/
    cursor?: ItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Items from the position of the cursor.
     **/
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Items.
     **/
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Items.
     **/
    distinct?: Enumerable<ItemScalarFieldEnum>;
  };

  /**
   * Item findMany
   */
  export type ItemFindManyArgs = {
    /**
     * Select specific fields to fetch from the Item
     **/
    select?: ItemSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: ItemInclude | null;
    /**
     * Filter, which Items to fetch.
     **/
    where?: ItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Items to fetch.
     **/
    orderBy?: Enumerable<ItemOrderByInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Items.
     **/
    cursor?: ItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Items from the position of the cursor.
     **/
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Items.
     **/
    skip?: number;
    distinct?: Enumerable<ItemScalarFieldEnum>;
  };

  /**
   * Item create
   */
  export type ItemCreateArgs = {
    /**
     * Select specific fields to fetch from the Item
     **/
    select?: ItemSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: ItemInclude | null;
    /**
     * The data needed to create a Item.
     **/
    data: XOR<ItemCreateInput, ItemUncheckedCreateInput>;
  };

  /**
   * Item update
   */
  export type ItemUpdateArgs = {
    /**
     * Select specific fields to fetch from the Item
     **/
    select?: ItemSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: ItemInclude | null;
    /**
     * The data needed to update a Item.
     **/
    data: XOR<ItemUpdateInput, ItemUncheckedUpdateInput>;
    /**
     * Choose, which Item to update.
     **/
    where: ItemWhereUniqueInput;
  };

  /**
   * Item updateMany
   */
  export type ItemUpdateManyArgs = {
    data: XOR<ItemUpdateManyMutationInput, ItemUncheckedUpdateManyInput>;
    where?: ItemWhereInput;
  };

  /**
   * Item upsert
   */
  export type ItemUpsertArgs = {
    /**
     * Select specific fields to fetch from the Item
     **/
    select?: ItemSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: ItemInclude | null;
    /**
     * The filter to search for the Item to update in case it exists.
     **/
    where: ItemWhereUniqueInput;
    /**
     * In case the Item found by the `where` argument doesn't exist, create a new Item with this data.
     **/
    create: XOR<ItemCreateInput, ItemUncheckedCreateInput>;
    /**
     * In case the Item was found with the provided `where` argument, update it with this data.
     **/
    update: XOR<ItemUpdateInput, ItemUncheckedUpdateInput>;
  };

  /**
   * Item delete
   */
  export type ItemDeleteArgs = {
    /**
     * Select specific fields to fetch from the Item
     **/
    select?: ItemSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: ItemInclude | null;
    /**
     * Filter which Item to delete.
     **/
    where: ItemWhereUniqueInput;
  };

  /**
   * Item deleteMany
   */
  export type ItemDeleteManyArgs = {
    where?: ItemWhereInput;
  };

  /**
   * Item without action
   */
  export type ItemArgs = {
    /**
     * Select specific fields to fetch from the Item
     **/
    select?: ItemSelect | null;
    /**
     * Choose, which related nodes to fetch as well.
     **/
    include?: ItemInclude | null;
  };

  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const UserScalarFieldEnum: {
    id: 'id';
    name: 'name';
    nickName: 'nickName';
  };

  export type UserScalarFieldEnum = typeof UserScalarFieldEnum[keyof typeof UserScalarFieldEnum];

  export const ItemScalarFieldEnum: {
    id: 'id';
    title: 'title';
    content: 'content';
    ownerId: 'ownerId';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type ItemScalarFieldEnum = typeof ItemScalarFieldEnum[keyof typeof ItemScalarFieldEnum];

  export const SortOrder: {
    asc: 'asc';
    desc: 'desc';
  };

  export type SortOrder = typeof SortOrder[keyof typeof SortOrder];

  /**
   * Deep Input Types
   */

  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>;
    OR?: Enumerable<UserWhereInput>;
    NOT?: Enumerable<UserWhereInput>;
    id?: IntFilter | number;
    name?: StringFilter | string;
    nickName?: StringNullableFilter | string | null;
    items?: ItemListRelationFilter;
  };

  export type UserOrderByInput = {
    id?: SortOrder;
    name?: SortOrder;
    nickName?: SortOrder;
  };

  export type UserWhereUniqueInput = {
    id?: number;
  };

  export type UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserScalarWhereWithAggregatesInput>;
    OR?: Enumerable<UserScalarWhereWithAggregatesInput>;
    NOT?: Enumerable<UserScalarWhereWithAggregatesInput>;
    id?: IntWithAggregatesFilter | number;
    name?: StringWithAggregatesFilter | string;
    nickName?: StringNullableWithAggregatesFilter | string | null;
  };

  export type ItemWhereInput = {
    AND?: Enumerable<ItemWhereInput>;
    OR?: Enumerable<ItemWhereInput>;
    NOT?: Enumerable<ItemWhereInput>;
    id?: IntFilter | number;
    title?: StringFilter | string;
    content?: StringNullableFilter | string | null;
    ownerId?: IntNullableFilter | number | null;
    owner?: XOR<UserRelationFilter, UserWhereInput> | null;
    createdAt?: DateTimeFilter | Date | string;
    updatedAt?: DateTimeFilter | Date | string;
  };

  export type ItemOrderByInput = {
    id?: SortOrder;
    title?: SortOrder;
    content?: SortOrder;
    ownerId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ItemWhereUniqueInput = {
    id?: number;
    title?: string;
  };

  export type ItemScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ItemScalarWhereWithAggregatesInput>;
    OR?: Enumerable<ItemScalarWhereWithAggregatesInput>;
    NOT?: Enumerable<ItemScalarWhereWithAggregatesInput>;
    id?: IntWithAggregatesFilter | number;
    title?: StringWithAggregatesFilter | string;
    content?: StringNullableWithAggregatesFilter | string | null;
    ownerId?: IntNullableWithAggregatesFilter | number | null;
    createdAt?: DateTimeWithAggregatesFilter | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter | Date | string;
  };

  export type UserCreateInput = {
    name: string;
    nickName?: string | null;
    items?: ItemCreateNestedManyWithoutOwnerInput;
  };

  export type UserUncheckedCreateInput = {
    id?: number;
    name: string;
    nickName?: string | null;
    items?: ItemUncheckedCreateNestedManyWithoutOwnerInput;
  };

  export type UserUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string;
    nickName?: NullableStringFieldUpdateOperationsInput | string | null;
    items?: ItemUpdateManyWithoutOwnerInput;
  };

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    nickName?: NullableStringFieldUpdateOperationsInput | string | null;
    items?: ItemUncheckedUpdateManyWithoutOwnerInput;
  };

  export type UserUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string;
    nickName?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    nickName?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type ItemCreateInput = {
    title: string;
    content?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    owner?: UserCreateNestedOneWithoutItemsInput;
  };

  export type ItemUncheckedCreateInput = {
    id?: number;
    title: string;
    content?: string | null;
    ownerId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ItemUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string;
    content?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    owner?: UserUpdateOneWithoutItemsInput;
  };

  export type ItemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    title?: StringFieldUpdateOperationsInput | string;
    content?: NullableStringFieldUpdateOperationsInput | string | null;
    ownerId?: NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ItemUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string;
    content?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ItemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    title?: StringFieldUpdateOperationsInput | string;
    content?: NullableStringFieldUpdateOperationsInput | string | null;
    ownerId?: NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type IntFilter = {
    equals?: number;
    in?: Enumerable<number>;
    notIn?: Enumerable<number>;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedIntFilter | number;
  };

  export type StringFilter = {
    equals?: string;
    in?: Enumerable<string>;
    notIn?: Enumerable<string>;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    not?: NestedStringFilter | string;
  };

  export type StringNullableFilter = {
    equals?: string | null;
    in?: Enumerable<string> | null;
    notIn?: Enumerable<string> | null;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    not?: NestedStringNullableFilter | string | null;
  };

  export type ItemListRelationFilter = {
    every?: ItemWhereInput;
    some?: ItemWhereInput;
    none?: ItemWhereInput;
  };

  export type IntWithAggregatesFilter = {
    equals?: number;
    in?: Enumerable<number>;
    notIn?: Enumerable<number>;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedIntWithAggregatesFilter | number;
    count?: NestedIntFilter;
    avg?: NestedFloatFilter;
    sum?: NestedIntFilter;
    min?: NestedIntFilter;
    max?: NestedIntFilter;
  };

  export type StringWithAggregatesFilter = {
    equals?: string;
    in?: Enumerable<string>;
    notIn?: Enumerable<string>;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    not?: NestedStringWithAggregatesFilter | string;
    count?: NestedIntFilter;
    min?: NestedStringFilter;
    max?: NestedStringFilter;
  };

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null;
    in?: Enumerable<string> | null;
    notIn?: Enumerable<string> | null;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    not?: NestedStringNullableWithAggregatesFilter | string | null;
    count?: NestedIntNullableFilter;
    min?: NestedStringNullableFilter;
    max?: NestedStringNullableFilter;
  };

  export type IntNullableFilter = {
    equals?: number | null;
    in?: Enumerable<number> | null;
    notIn?: Enumerable<number> | null;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedIntNullableFilter | number | null;
  };

  export type UserRelationFilter = {
    is?: UserWhereInput | null;
    isNot?: UserWhereInput | null;
  };

  export type DateTimeFilter = {
    equals?: Date | string;
    in?: Enumerable<Date> | Enumerable<string>;
    notIn?: Enumerable<Date> | Enumerable<string>;
    lt?: Date | string;
    lte?: Date | string;
    gt?: Date | string;
    gte?: Date | string;
    not?: NestedDateTimeFilter | Date | string;
  };

  export type IntNullableWithAggregatesFilter = {
    equals?: number | null;
    in?: Enumerable<number> | null;
    notIn?: Enumerable<number> | null;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedIntNullableWithAggregatesFilter | number | null;
    count?: NestedIntNullableFilter;
    avg?: NestedFloatNullableFilter;
    sum?: NestedIntNullableFilter;
    min?: NestedIntNullableFilter;
    max?: NestedIntNullableFilter;
  };

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string;
    in?: Enumerable<Date> | Enumerable<string>;
    notIn?: Enumerable<Date> | Enumerable<string>;
    lt?: Date | string;
    lte?: Date | string;
    gt?: Date | string;
    gte?: Date | string;
    not?: NestedDateTimeWithAggregatesFilter | Date | string;
    count?: NestedIntFilter;
    min?: NestedDateTimeFilter;
    max?: NestedDateTimeFilter;
  };

  export type ItemCreateNestedManyWithoutOwnerInput = {
    create?: XOR<
      Enumerable<ItemCreateWithoutOwnerInput>,
      Enumerable<ItemUncheckedCreateWithoutOwnerInput>
    >;
    connectOrCreate?: Enumerable<ItemCreateOrConnectWithoutOwnerInput>;
    connect?: Enumerable<ItemWhereUniqueInput>;
  };

  export type ItemUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<
      Enumerable<ItemCreateWithoutOwnerInput>,
      Enumerable<ItemUncheckedCreateWithoutOwnerInput>
    >;
    connectOrCreate?: Enumerable<ItemCreateOrConnectWithoutOwnerInput>;
    connect?: Enumerable<ItemWhereUniqueInput>;
  };

  export type StringFieldUpdateOperationsInput = {
    set?: string;
  };

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
  };

  export type ItemUpdateManyWithoutOwnerInput = {
    create?: XOR<
      Enumerable<ItemCreateWithoutOwnerInput>,
      Enumerable<ItemUncheckedCreateWithoutOwnerInput>
    >;
    connectOrCreate?: Enumerable<ItemCreateOrConnectWithoutOwnerInput>;
    upsert?: Enumerable<ItemUpsertWithWhereUniqueWithoutOwnerInput>;
    connect?: Enumerable<ItemWhereUniqueInput>;
    set?: Enumerable<ItemWhereUniqueInput>;
    disconnect?: Enumerable<ItemWhereUniqueInput>;
    delete?: Enumerable<ItemWhereUniqueInput>;
    update?: Enumerable<ItemUpdateWithWhereUniqueWithoutOwnerInput>;
    updateMany?: Enumerable<ItemUpdateManyWithWhereWithoutOwnerInput>;
    deleteMany?: Enumerable<ItemScalarWhereInput>;
  };

  export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type ItemUncheckedUpdateManyWithoutOwnerInput = {
    create?: XOR<
      Enumerable<ItemCreateWithoutOwnerInput>,
      Enumerable<ItemUncheckedCreateWithoutOwnerInput>
    >;
    connectOrCreate?: Enumerable<ItemCreateOrConnectWithoutOwnerInput>;
    upsert?: Enumerable<ItemUpsertWithWhereUniqueWithoutOwnerInput>;
    connect?: Enumerable<ItemWhereUniqueInput>;
    set?: Enumerable<ItemWhereUniqueInput>;
    disconnect?: Enumerable<ItemWhereUniqueInput>;
    delete?: Enumerable<ItemWhereUniqueInput>;
    update?: Enumerable<ItemUpdateWithWhereUniqueWithoutOwnerInput>;
    updateMany?: Enumerable<ItemUpdateManyWithWhereWithoutOwnerInput>;
    deleteMany?: Enumerable<ItemScalarWhereInput>;
  };

  export type UserCreateNestedOneWithoutItemsInput = {
    create?: XOR<
      UserCreateWithoutItemsInput,
      UserUncheckedCreateWithoutItemsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutItemsInput;
    connect?: UserWhereUniqueInput;
  };

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
  };

  export type UserUpdateOneWithoutItemsInput = {
    create?: XOR<
      UserCreateWithoutItemsInput,
      UserUncheckedCreateWithoutItemsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutItemsInput;
    upsert?: UserUpsertWithoutItemsInput;
    connect?: UserWhereUniqueInput;
    disconnect?: boolean;
    delete?: boolean;
    update?: XOR<
      UserUpdateWithoutItemsInput,
      UserUncheckedUpdateWithoutItemsInput
    >;
  };

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type NestedIntFilter = {
    equals?: number;
    in?: Enumerable<number>;
    notIn?: Enumerable<number>;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedIntFilter | number;
  };

  export type NestedStringFilter = {
    equals?: string;
    in?: Enumerable<string>;
    notIn?: Enumerable<string>;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    not?: NestedStringFilter | string;
  };

  export type NestedStringNullableFilter = {
    equals?: string | null;
    in?: Enumerable<string> | null;
    notIn?: Enumerable<string> | null;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    not?: NestedStringNullableFilter | string | null;
  };

  export type NestedIntWithAggregatesFilter = {
    equals?: number;
    in?: Enumerable<number>;
    notIn?: Enumerable<number>;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedIntWithAggregatesFilter | number;
    count?: NestedIntFilter;
    avg?: NestedFloatFilter;
    sum?: NestedIntFilter;
    min?: NestedIntFilter;
    max?: NestedIntFilter;
  };

  export type NestedFloatFilter = {
    equals?: number;
    in?: Enumerable<number>;
    notIn?: Enumerable<number>;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedFloatFilter | number;
  };

  export type NestedStringWithAggregatesFilter = {
    equals?: string;
    in?: Enumerable<string>;
    notIn?: Enumerable<string>;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    not?: NestedStringWithAggregatesFilter | string;
    count?: NestedIntFilter;
    min?: NestedStringFilter;
    max?: NestedStringFilter;
  };

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null;
    in?: Enumerable<string> | null;
    notIn?: Enumerable<string> | null;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    not?: NestedStringNullableWithAggregatesFilter | string | null;
    count?: NestedIntNullableFilter;
    min?: NestedStringNullableFilter;
    max?: NestedStringNullableFilter;
  };

  export type NestedIntNullableFilter = {
    equals?: number | null;
    in?: Enumerable<number> | null;
    notIn?: Enumerable<number> | null;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedIntNullableFilter | number | null;
  };

  export type NestedDateTimeFilter = {
    equals?: Date | string;
    in?: Enumerable<Date> | Enumerable<string>;
    notIn?: Enumerable<Date> | Enumerable<string>;
    lt?: Date | string;
    lte?: Date | string;
    gt?: Date | string;
    gte?: Date | string;
    not?: NestedDateTimeFilter | Date | string;
  };

  export type NestedIntNullableWithAggregatesFilter = {
    equals?: number | null;
    in?: Enumerable<number> | null;
    notIn?: Enumerable<number> | null;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedIntNullableWithAggregatesFilter | number | null;
    count?: NestedIntNullableFilter;
    avg?: NestedFloatNullableFilter;
    sum?: NestedIntNullableFilter;
    min?: NestedIntNullableFilter;
    max?: NestedIntNullableFilter;
  };

  export type NestedFloatNullableFilter = {
    equals?: number | null;
    in?: Enumerable<number> | null;
    notIn?: Enumerable<number> | null;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedFloatNullableFilter | number | null;
  };

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string;
    in?: Enumerable<Date> | Enumerable<string>;
    notIn?: Enumerable<Date> | Enumerable<string>;
    lt?: Date | string;
    lte?: Date | string;
    gt?: Date | string;
    gte?: Date | string;
    not?: NestedDateTimeWithAggregatesFilter | Date | string;
    count?: NestedIntFilter;
    min?: NestedDateTimeFilter;
    max?: NestedDateTimeFilter;
  };

  export type ItemCreateWithoutOwnerInput = {
    title: string;
    content?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ItemUncheckedCreateWithoutOwnerInput = {
    id?: number;
    title: string;
    content?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ItemCreateOrConnectWithoutOwnerInput = {
    where: ItemWhereUniqueInput;
    create: XOR<
      ItemCreateWithoutOwnerInput,
      ItemUncheckedCreateWithoutOwnerInput
    >;
  };

  export type ItemUpsertWithWhereUniqueWithoutOwnerInput = {
    where: ItemWhereUniqueInput;
    update: XOR<
      ItemUpdateWithoutOwnerInput,
      ItemUncheckedUpdateWithoutOwnerInput
    >;
    create: XOR<
      ItemCreateWithoutOwnerInput,
      ItemUncheckedCreateWithoutOwnerInput
    >;
  };

  export type ItemUpdateWithWhereUniqueWithoutOwnerInput = {
    where: ItemWhereUniqueInput;
    data: XOR<
      ItemUpdateWithoutOwnerInput,
      ItemUncheckedUpdateWithoutOwnerInput
    >;
  };

  export type ItemUpdateManyWithWhereWithoutOwnerInput = {
    where: ItemScalarWhereInput;
    data: XOR<
      ItemUpdateManyMutationInput,
      ItemUncheckedUpdateManyWithoutItemsInput
    >;
  };

  export type ItemScalarWhereInput = {
    AND?: Enumerable<ItemScalarWhereInput>;
    OR?: Enumerable<ItemScalarWhereInput>;
    NOT?: Enumerable<ItemScalarWhereInput>;
    id?: IntFilter | number;
    title?: StringFilter | string;
    content?: StringNullableFilter | string | null;
    ownerId?: IntNullableFilter | number | null;
    createdAt?: DateTimeFilter | Date | string;
    updatedAt?: DateTimeFilter | Date | string;
  };

  export type UserCreateWithoutItemsInput = {
    name: string;
    nickName?: string | null;
  };

  export type UserUncheckedCreateWithoutItemsInput = {
    id?: number;
    name: string;
    nickName?: string | null;
  };

  export type UserCreateOrConnectWithoutItemsInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutItemsInput,
      UserUncheckedCreateWithoutItemsInput
    >;
  };

  export type UserUpsertWithoutItemsInput = {
    update: XOR<
      UserUpdateWithoutItemsInput,
      UserUncheckedUpdateWithoutItemsInput
    >;
    create: XOR<
      UserCreateWithoutItemsInput,
      UserUncheckedCreateWithoutItemsInput
    >;
  };

  export type UserUpdateWithoutItemsInput = {
    name?: StringFieldUpdateOperationsInput | string;
    nickName?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type UserUncheckedUpdateWithoutItemsInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    nickName?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type ItemUpdateWithoutOwnerInput = {
    title?: StringFieldUpdateOperationsInput | string;
    content?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ItemUncheckedUpdateWithoutOwnerInput = {
    id?: IntFieldUpdateOperationsInput | number;
    title?: StringFieldUpdateOperationsInput | string;
    content?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ItemUncheckedUpdateManyWithoutItemsInput = {
    id?: IntFieldUpdateOperationsInput | number;
    title?: StringFieldUpdateOperationsInput | string;
    content?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number;
  };

  /**
   * DMMF
   */
  export const dmmf: runtime.DMMF.Document;
}

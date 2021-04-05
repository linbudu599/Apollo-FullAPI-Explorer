import 'reflect-metadata';
import 'apollo-cache-control';

import path from 'path';

import { Context } from 'koa';
import { getOperationAST, DocumentNode } from 'graphql';
import { Container as TypeDIContainer } from 'typedi';
import { useContainer as TypeORMUseContainer, getConnection } from 'typeorm';
import { buildSchemaSync, ResolverData } from 'type-graphql';
import { ApolloServer } from 'apollo-server-koa';

// Resolvers
// TODO: generate resolver groups by fs mod
import ExecutorResolver from './resolvers/Executor.resolver';
import TaskResolver from './resolvers/Task.resolver';
import PubSubResolver from './resolvers/PubSub.resolver';
import AccountResolver from './resolvers/Account.resolver';
import SubstanceResolver from './resolvers/Substance.resolver';
import PublicResolver from './resolvers/Public.resolver';
import RecordResolver from './resolvers/Record.resolver';

import RecipeFieldResolver from './resolvers/fields/recipes/Recipe.resolver';
import CookFieldResolver from './resolvers/fields/recipes/Cook.resolver';
import WorkExpFieldResolver from './resolvers/fields/recipes/WorkExp.resolver';

import AccountFieldResolver from './resolvers/fields/Account.resolver';
import ExecutorFieldResolver from './resolvers/fields/Executor.resolver';
import TaskFieldResolver from './resolvers/fields/Task.resolver';
import RecordFieldResolver from './resolvers/fields/Record.resolver';
import SubstanceFieldResolver from './resolvers/fields/Substance.resolver';

// Middlewares & Interceptors Related
import ResolveTime from './middlewares/time';
import { InterceptorOnSCP1128 } from './middlewares/interceptor';
import LogAccessMiddleware from './middlewares/log';
import ErrorLoggerMiddleware from './middlewares/error';
import DataLoaderMiddleware from './middlewares/dataLoader';

// Extensions Related
// Extension by TypeGraphQL
// import { ExtensionsMetadataRetriever } from "./extensions/GetMetadata";
// Extension on Apollo Plugin
import { CustomExtension } from './extensions/apollo';

// Apollo Data Source
import SpaceXDataSource from './datasource/SpaceX';

// Apollo Server Plugin Related
import {
  GraphQLRequestContext,
  GraphQLResponse,
} from 'apollo-server-plugin-base';
import ResponseCachePlugin from 'apollo-server-plugin-response-cache';
import { ApolloServerLoaderPlugin } from './lib/dataloader';
import ComplexityPlugin from './plugins/complexity';
import ExtensionPlugin from './plugins/extension';
import { SchemaReportPlugin, SchemaUsagePlugin } from './plugins/report';
import ScopedContainerPlugin from './plugins/scopedContainer';

// GraphQL Directives Related
import { SchemaDirectiveVisitor } from 'graphql-tools';
import { DeprecatedDirective } from './directives/deprecated';
import { FetchDirective } from './directives/fetch';
import { DateFormatDirective } from './directives/dateFormat';
import { IntlDirective } from './directives/intl';
import { AuthDirective } from './directives/auth';

import {
  UpperDirective,
  LowerDirective,
  CamelCaseDirective,
  StartCaseDirective,
  CapitalizeDirective,
  KebabCaseDirective,
  TrimDirective,
  SnakeCaseDirective,
} from './directives/string';

import {
  MaxLengthDirective,
  MinLengthDirective,
  GreaterThanDirective,
  LessThanDirective,
} from './directives/restrictions';

// Utils
import { log } from './utils/helper';
import { genarateRandomID } from './utils/auth';
import { validateToken } from './utils/jwt';
import { authChecker } from './utils/authChecker';
import { PLAY_GROUND_SETTINGS } from './utils/constants';
import { setRecipeInContainer, insertInitMockData } from './utils/mock';
import { dbConnect } from './utils/connect';

import { IContext } from './typing';

// Prisma Related
import PrismaResolver from './resolvers/prisma/index.resolver';
import { PrismaClient } from './prisma/client';

const prisma = new PrismaClient();

export default async (): Promise<ApolloServer> => {
  const dev = process.env.NODE_ENV === 'development';

  TypeDIContainer.set({ id: 'INIT_INJECT_DATA', factory: () => new Date() });

  const basicMiddlewares = [
    ResolveTime,
    // InterceptorOnSCP1128,
    // ExtensionsMetadataRetriever,
    LogAccessMiddleware,
    DataLoaderMiddleware,
  ];

  setRecipeInContainer();

  const schema = buildSchemaSync({
    resolvers: [
      ExecutorResolver,
      TaskResolver,
      AccountResolver,
      SubstanceResolver,
      PublicResolver,
      RecordResolver,
      // Subscription Resolver
      PubSubResolver,
      // Prisma Resolver
      PrismaResolver,
      // Field Resolver
      ExecutorFieldResolver,
      AccountFieldResolver,
      TaskFieldResolver,
      SubstanceResolver,
      RecordFieldResolver,
      RecipeFieldResolver,
      CookFieldResolver,
      WorkExpFieldResolver,
    ],
    // container: Container,
    // scoped-container，每次从context中拿到本次注册容器
    container: ({ context }: ResolverData<IContext>) => context.container,
    // TypeGraphQL built-in Scalar Date
    dateScalarMode: 'timestamp',
    // authChecker: dev ? () => true : authChecker,
    authChecker,
    authMode: 'error',
    emitSchemaFile: path.resolve(__dirname, './typegraphql/schema.graphql'),
    validate: true,
    globalMiddlewares: dev
      ? basicMiddlewares
      : [...basicMiddlewares, ErrorLoggerMiddleware],
  });

  SchemaDirectiveVisitor.visitSchemaDirectives(schema, {
    sampleDeprecated: DeprecatedDirective,
    fetch: FetchDirective,
    date: DateFormatDirective,
    intl: IntlDirective,
    auth: AuthDirective,
    upper: UpperDirective,
    lower: LowerDirective,
    camel: CamelCaseDirective,
    start: StartCaseDirective,
    capitalize: CapitalizeDirective,
    kebab: KebabCaseDirective,
    snake: SnakeCaseDirective,
    trim: TrimDirective,
    // restriction directives
    max: MaxLengthDirective,
    min: MinLengthDirective,
    greater: GreaterThanDirective,
    less: LessThanDirective,
  });

  const connection = await dbConnect();

  const server = new ApolloServer({
    schema,
    // tracing: true,
    subscriptions: {
      onConnect: () => log('[Subscription] Connected to websocket'),
    },
    context: async ({ ctx }: { ctx: Context }) => {
      // const token: string = ctx.request?.headers?.token ?? null;

      // if (!token) {
      //   return;
      // }

      // const tokenValidation = validateToken(token);
      const { id, accountType, accountRole } = genarateRandomID();
      // 每次请求使用一个随机ID注册容器
      const container = TypeDIContainer.of(String(id));

      // if (!tokenValidation.valid) {
      //   return {};
      // }

      // const context: IContext = {
      //   currentUser: {
      //     accountId: id,
      //     accountType: tokenValidation.info.accountType,
      //     accountRole: tokenValidation.info.accountRole,
      //   },
      //   container,
      // };

      const context: Partial<IContext> = {
        currentUser: {
          accountId: id,
          accountType,
          accountRole,
        },
        container,
        prisma,
        dataLoader: {
          initialized: false,
          loaders: {},
        },
        connection,
      };
      container.set('context', context);
      return context;
    },
    extensions: [() => new CustomExtension()],
    // 其实放在context里就可以自己用了
    dataSources: () => ({
      SpaceXAPI: new SpaceXDataSource(),
    }),

    plugins: [
      SchemaReportPlugin(),
      SchemaUsagePlugin(),
      ComplexityPlugin(schema),
      ExtensionPlugin(),
      ScopedContainerPlugin(TypeDIContainer),
      ApolloServerLoaderPlugin({
        connectionGetter: getConnection,
      }),
      ResponseCachePlugin({
        // 被标记为PRIVATE的字段缓存只会用于相同sessionID
        sessionId: (ctx: GraphQLRequestContext) =>
          ctx.request.http?.headers.get('sessionId') || null,
        shouldReadFromCache: (ctx: GraphQLRequestContext) => false,
        shouldWriteToCache: (ctx: GraphQLRequestContext) => false,
      }),
    ],
    // 关于RootValue和Context：https://stackoverflow.com/questions/44344560/context-vs-rootvalue-in-apollo-graphql
    // 简单的说，RootValue就像是一个自定义的类型（和其他类型一样），但它只拥有一个动态解析的字段
    // RootValue是解析链的初始值 也就是入口Resolver的parent参数
    rootValue: (documentAST: DocumentNode) => {
      const op = getOperationAST(documentAST);
      return {
        operation: op?.operation,
      };
    },
    // 2333 关掉不能在生产环境用playground了hhh 但是能正常查询
    introspection: true,
    // engine: true,
    // formatError: () => {},
    formatResponse: (
      response: GraphQLResponse | null,
      requestContext: GraphQLRequestContext<Record<string, unknown>>
    ) => {
      response!.extensions = {
        ...response!.extensions,
        FROM_RESPONSE_FORMATTER: 'FROM_RESPONSE_FORMATTER',
      };

      return response as GraphQLResponse;
    },
    playground: {
      settings: PLAY_GROUND_SETTINGS,
    },
    cacheControl: {
      defaultMaxAge: 60,
    },
  });

  await insertInitMockData();

  return server;
};

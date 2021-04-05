export const DATA_SOURCE_URL = 'http://api.linbudu.top/data';

export const SPACEX_API = 'https://api.spacexdata.com/v4';

// TODO: 需要更详尽的错误码+信息提示
export enum RESPONSE_INDICATOR {
  NOT_FOUND = 'Resource Not Found',
  EXISTED = 'Resource Existed',
  SUCCESS = 'Success',
  FAILED = 'Operation Failed',
  INVALID_LOGIN_TYPE = 'Invalid Login Type',
  UNAUTHORIZED = 'Unauthorized',
  TOKEN_EXPIRED = 'Token Expired',
  INCORRECT_PWD = 'Invalid Password',
  PERMISSION_DENIED = 'Permission Denied',
  QUERY_NOT_ALLOWED = 'Query Not Allowed',
  MUTATION_NOT_ALLOWED = 'Mutation Not Allowed',
  HIGHER_AUTH_REQUIRED = 'Higher Auth Required',
  UNDER_DEVELOPING = 'Interface Under Developing',
}

/**
 * 鉴权说明: 除未知角色UNKNOWN以外, 其他角色又包含四种账号类型
 * 下发的TOKEN中包含这两种信息
 * @Authorized()装饰器包含的规则数组:
 *
 * 第0项为账号类型, 实际类型高于枚举值即可
 *
 * 第1项为账号角色, 当账号角色中包含UNKNOWN时, 任意角色均可访问此解析器
 *
 * 否则, 仅有对应的角色可以访问
 */

// 账号类型
export enum ACCOUNT_TYPE {
  VISITOR = 1,
  COMMON,
  ADMIN,
  DOMINATOR,
}

// 账号角色
export enum ACCOUNT_ROLE {
  UNKNOWN = 'UNKNOWN',
  PERSONAL = 'PERSONAL',
  ORG = 'ORG',
  ENTERPRISE = 'ENTERPRISE',
  GOV = 'GOV',
}

export type AuthRule = [ACCOUNT_TYPE, Array<ACCOUNT_ROLE>];

export const MAX_ALLOWED_COMPLEXITY = 100;

// https://github.com/vercel/ms
export const TOKEN_EXPIRED_IN = '7d';

export const PLAY_GROUND_SETTINGS = {
  'editor.theme': 'dark' as const,
  'editor.reuseHeaders': true,
  'editor.fontSize': 16,
  'editor.fontFamily': `'Fira Code', 'Source Code Pro', 'Consolas'`,
  'prettier.printWidth': 2,
  'prettier.tabWidth': 2,
  'prettier.useTabs': true,
  'schema.polling.enable': true,
  'schema.polling.interval': 5000,
  'schema.disableComments': false,
  'tracing.hideTracingResponse': false,
  'queryPlan.hideQueryPlanResponse': false,
};

export const SALT = 10;

export const DEFAULT_QUERY_PAGINATION = {
  offset: 0,
  take: 20,
} as const;

export const TypeORMCacheIds = {
  account: 'all_accounts',
  executor: 'all_executors',
  task: 'all_tasks',
  substance: 'all_substances',
};

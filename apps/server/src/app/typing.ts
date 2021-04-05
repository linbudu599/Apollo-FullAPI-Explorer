import { ContainerInstance } from 'typedi';
import DataLoader from 'dataloader';
import { ACCOUNT_TYPE, ACCOUNT_ROLE } from './utils/constants';
import { PrismaClient } from './prisma/client';
import type { Connection } from 'typeorm';

export interface TypeGraphQLDataLoaderContext {
  requestId: string;
  connectionGetter?: () => Connection;
}
export interface IContext {
  currentUser: {
    accountId: number;
    accountType: ACCOUNT_TYPE;
    accountRole: ACCOUNT_ROLE;
  };
  container: ContainerInstance;
  prisma: PrismaClient;
  dataLoader: {
    initialized: boolean;
    loaders: Record<string, Record<string, DataLoader<any, any>>>;
  };
  connection: Connection;
  tgdLoader: TypeGraphQLDataLoaderContext;
}

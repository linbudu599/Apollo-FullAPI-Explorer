import { ContainerInstance } from "typedi";
import DataLoader from "dataloader";
import { ACCOUNT_TYPE, ACCOUNT_ROLE } from "./utils/constants";
import { PrismaClient } from "./prisma/client";

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
}
import { Service } from 'typedi';
import { Repository, Connection } from 'typeorm';
import { InjectRepository, InjectConnection } from 'typeorm-typedi-extensions';

import Account from '../entities/Account';
import {
  IAccount,
  AccountRegistryInput,
  AccountRelation,
  AccountProfileQueryInput,
} from '../graphql/Account';

import { PaginationOptions } from '../graphql/Common';
import { TypeORMCacheIds } from '../utils/constants';

export interface IAccountService {
  getAllAccounts(
    pagination: Required<PaginationOptions>,

    relations: AccountRelation[]
  ): Promise<Account[]>;
  getOneAccount(
    accountName: string,
    relations: AccountRelation[]
  ): Promise<Account | undefined>;
  getOneAccountById(
    accountId: number,
    relations: AccountRelation[]
  ): Promise<Account | undefined>;

  // getAccountsByConditions(
  //   conditions: AccountProfileQueryInput,
  //   pagination: Required<PaginationOptions>,
  //   relations: AccountRelation[]
  // ): Promise<Account[]>;

  createAccount(account: AccountRegistryInput): Promise<Account>;

  updateAccount(
    indicator: number,
    infoUpdate: Partial<IAccount>
  ): Promise<Account>;
  deleteAccount(accountId: number): Promise<void>;
}

@Service()
export default class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,

    @InjectConnection()
    private readonly connection: Connection
  ) {}

  private generateSelectBuilder(relations: AccountRelation[] = []) {
    let selectQueryBuilder = this.accountRepository.createQueryBuilder(
      'account'
    );

    if (relations.includes('relatedRecord')) {
      selectQueryBuilder = selectQueryBuilder
        .leftJoinAndSelect('account.relatedRecord', 'records')
        .leftJoinAndSelect('records.recordExecutor', 'executor')
        .leftJoinAndSelect('records.recordTask', 'task')
        .leftJoinAndSelect('records.recordSubstance', 'substance');
    }

    return selectQueryBuilder;
  }

  async getAllAccounts(
    pagination: Required<PaginationOptions>,

    relations: AccountRelation[] = []
  ): Promise<Account[]> {
    const { offset, take } = pagination;

    const accounts = await this.generateSelectBuilder(relations)
      .skip(offset)
      .take(take)
      .cache(TypeORMCacheIds.account, 1000 * 5)
      .getMany();

    return accounts;
  }

  async getOneAccount(
    accountName: string,
    relations: AccountRelation[] = []
  ): Promise<Account | undefined> {
    const account = await this.generateSelectBuilder(relations)
      .where('account.accountName = :accountName', { accountName })
      .getOne();

    return account;
  }

  async getOneAccountById(
    accountId: number,
    relations: AccountRelation[] = []
  ): Promise<Account | undefined> {
    const account = await this.generateSelectBuilder(relations)
      .where('account.accountId = :accountId', { accountId })
      .getOne();

    return account;
  }

  async createAccount(account: AccountRegistryInput) {
    // FIXME: this kind save action will not trigger After/BeforeInsert Hook
    // const res = await this.accountRepository.save(account);
    // await this.connection.queryResultCache?.remove([TypeORMCacheIds.account]);
    // return res;
  }

  async updateAccount(
    indicator: number,
    infoUpdate: Partial<IAccount>
  ): Promise<Account> {
    await this.accountRepository.update(indicator, infoUpdate);

    const updatedItem = (await this.getOneAccountById(indicator))!;

    return updatedItem;
  }

  async deleteAccount(accountId: number): Promise<void> {
    await this.accountRepository
      .createQueryBuilder()
      .delete()
      .from(Account)
      .where('accountId = :accountId')
      .setParameter('accountId', accountId)
      .execute();

    await this.connection.queryResultCache?.remove([TypeORMCacheIds.account]);
  }
}

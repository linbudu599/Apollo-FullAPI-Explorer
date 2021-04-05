import { Resolver, Root, FieldResolver, Arg } from 'type-graphql';

import Account from '../../entities/Account';
import Record from '../../entities/Record';

import AccountService from '../../services/Account.service';
import RecordService from '../../services/Record.service';

@Resolver((of) => Account)
export default class AccountFieldResolver {
  constructor(
    private readonly accountService: AccountService,
    private readonly recordService: RecordService
  ) {}

  @FieldResolver(() => [Record])
  async RecordFieldResolver(@Root() account: Account) {
    const res = await this.recordService.getFullRecordByAccountName(
      account.accountName
    );

    return res;
  }
}

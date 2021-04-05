import {
  Resolver,
  Query,
  Arg,
  Mutation,
  UseMiddleware,
  Root,
  FieldResolver,
  Int,
} from 'type-graphql';
import { plainToClass } from 'class-transformer';

import {
  AccountStatus,
  LoginOrRegisterStatus,
  LoginOrRegisterStatusHandler,
  StatusHandler,
  AccountUnionResult,
  PaginationOptions,
} from '../graphql/Common';
import {
  AccountRegistryInput,
  AccountLoginInput,
  AccountProfileInput,
  AccountProfileQueryInput,
  AccountProfileUpdateInput,
  AccountPasswordModifyInput,
  AccountRelationsInput,
  AccountRelation,
  getAccountRelations,
  AccountJSON,
} from '../graphql/Account';

import Account, { AccountProfile } from '../entities/Account';

import AccountService from '../services/Account.service';

import { ExtraFieldLogMiddlewareGenerator } from '../middlewares/log';

import { ACCOUNT_TYPE, RESPONSE_INDICATOR } from '../utils/constants';

import { generatePagination, mergeJSONWithObj } from '../utils/helper';
import { encode, compare } from '../utils/bcrypt';
import { dispatchToken, validateToken } from '../utils/jwt';

@Resolver((of) => Account)
export default class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  // TODO: Private + Super User Autn Required
  @Query(() => AccountStatus, {
    nullable: false,
    description: '查询所有用户',
  })
  @UseMiddleware(ExtraFieldLogMiddlewareGenerator('Check All Accounts'))
  async QueryAllAccounts(
    @Arg('pagination', { nullable: true })
    pagination: PaginationOptions,

    @Arg('relations', (type) => AccountRelationsInput, { nullable: true })
    relationOptions: AccountRelationsInput = {}
  ): Promise<AccountStatus> {
    try {
      const queryPagination = generatePagination(pagination);
      const relations: AccountRelation[] = getAccountRelations(relationOptions);

      const accounts = await this.accountService.getAllAccounts(
        queryPagination,
        relations
      );

      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, accounts);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Query(() => AccountStatus, {
    nullable: false,
    description: '基于资料查找用户',
  })
  async QueryAccountByProfile(
    @Arg('profileQueryParams', (type) => AccountProfileQueryInput, {
      nullable: true,
    })
    params: AccountProfileQueryInput,

    @Arg('pagination', { nullable: true })
    pagination: PaginationOptions,

    @Arg('relations', (type) => AccountRelationsInput, { nullable: true })
    relationOptions: AccountRelationsInput = {}
  ): Promise<AccountStatus> {
    try {
      // TODO: 可能换个支持这种方式的数据库再搞
      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, []);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Query(() => LoginOrRegisterStatus, {
    nullable: false,
    description: '账号登录',
  })
  async AccountLogin(
    @Arg('account', (type) => AccountLoginInput)
    { accountName, accountPwd, accountType, accountRole }: AccountLoginInput
  ): Promise<LoginOrRegisterStatus> {
    try {
      const account = await this.accountService.getOneAccount(accountName);
      if (!account) {
        return new LoginOrRegisterStatusHandler(
          false,
          RESPONSE_INDICATOR.NOT_FOUND,
          ''
        );
      }

      const {
        accountPwd: savedPwd,
        accountType: savedType,
        accountRole: savedRole,
      } = account;
      const pass = compare(accountPwd, savedPwd);

      if (!pass) {
        return new LoginOrRegisterStatusHandler(
          false,
          RESPONSE_INDICATOR.INCORRECT_PWD,
          ''
        );
      }

      // 这个真的会发生吗
      // if (savedType !== accountType || savedRole !== accountRole) {
      //   return new LoginOrRegisterStatusHandler(
      //     false,
      //     RESPONSE_INDICATOR.INVALID_LOGIN_TYPE,
      //     ""
      //   );
      // }

      const token = dispatchToken(accountName, accountType, accountRole);

      return new LoginOrRegisterStatusHandler(
        true,
        RESPONSE_INDICATOR.SUCCESS,
        token
      );
    } catch (error) {
      return new LoginOrRegisterStatusHandler(false, JSON.stringify(error), '');
    }
  }

  @Query(() => AccountStatus, {
    nullable: false,
    description: '账号详情',
  })
  async CheckAccountDetail(
    @Arg('accountId', (type) => Int) accountId: number,

    @Arg('relations', (type) => AccountRelationsInput, { nullable: true })
    relationOptions: Partial<AccountRelationsInput> = {}
  ): Promise<AccountStatus> {
    const relations: AccountRelation[] = getAccountRelations(relationOptions);
    const account = await this.accountService.getOneAccountById(
      accountId,
      relations
    );
    if (!account) {
      return new StatusHandler(false, RESPONSE_INDICATOR.NOT_FOUND, []);
    }

    return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [account]);
  }

  @Query(() => LoginOrRegisterStatus, {
    nullable: false,
    description: '检验token是否合法',
  })
  async CheckIsTokenValid(
    @Arg('token') token: string
  ): Promise<LoginOrRegisterStatus> {
    const validateRes = validateToken(token);
    console.log(validateRes);
    if (validateRes.valid) {
      return new LoginOrRegisterStatusHandler(
        true,
        RESPONSE_INDICATOR.SUCCESS,
        token,
        validateRes.info.exp
      );
    } else {
      return new LoginOrRegisterStatusHandler(
        false,
        RESPONSE_INDICATOR.TOKEN_EXPIRED,
        token,
        -1
      );
    }
  }

  @Query(() => LoginOrRegisterStatus, {
    nullable: false,
    description: '验证邮件',
  })
  async CheckVerifyCode(): Promise<LoginOrRegisterStatus> {
    return new StatusHandler(true, RESPONSE_INDICATOR.UNDER_DEVELOPING, '');
  }

  @Mutation(() => LoginOrRegisterStatus, {
    nullable: false,
    description: '新用户注册',
  })
  async AccountRegistry(
    @Arg('account', (type) => AccountRegistryInput)
    account: AccountRegistryInput
  ): Promise<LoginOrRegisterStatus> {
    try {
      const isExistingAccount = await this.accountService.getOneAccount(
        account.accountName
      );

      if (isExistingAccount) {
        return new LoginOrRegisterStatusHandler(
          false,
          RESPONSE_INDICATOR.EXISTED
        );
      }
      // account.accountPwd = encode(account.accountPwd);
      await this.accountService.createAccount(account);

      const token = dispatchToken(
        account.accountName,
        account.accountType,
        account.accountRole
      );

      return new LoginOrRegisterStatusHandler(
        true,
        RESPONSE_INDICATOR.SUCCESS,
        token
      );
    } catch (error) {
      return new LoginOrRegisterStatusHandler(false, JSON.stringify(error), '');
    }
  }

  @Mutation(() => LoginOrRegisterStatus, {
    nullable: false,
    description: '修改密码',
  })
  async ModifyPassword(
    @Arg('accountInfo', (type) => AccountPasswordModifyInput)
    {
      accountId,
      accountName,
      prevPassword,
      newPassword,
    }: AccountPasswordModifyInput
  ): Promise<LoginOrRegisterStatus> {
    try {
      const isExistingAccount = await this.accountService.getOneAccountById(
        accountId
      );

      if (!isExistingAccount) {
        return new LoginOrRegisterStatusHandler(
          false,
          RESPONSE_INDICATOR.NOT_FOUND
        );
      }

      if (!compare(prevPassword, isExistingAccount.accountPwd)) {
        return new LoginOrRegisterStatusHandler(
          false,
          RESPONSE_INDICATOR.INCORRECT_PWD
        );
      }

      await this.accountService.updateAccount(accountId, {
        accountPwd: encode(newPassword),
      });

      // const token = dispatchToken(accountName, isExistingAccount.accountType);

      return new LoginOrRegisterStatusHandler(
        true,
        RESPONSE_INDICATOR.SUCCESS
        // token
      );
    } catch (error) {
      return new LoginOrRegisterStatusHandler(false, JSON.stringify(error), '');
    }
  }

  @Mutation(() => LoginOrRegisterStatus, {
    nullable: false,
    description: '用户永久注销',
  })
  async AccountDestory(
    @Arg('accountName') accountName: string,
    @Arg('accountPwd') accountPwd: string
  ) {
    try {
      const isExistingAccount = await this.accountService.getOneAccount(
        accountName
      );

      if (!isExistingAccount) {
        return new LoginOrRegisterStatusHandler(
          false,
          RESPONSE_INDICATOR.NOT_FOUND
        );
      }
      const {
        accountPwd: savedPwd,
        accountType: savedType,
      } = isExistingAccount;

      const pass = compare(accountPwd, savedPwd);

      if (!pass) {
        return new LoginOrRegisterStatusHandler(
          false,
          RESPONSE_INDICATOR.INCORRECT_PWD,
          ''
        );
      }

      await this.accountService.deleteAccount(isExistingAccount.accountId);

      return new LoginOrRegisterStatusHandler(
        true,
        RESPONSE_INDICATOR.SUCCESS,
        ''
      );
    } catch (error) {
      return new LoginOrRegisterStatusHandler(false, JSON.stringify(error), '');
    }
  }

  // Auth: ADMIN / DOMINATOR + Same Type Required
  @Mutation(() => AccountUnionResult, {
    nullable: false,
    description: '提升/下降 用户类型',
  })
  async AccountLevelMutate(
    @Arg('accountId', (type) => Int) accountId: number,
    @Arg('type', (type) => ACCOUNT_TYPE) type: ACCOUNT_TYPE
  ): Promise<AccountStatus | LoginOrRegisterStatus> {
    try {
      const isExistingAccount = await this.accountService.getOneAccountById(
        accountId
      );

      if (!isExistingAccount) {
        return plainToClass(LoginOrRegisterStatus, {
          success: false,
          message: RESPONSE_INDICATOR.NOT_FOUND,
        });
      }

      const updated = await this.accountService.updateAccount(accountId, {
        // accountType: type,
      });

      return plainToClass(AccountStatus, {
        success: true,
        message: RESPONSE_INDICATOR.SUCCESS,
        data: [updated],
      });
    } catch (error) {
      return plainToClass(LoginOrRegisterStatus, {
        success: false,
        message: JSON.stringify(error),
        token: '',
      });
    }
  }

  @Mutation(() => LoginOrRegisterStatus, {
    nullable: false,
    description: '变更用户角色',
  })
  async MutateAccountRole(): Promise<LoginOrRegisterStatus> {
    return new StatusHandler(true, RESPONSE_INDICATOR.UNDER_DEVELOPING, '');
  }

  @Mutation(() => LoginOrRegisterStatus, {
    nullable: false,
    description: '发送邮件验证码',
  })
  async SendEmailVerifyCode(): Promise<LoginOrRegisterStatus> {
    return new StatusHandler(true, RESPONSE_INDICATOR.UNDER_DEVELOPING, '');
  }

  @Mutation(() => LoginOrRegisterStatus, {
    nullable: false,
    description: '发送短信验证码',
  })
  async SendPhoneVerifyCode(): Promise<LoginOrRegisterStatus> {
    return new StatusHandler(true, RESPONSE_INDICATOR.UNDER_DEVELOPING, '');
  }

  @Mutation(() => AccountStatus, {
    nullable: false,
    description: '账号详情变更',
  })
  async MutateAccountProfile(
    @Arg('accountId', (type) => Int) accountId: number,
    @Arg('modifiedAccountProfile') accountProfile: AccountProfileUpdateInput
  ): Promise<AccountStatus> {
    try {
      const account = await this.accountService.getOneAccountById(accountId);
      if (!account) {
        return new LoginOrRegisterStatusHandler(
          false,
          RESPONSE_INDICATOR.NOT_FOUND,
          ''
        );
      }

      const res = await this.accountService.updateAccount(accountId, {
        accountProfile: mergeJSONWithObj(
          account.accountProfile,
          accountProfile
        ),
      });

      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [res]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @Mutation(() => AccountStatus, {
    nullable: false,
    description: '冻结账号',
  })
  async FreezeAccount(
    @Arg('accountId', (type) => Int) accountId: number
  ): Promise<AccountStatus> {
    try {
      const account = await this.accountService.getOneAccountById(accountId);
      if (!account) {
        return new LoginOrRegisterStatusHandler(
          false,
          RESPONSE_INDICATOR.NOT_FOUND,
          ''
        );
      }

      const res = await this.accountService.updateAccount(accountId, {
        accountAvaliable: false,
      });

      return new StatusHandler(true, RESPONSE_INDICATOR.SUCCESS, [res]);
    } catch (error) {
      return new StatusHandler(false, JSON.stringify(error), []);
    }
  }

  @FieldResolver(() => AccountProfile, {
    nullable: false,
    description: '账号资料',
  })
  async AccountProfileField(@Root() account: Account): Promise<AccountProfile> {
    console.log(account);
    const { accountProfile } = account;
    return JSON.parse(accountProfile);
  }

  @FieldResolver(() => AccountJSON, {
    nullable: false,
    description: 'ACCOUNT_JSON_TYPE',
  })
  async AccountJSONField(@Root() account: Account): Promise<AccountJSON> {
    return account.accountJSON;
  }
}

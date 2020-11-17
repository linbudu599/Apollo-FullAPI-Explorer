import {
  Resolver,
  Query,
  Arg,
  Args,
  Mutation,
  Authorized,
  UseMiddleware,
  Ctx,
  FieldResolver,
  Root,
  ResolverInterface,
} from "type-graphql";
import { Repository, Transaction, TransactionRepository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import User from "../entity/User";
import Task from "../entity/Task";

import StatusHandler, { Status } from "../graphql/Status";
import {
  UserCreateInput,
  UserUpdateInput,
  UserQueryArgs,
} from "../graphql/User";

import { ACCOUNT_AUTH } from "../utils/constants";

import { LogAccessMiddleware } from "../middleware/log";
import { IContext } from "../typding";

@Resolver((of) => User)
export default class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>
  ) {}

  // @Authorized(ACCOUNT_AUTH.ADMIN)
  @Query(() => [User]!)
  @UseMiddleware(LogAccessMiddleware)
  async Users(@Ctx() ctx: IContext): Promise<User[]> {
    // TODO: req wrapper

    const a = await this.taskRepository.find({
      where: {
        assignee: {
          uid: 1,
        },
      },
      relations: ["assignee"],
    });

    return await this.userRepository.find();
  }

  @Query(() => User)
  async FindUserById(@Arg("uid") uid: string): Promise<User | undefined> {
    // TODO: req wrapper
    // TODO: number -> string
    return this.userRepository.findOne({ uid });
  }

  @Query(() => [User]!)
  async FindUserByConditions(
    @Args({ validate: false }) conditions: UserQueryArgs
  ): Promise<User[]> {
    // TODO: req wrapper
    return await this.userRepository.find({ ...conditions });
  }

  // TODO: admin auth required
  @Transaction()
  @Mutation(() => User)
  async CreateUser(
    @Arg("newUserInfo") user: UserCreateInput,
    @TransactionRepository(User)
    userTransRepo: Repository<User>
  ): Promise<(User & UserCreateInput) | undefined> {
    // TODO: validate params
    try {
      const res = await userTransRepo.save(user);
      return res;
    } catch (error) {
      console.error(error);
    }
  }

  @Transaction()
  @Mutation(() => Status, { nullable: true })
  async UpdateUser(
    @Arg("modifiedUserInfo") user: UserUpdateInput,
    @TransactionRepository(User)
    userTransRepo: Repository<User>
  ): Promise<Status | undefined> {
    // TODO: find first
    try {
      const res = await userTransRepo.update({ uid: user.uid }, user);
      // TODO: res check & error handler
      return new StatusHandler(true, "Success");
    } catch (error) {
      console.error(error);
    }
  }

  @Transaction()
  @Mutation(() => Status, { nullable: true })
  async DeleteUser(
    @Arg("uid") uid: string,
    @TransactionRepository(User)
    userTransRepo: Repository<User>
  ): Promise<Status | undefined> {
    // TODO: find first
    try {
      const res = await userTransRepo.delete({ uid });
      // TODO: check res
      return new StatusHandler(true, "Success");
    } catch (error) {
      console.error(error);
    }
  }

  @Transaction()
  @Mutation(() => Status, { nullable: true })
  async NotLongerFull(
    @Arg("uid") uid: string,
    @TransactionRepository(User)
    userTransRepo: Repository<User>
  ): Promise<Status | undefined> {
    try {
      const item = await userTransRepo.update({ uid }, { isFool: false });
      return new StatusHandler(true, "Success");
    } catch (error) {
      console.error(error);
    }
  }

  @FieldResolver()
  async spAgeField(
    @Root() user: User,
    @Arg("param", { nullable: true }) param?: number
  ): Promise<number> {
    // ... do sth addtional
    return user.age;
  }
}

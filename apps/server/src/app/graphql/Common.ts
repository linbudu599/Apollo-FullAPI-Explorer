import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import {
  Field,
  ObjectType,
  InputType,
  Int,
  InterfaceType,
  createUnionType,
} from 'type-graphql';

import Executor from '../entities/Executor';
import Task from '../entities/Task';
import Substance from '../entities/Substance';
import Account from '../entities/Account';
import Record from '../entities/Record';

import { IPaginationOptions } from '../utils/helper';

@InterfaceType({ description: 'Basic Status Wrapper' })
export class IBaseStatus {
  @Field()
  success!: boolean;

  @Field()
  message!: string;
}

@ObjectType({
  implements: IBaseStatus,
  description: 'Record Response Status Indicator',
})
export class RecordStatus extends IBaseStatus {
  @Field((type) => [Record!]!, { nullable: true })
  data?: Record[];
}

@ObjectType({
  implements: IBaseStatus,
  description: 'Primitive Response Status Indicator',
})
export class AccountStatus extends IBaseStatus {
  @Field((type) => [Account!]!, { nullable: true })
  data?: Account[];
}

@ObjectType({
  implements: IBaseStatus,
  description: 'Primitive Response Status Indicator',
})
export class PrimitiveStatus extends IBaseStatus {
  @Field(() => String, { nullable: true })
  data?: any;
}

@ObjectType({
  implements: IBaseStatus,
  description: 'Substance Response Status Indicator',
})
export class SubstanceStatus extends IBaseStatus {
  @Field((type) => [Substance!]!, { nullable: true })
  data?: Substance[];
}

@ObjectType({
  implements: IBaseStatus,
  description: 'Executor Response Status Indicator',
})
export class ExecutorStatus extends IBaseStatus {
  @Field((type) => [Executor!]!, { nullable: true })
  data?: Executor[];
}

@ObjectType({
  implements: IBaseStatus,
  description: 'Task Response Status Indicator',
})
export class TaskStatus extends IBaseStatus {
  @Field((type) => [Task!]!, { nullable: true })
  data?: Task[];
}

@ObjectType({
  implements: IBaseStatus,
  description: 'Login / Register Status Indicator',
})
export class LoginOrRegisterStatus extends IBaseStatus {
  @Field({ nullable: true })
  token?: string;

  @Field(() => Int, { nullable: true })
  expiredDate?: number;
}

export class LoginOrRegisterStatusHandler {
  constructor(
    public success: boolean,
    public message: string,
    public token?: string,
    public expiredDate?: number
  ) {}
}

export class StatusHandler {
  constructor(
    public success: boolean,
    public message: string,
    public data: any = []
  ) {}
}

@InputType({ description: 'Pagination Options Input' })
export class PaginationOptions implements IPaginationOptions {
  @Field(() => Int, { nullable: true })
  @Max(100)
  @Min(0)
  @IsOptional()
  @IsNumber()
  offset?: number;

  @Field(() => Int, { nullable: true })
  @Max(200)
  @Min(0)
  @IsOptional()
  @IsNumber()
  take?: number;
}

export const AccountUnionResult = createUnionType({
  name: 'AccountUnionResult',
  types: () => [LoginOrRegisterStatus, AccountStatus] as const,
});

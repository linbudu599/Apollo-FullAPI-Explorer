import { Field, ID, InterfaceType, registerEnumType } from "type-graphql";

import Task from "../entity/Task";

import { DifficultyLevel } from "./Public";
import { ITask } from "./Task";

enum CthulhuType {
  OUTER_GODS,
  ELDER_GODS,
  OLD_DOMINATOR,
}

registerEnumType(CthulhuType, {
  name: "CthulhuType",
  description: "Known Cthulhu Type",
});

@InterfaceType()
export abstract class ISubstance {
  @Field((type) => ID, { nullable: false })
  substanceId!: string;

  @Field({ nullable: false })
  substanceName!: string;

  @Field({ nullable: false })
  substanceDesc!: string;

  @Field({ nullable: false })
  substanceIssues!: string;

  @Field(() => DifficultyLevel, { nullable: false })
  substanceLevel!: DifficultyLevel;

  @Field({ nullable: false })
  asylumed!: boolean;

  @Field(() => Task, { nullable: true })
  relatedTask?: ITask;

  @Field({ nullable: false })
  substanceAppearDate!: Date;

  @Field({ nullable: false })
  lastActiveDate!: Date;
}
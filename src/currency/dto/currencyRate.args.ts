import { Max, Min } from 'class-validator';
import { ArgsType, Field, Int, InputType } from 'type-graphql';

@InputType()
export class LatestOptionsArgs {
  @Field(() => [String], { nullable: true })
  symbols?: Array<string> | string = [];

  @Field(() => String, { nullable: true })
  base?: string = 'EUR';
}

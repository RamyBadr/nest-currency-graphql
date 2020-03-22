import { ObjectType, Field, Int, ID, Float } from 'type-graphql';
import { DateScalar } from '../../common/scalars/date.scalar';
// import { CurrencyCode } from './currencyCode.enum';

export class Rates {
  [currency: string]: number;
}

@ObjectType()
export class CurrencyRate {
  @Field({ nullable: true })
  currency: string;

  @Field(() => Float, { nullable: true })
  rate: number;
}

@ObjectType()
export class CurrencyRateResponseError {
  @Field(() => Int, { nullable: true })
  code: number;
  @Field({ nullable: true })
  type?: string;
  @Field({ nullable: true })
  info?: string;
}
@ObjectType()
export class CurrencyRateResponse {
  @Field(() => Boolean)
  // @IsBoolean()
  success: boolean;

  @Field(() => Int, { nullable: true })
  // @IsNumber()
  timestamp?: number;

  @Field({ nullable: true })
  // @IsString()
  readonly base?: string;

  @Field({ nullable: true })
  date?: string;
  @Field(() => CurrencyRateResponseError, { nullable: true })
  error?: CurrencyRateResponseError;
  @Field(() => [CurrencyRate], { nullable: true })
  currencyRates?: Array<CurrencyRate>;

  rates?: Rates;
}

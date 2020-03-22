import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  CurrencyRateResponse,
  Rates,
  CurrencyRate,
} from './dto/currencyResponse.dto';
import { CurrencyService } from './currency.service';
import { LatestOptionsArgs } from './dto/currencyRate.args';

@Resolver()
export class CurrencyResolver {
  constructor(private readonly service: CurrencyService) {}
  @Query(() => CurrencyRateResponse)
  async latest(
    @Args('filter') filter: LatestOptionsArgs,
  ): Promise<CurrencyRateResponse> {
    let result = await this.service.getLatest(filter);

    if (result.rates) {
      result.currencyRates = this.mapRates(result.rates);
    }
    return result;
  }
  public mapRates(rates: Rates): Array<CurrencyRate> {
    let currArray: Array<CurrencyRate> = [];
    for (const [currency, rate] of Object.entries(rates)) {
      currArray.push({
        currency: currency,
        rate: rate,
      });
    }
    return currArray;
  }
}

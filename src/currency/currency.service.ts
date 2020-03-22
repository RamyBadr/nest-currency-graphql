import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { LatestOptionsArgs } from './dto/currencyRate.args';
import {
  CurrencyRateResponse,
  Rates,
  CurrencyRate,
} from './dto/currencyResponse.dto';
import * as dotenv from 'dotenv';
import { isArray } from 'util';
dotenv.config();

@Injectable()
export class CurrencyService {
  constructor(private httpService: HttpService) {}

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
  async getLatest(params?: LatestOptionsArgs): Promise<CurrencyRateResponse> {
    if (params.symbols && isArray(params.symbols)) {
      params.symbols = params.symbols.join(',');
    }
    let result = await this.httpService
      .get(process.env.FIXER_BASE_URL + '/latest', {
        params: {
          access_key: process.env.FIXER_API_KEY,
          ...params,
        },
      })
      .toPromise<AxiosResponse<CurrencyRateResponse>>();
    return result.data as CurrencyRateResponse;
  }

  // async getSymbols(): Promise<any> {
  //     return this.httpService
  //         .get(this.configService.fixerBaseUrl + '/symbols', {
  //             params: {
  //                 access_key: this.configService.fixerApiKey,
  //             },
  //         })
  //         .toPromise();
  // }
}

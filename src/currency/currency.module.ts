import { Module, forwardRef, HttpModule } from '@nestjs/common';
import { CurrencyResolver } from './currency.resolver';
import { DateScalar } from '../common/scalars/date.scalar';
import { CurrencyService } from './currency.service';

@Module({
  imports: [HttpModule],
  providers: [CurrencyResolver, CurrencyService],
})
export class CurrencyModule {}

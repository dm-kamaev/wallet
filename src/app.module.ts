import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { TransferModule } from './transfer/transfer.module';
import { ZodValidationPipe } from 'nestjs-zod';


@Module({
  imports: [AccountModule, TransferModule],
  controllers: [],
  providers: [
    {
      provide: 'APP_PIPE',
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}

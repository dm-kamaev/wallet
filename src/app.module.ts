import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { TransferModule } from './transfer/transfer.module';
import { ZodValidationPipe } from 'nestjs-zod';


@Module({
  imports: [AccountModule, TransferModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_PIPE',
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}

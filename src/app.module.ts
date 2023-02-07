import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { TransferModule } from './transfer/transfer.module';

@Module({
  imports: [AccountModule, TransferModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

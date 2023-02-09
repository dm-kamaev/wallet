import { Controller, Post, Body, Param } from '@nestjs/common';
import { TransferService } from './transfer.service';
import TransferDto from './transfer.dto';

@Controller()
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post('/transfer/:sourceAccountId/:targetAccountId')
  async transfer(
    @Param('sourceAccountId') sourceAccountId: string,
    @Param('targetAccountId') targetAccountId: string,
    @Body() transferDto: TransferDto,
  ) {
    return await this.transferService.transfer({
      sourceAccountId,
      targetAccountId,
      amount: transferDto.amount,
    });
  }
}

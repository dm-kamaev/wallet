import { Controller, Get, Param } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('/account/:id')
  async getAccount(@Param('id') id: string) {
    return await this.accountService.getAccount(id);
  }
}

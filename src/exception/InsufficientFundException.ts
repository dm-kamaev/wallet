import { HttpException, HttpStatus } from '@nestjs/common';

export default class InsufficientFundException extends HttpException {
  constructor(msg: string, cause?: { cause: Error }) {
    super(msg, HttpStatus.UNPROCESSABLE_ENTITY, cause);
  }
}

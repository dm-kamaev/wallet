import { HttpException, HttpStatus } from '@nestjs/common';

export default class OverlimitException extends HttpException {
  constructor(msg: string, cause?: { cause: Error }) {
    super(msg, HttpStatus.UNPROCESSABLE_ENTITY, cause);
  }
}

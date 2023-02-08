import { HttpException, HttpStatus } from '@nestjs/common';

export default class NotFoundException extends HttpException {
  constructor(msg: string, cause?: { cause: Error }) {
    super(msg, HttpStatus.NOT_FOUND, cause);
  }
}

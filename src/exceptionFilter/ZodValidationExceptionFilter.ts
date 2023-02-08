import { ZodValidationException } from 'nestjs-zod';
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

@Catch(ZodValidationException)
export default class ZodValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ZodValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const zodError = exception.getZodError();
    response.status(400).json({
      statusCode: 400,
      message: zodError.issues[0].message,
    });
  }
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import ZodValidationExceptionFilter from './exceptionFilter/ZodValidationExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ZodValidationExceptionFilter());
  await app.listen(3000);
}
bootstrap();

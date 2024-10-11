import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  // get ENV data
  const config = app.get(ConfigService);

  // client Domain OR Host AND allow Http Method
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
    credentials: true, // accept Cookies OR Authorization Header
  });

  // use graceful shutdown
  app.enableShutdownHooks();

  await app.listen(config.get('APP_PORT'));
}

bootstrap();

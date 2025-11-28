import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from './lib/config';
import { LoggingInterceptor } from './lib/interceptor/logging.interceptor';
import { Logger, ValidationPipe } from '@nestjs/common';
import { useContainer } from '@nestjs/class-validator';

let logger: Logger;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const config = app.get(ConfigService);
  logger = config.logger;
  const documentBuilder = new DocumentBuilder()
    .setTitle('Multiquiztador')
    .setVersion(process.env.npm_package_version ?? '0.0.1')
    .setDescription(
      'Fast-paced numeric game for duels and large companies alike',
    )
    .build();
  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('/api', app, document);
  app.useGlobalInterceptors(new LoggingInterceptor());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(config.port);
  return config.port;
}
bootstrap().then((port) =>
  logger?.log(`Server is running on port \u001b[33m${port}`),
);

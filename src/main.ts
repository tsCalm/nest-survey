import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ApolloError } from 'apollo-server-express';
import { STATUS_CODES } from 'http';
import { AppModule } from './app.module';
import { createDummyData } from './data';
import { GqlExceptionFilter } from './filter/gql-exception.filter';
import { QueryFailedExceptionFilter } from './filter/query-exception.filter';
import { MyLogger } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });
  const configService = app.get(ConfigService);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      exceptionFactory: (error) => {
        throw new ApolloError(
          `${error.map((i) => Object.values(i.constraints)[0])}`,
          STATUS_CODES[400],
          {
            statusCode: 400,
          },
        );
      },
    }),
  );
  app.useGlobalFilters(
    new QueryFailedExceptionFilter(),
    new GqlExceptionFilter(),
  );
  app.useLogger(new MyLogger());
  const port = configService.get('PORT');
  const createDummy = configService.get('CREATE_DUMMY');
  if (createDummy === 'true') createDummyData();
  await app.listen(port).then(async () => {
    console.log(`port: ${port} server start!!`);
  });
}
bootstrap();

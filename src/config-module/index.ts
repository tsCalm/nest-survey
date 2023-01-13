import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import envFile from './env.config';
import { typeOrmConfigAsync } from './typeorm.config';
import { graphQLConfigAsync } from './graphql.config';

@Module({
  imports: [
    envFile,
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    GraphQLModule.forRootAsync(graphQLConfigAsync),
  ],
})
export class ConfigModule {}

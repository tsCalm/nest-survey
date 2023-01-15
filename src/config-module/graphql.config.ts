import { ApolloDriver } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';
import { GqlModuleAsyncOptions } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { join } from 'path';

class GraphQLConfig {
  static getConfig(configService: ConfigService) {
    return {
      typePaths: [configService.get('GRAPHQL_TYPE_PATHS')],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      context: ({ req, res }) => ({ req, res }),
      formatError: (error: GraphQLError) => {
        delete error?.extensions?.exception?.stacktrace;
        return error;
      },
      cors: {
        origin: '*',
        credentials: true,
      },
    };
  }
}

export const graphQLConfigAsync: GqlModuleAsyncOptions = {
  driver: ApolloDriver,
  useFactory: async (configService: ConfigService) =>
    GraphQLConfig.getConfig(configService),
  inject: [ConfigService],
};

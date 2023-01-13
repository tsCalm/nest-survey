import { ApolloDriver } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { GqlModuleAsyncOptions } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-errors';
import { UserInputError } from 'apollo-server-express';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { join } from 'path';
import { QueryFailedError } from 'typeorm';
//import { ApolloServerPluginCacheControl } from 'apollo-server-core/dist/plugin/cacheControl';
//import { InMemoryCache, ApolloClient } from '@apollo/client';

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
/*
export const client = new ApolloClient({
  // ...other arguments...
  cache: new InMemoryCache({addTypename: true})
});
*/

import { ApolloDriver } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';
import { GqlModuleAsyncOptions } from '@nestjs/graphql';
import { join } from 'path';
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

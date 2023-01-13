import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { GraphQLError } from 'graphql';
import { STATUS_CODES } from 'http';

@Catch(GraphQLError)
export class GqlExceptionFilter implements ExceptionFilter {
  catch(exception: GraphQLError, host: ArgumentsHost) {
    throw new ApolloError(
      exception.message,
      exception.extensions.exception.code,
      {
        statusCode: 400,
      },
    );
  }
}

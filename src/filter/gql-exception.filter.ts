import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { GraphQLError } from 'graphql';
import { STATUS_CODES } from 'http';

@Catch(GraphQLError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  catch(exception: GraphQLError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // Logger.log(exception);
    throw new ApolloError(
      exception.message,
      exception.extensions.exception.code,
      {
        statusCode: 400,
      },
    );
    // response.status(HttpStatus.BAD_REQUEST).json({
    //   success: false,
    //   response: null,
    //   error: {
    //     message: exception,
    //     status: 401,
    //   },
    // });
  }
}

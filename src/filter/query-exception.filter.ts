import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { STATUS_CODES } from 'http';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // Logger.log(exception);
    throw new ApolloError('DATABASE ERROR', STATUS_CODES[500], {
      statusCode: 500,
    });
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

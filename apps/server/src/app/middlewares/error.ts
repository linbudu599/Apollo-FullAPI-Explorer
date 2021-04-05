import { Service } from 'typedi';
import {
  MiddlewareInterface,
  NextFn,
  ResolverData,
  ArgumentValidationError,
} from 'type-graphql';

import { Logger, LOG_TYPE } from '../utils/winston';
import { IContext } from '../typing';

@Service()
export default class ErrorLoggerMiddleware
  implements MiddlewareInterface<IContext> {
  constructor(private readonly logger: Logger) {}

  async use({ context, info }: ResolverData<IContext>, next: NextFn) {
    try {
      return await next();
    } catch (err) {
      this.logger.log(
        LOG_TYPE.ERROR,
        JSON.stringify({
          message: err.message,
          operation: info.operation.operation,
          fieldName: info.fieldName,
          accountId: context.currentUser.accountId,
        })
      );
      if (!(err instanceof ArgumentValidationError)) {
        // hide errors from db like printing sql query
        throw new Error('Unknown error occurred. Try again later!');
      }
      throw err;
    }
  }
}

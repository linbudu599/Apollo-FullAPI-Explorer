import { validate } from 'class-validator';
import {
  createParamDecorator,
  createMethodDecorator,
  ClassType,
  ArgumentValidationError,
  MiddlewareFn,
} from 'type-graphql';

import { IContext } from '../typing';

/**
 * @desc 注入当前的用户 Inject Current User From Context
 * @example `@InjectCurrentUser()`
 */
export const InjectCurrentUser = () =>
  createParamDecorator<IContext>(({ context }) => context.currentUser);

/**
 * @desc 注入本次请求容器 Inject Current Request-Scoped Container
 * @example `@InjectCurrentContainer()`
 */
export const InjectCurrentContainer = () =>
  createParamDecorator<IContext>(({ context }) => context.container);

/**
 * @desc 自定义校验schema custom schema for validation
 * @example `@CustomArgsValidation(ExecutorQueryArgs)`
 * @requires 禁用Arg装饰器的校验`@Args({ validate: false })`
 */
export const CustomArgsValidation = <T extends any>(
  ValidateSchema: ClassType<T>
) => {
  const executeValidate: MiddlewareFn = async ({ args }, next) => {
    const ins = Object.assign(new ValidateSchema(), args);
    const validationErrors = await validate(ins);
    const hasValidationErrors = validationErrors.length > 0;

    if (hasValidationErrors) {
      throw new ArgumentValidationError(validationErrors);
    }

    return await next();
  };

  return createMethodDecorator(executeValidate);
};

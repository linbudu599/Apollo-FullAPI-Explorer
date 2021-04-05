import { MiddlewareFn } from 'type-graphql';
import { SubstanceStatus } from '../graphql/Common';
import Substance from '../entities/Substance';

import { log } from '../utils/helper';

// intercept exeuction result
const InterceptorOnSubstanceVisit = (
  nameOrNamePart: string
): MiddlewareFn => async ({ root }, next) => {
  const res: SubstanceStatus = await next();

  const subNameNotAllowed = (sub: Substance) =>
    sub?.substanceName?.includes(nameOrNamePart);

  const shouldIntercept = res?.data?.some(subNameNotAllowed);

  if (shouldIntercept) {
    res?.data?.forEach((sub) => {
      if (subNameNotAllowed(sub)) {
        log('[Interceptor] Substance Interceptor Invoked');
        sub.substanceName = 'Substance Name Protected';
      }
    });
  }

  return res;
};

// 我直接中二病
export const InterceptorOnSCP1128: MiddlewareFn = InterceptorOnSubstanceVisit(
  '深海巨妖'
);

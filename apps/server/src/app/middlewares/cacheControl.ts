import { CacheHint, CacheScope } from 'apollo-cache-control';
import { UseMiddleware } from 'type-graphql';

const CacheControl = (hint: CacheHint) => {
  return UseMiddleware(({ info }, next) => {
    info.cacheControl.setCacheHint(hint);
    return next();
  });
};

export const RecipeCacheHint: CacheHint = {
  maxAge: 60 * 60 * 1000,
  scope: CacheScope.Public,
};

export default CacheControl;

import { AuthChecker } from 'type-graphql';
import { IContext } from '../typing';
import { log } from './helper';
import { ACCOUNT_TYPE, ACCOUNT_ROLE } from './constants';

export const authChecker: AuthChecker<IContext> = (
  {
    root,
    args,
    context: {
      currentUser: { accountId, accountType, accountRole },
    },
    info,
  },
  requiredAuth
): boolean => {
  log(`[Auth Check] Current User ID: ${accountId}`);
  log(`[Auth Check] Current User Type: ${accountType}`);
  log(`[Auth Check] Current User Role: ${accountRole}`);
  log(`[Auth Check] Required Types: ${requiredAuth}`);

  const [requiredType, requiredRole] = requiredAuth;

  console.log(requiredType, requiredRole);

  if (accountType >= Number(requiredType)) {
    return (
      requiredRole.includes(accountRole) ||
      requiredRole.includes(ACCOUNT_ROLE.UNKNOWN)
    );
  } else {
    return false;
  }
};

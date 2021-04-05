import jwt from 'jsonwebtoken';
import { TOKEN_EXPIRED_IN, ACCOUNT_TYPE, ACCOUNT_ROLE } from './constants';

if (process.env.NODE_ENV === 'test') {
  process.env.SECRET_KEY = 'test_secret_key';
}

export const dispatchToken = (
  username: string,
  accountType: ACCOUNT_TYPE = ACCOUNT_TYPE.VISITOR,
  accountRole: ACCOUNT_ROLE = ACCOUNT_ROLE.UNKNOWN
) =>
  jwt.sign(
    {
      username,
      accountType,
      accountRole,
    },
    process.env.SECRET_KEY ?? 'dev_secret_key',
    {
      expiresIn: TOKEN_EXPIRED_IN,
    }
  );

export const weekLaterTimeStamp = () =>
  Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;

type TTOkenInfo = {
  username: string;
  // 签发时间
  iat: number;
  accountType: ACCOUNT_TYPE;
  accountRole: ACCOUNT_ROLE;
  // 到期时间
  exp: number;
};

type TTokenValidation =
  | {
      valid: true;
      info: TTOkenInfo;
    }
  | {
      valid: false;
    };

export const validateToken = (token: string): TTokenValidation => {
  try {
    const info = jwt.verify(
      token,
      process.env.SECRET_KEY ?? 'dev_secret_key'
    ) as TTOkenInfo;
    return {
      valid: true,
      info,
    };
  } catch (error) {
    return {
      valid: false,
    };
  }
};

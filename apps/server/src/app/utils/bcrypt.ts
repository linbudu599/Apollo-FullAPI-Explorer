import bcrypt from 'bcrypt';

import { SALT } from './constants';

export const encode = (pwd: string) => bcrypt.hashSync(pwd, SALT);

export const compare = (pwd: string, hash: string) =>
  bcrypt.compareSync(pwd, hash);

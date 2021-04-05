import { ACCOUNT_TYPE, ACCOUNT_ROLE } from './constants';

// TODO: 分为两个序列的权限管控
// 1. 用户权限级别
// 2. 用户类型级别
export const genarateRandomID = () => {
  // 随机鉴权
  // 为0时TypeDI容器注册会失败
  const randomID = Math.floor(Math.random() * 50) + 1;

  const range1_11 = randomID >= 1 && randomID <= 11;
  const range12_21 = randomID >= 12 && randomID <= 21;
  const range22_31 = randomID >= 22 && randomID <= 31;
  const range32_41 = randomID >= 32 && randomID <= 41;
  const range42_51 = randomID >= 42 && randomID <= 51;

  const accountRole = range1_11
    ? ACCOUNT_ROLE.UNKNOWN
    : range12_21
    ? ACCOUNT_ROLE.PERSONAL
    : range22_31
    ? ACCOUNT_ROLE.ORG
    : range32_41
    ? ACCOUNT_ROLE.ENTERPRISE
    : ACCOUNT_ROLE.GOV;

  const accountType = range1_11
    ? ACCOUNT_TYPE.VISITOR
    : range12_21
    ? ACCOUNT_TYPE.COMMON
    : range22_31
    ? ACCOUNT_TYPE.ADMIN
    : ACCOUNT_TYPE.DOMINATOR;

  return {
    id: randomID,
    accountRole,
    accountType,
  };
};

// import jsbridge from './jsbridge.min';
import EE from './eventEmit';
import request from './request';
import Store from './store';
import ws from './websocket';
import { checkIdCard } from './checkIdCard';

const getLoginInfo = async () => {
  return await Store.get('loginInfo');
};

const removeLoginInfo = async () => {
  return await Store.remove('loginInfo');
};

// 版本号对比
const versionContrast = (targettv: string, dqv: string) => {
  targettv = targettv.substr(1);
  dqv = dqv.substr(1);
  let isSatisfy = false;
  let dqvArr = dqv.split('.'); //当前版本号
  let targettvArr = targettv.split('.'); // 目标版本集
  for (let i = 0; i < dqvArr.length; i++) {
    if (Number(dqvArr[i]) > Number(targettvArr[i])) {
      isSatisfy = true;
      break;
    } else if (dqvArr[i] == targettvArr[i]) {
      isSatisfy = true;
      continue;
    } else {
      isSatisfy = false;
      break;
    }
  }
  return isSatisfy;
};

// 是否是手机号码
const isMobile = (v: string) => {
  return /^1(3|4|5|6|7|8|9)\d{9}$/.test(v);
};

/**
 * 设置手机号码后面8位为x
 */
const hidePhoneNumber = (phoneNumber: string) => {
  if (phoneNumber?.length > 3) {
    return `${phoneNumber.substr(0, 3)}xxxxxxxx`;
  } else {
    return phoneNumber;
  }
};

/**
 * 设置身份证号码中间号码为*
 * @param {*} idCardNumber
 */
const hideIdCard = (idCardNumber: string) => {
  if (idCardNumber?.length === 18) {
    return idCardNumber.replace(/^(\d{4})\d{10}(\d+)/, '$1**********$2');
  } else {
    return idCardNumber;
  }
};

/**
 * 分转化为元
 */
const centToYuan = (num: number) => {
  return (num / 100).toFixed(2);
};

export {
  ws,
  // jsbridge,
  EE,
  request,
  Store,
  getLoginInfo,
  removeLoginInfo,
  isMobile,
  checkIdCard,
  hidePhoneNumber,
  hideIdCard,
  centToYuan,
  versionContrast,
};

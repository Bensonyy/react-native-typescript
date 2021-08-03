import { Platform } from 'react-native';
import Constants from 'expo-constants';
import jsbridge from './jsbridge.min';
import EE from './eventEmit';
import request from './request';
import Store from './store';
import ws from './websocket';

const OS = Platform.OS;

const statusBarHeight = Constants.statusBarHeight;

const getLoginInfo = async () => {
  return await Store.get('loginInfo');
};

const removeLoginInfo = async () => {
  return await Store.remove('loginInfo');
};
const versionContrast = (targettv, dqv) => {
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

const isMobile = (v) => {
  return /^1(3|4|5|6|7|8|9)\d{9}$/.test(v);
};

/**
 * num:0 YYYY-MM-DD
 * num:1 YYYY-MM-DD hh:mm:ss
 * timestamp:时间戳
 */
const timeConvert = (timestamp, num = 0) => {
  if (typeof timestamp === 'undefined' || timestamp === null || timestamp === '') {
    return;
  }
  timestamp = timestamp.length == 10 ? timestamp * 1000 : timestamp;
  let date = new Date(timestamp);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  let d = date.getDate();
  d = d < 10 ? '0' + d : d;
  let h = date.getHours();
  h = h < 10 ? '0' + h : h;
  let minute = date.getMinutes();
  let second = date.getSeconds();
  minute = minute < 10 ? '0' + minute : minute;
  second = second < 10 ? '0' + second : second;
  if (num == 0) {
    return y + '-' + m + '-' + d;
  } else {
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
  }
};

/**
 * 设置手机号码后面8位为x
 */
const hidePhoneNumber = (phoneNumber) => {
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
const hideIdCard = (idCardNumber) => {
  if (idCardNumber?.length === 18) {
    return idCardNumber.replace(/^(\d{4})\d{10}(\d+)/, '$1**********$2');
  } else {
    return idCardNumber;
  }
};

/**
 *s身份证号码校验
 */
const checkIdCard = (idcard) => {
  let Errors = new Array(
    '验证通过!',
    '身份证号码位数不对!',
    '身份证号码出生日期超出范围或含有非法字符!',
    '身份证号码校验错误!',
    '身份证地区非法!',
  );
  let area = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外',
  };
  let ereg, Y, JYM;
  let S, M;
  let idcard_array = [];
  idcard_array = idcard.split('');
  console.log(idcard, idcard.substr(0, 2), area[parseInt(idcard.substr(0, 2))]);
  //地区检验
  if (area[parseInt(idcard.substr(0, 2))] == null) {
    return Errors[4];
  }
  //身份号码位数及格式检验
  switch (idcard.length) {
    case 15:
      if (
        (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 ||
        ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 &&
          (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)
      ) {
        ereg =
          /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; //测试出生日期的合法性
      } else {
        ereg =
          /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; //测试出生日期的合法性
      }
      if (ereg.test(idcard)) {
        return Errors[0];
      } else {
        return Errors[2];
      }
    case 18:
      if (
        parseInt(idcard.substr(6, 4)) % 4 == 0 ||
        (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)
      ) {
        ereg =
          /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; //闰年出生日期的合法性正则表达式
      } else {
        ereg =
          /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; //平年出生日期的合法性正则表达式
      }
      if (ereg.test(idcard)) {
        //测试出生日期的合法性
        //计算校验位
        S =
          (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 +
          (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 +
          (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 +
          (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 +
          (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 +
          (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 +
          (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 +
          parseInt(idcard_array[7]) * 1 +
          parseInt(idcard_array[8]) * 6 +
          parseInt(idcard_array[9]) * 3;
        Y = S % 11;
        M = 'F';
        JYM = '10X98765432';
        M = JYM.substr(Y, 1); //判断校验位
        if (M == idcard_array[17]) {
          return false;
        } else {
          return Errors[3];
        }
      } else {
        return Errors[2];
      }
    default:
      return Errors[1];
  }
};

/**
 * 分转化为元
 */
const centToYuan = (cent) => {
  if (cent) {
    return cent / 100;
  }
};

export {
  ws,
  jsbridge,
  EE,
  request,
  Store,
  OS,
  statusBarHeight,
  getLoginInfo,
  removeLoginInfo,
  isMobile,
  timeConvert,
  hidePhoneNumber,
  hideIdCard,
  centToYuan,
  checkIdCard,
  versionContrast,
};

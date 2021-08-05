import { Alert } from 'react-native';
import { stringify } from 'qs';
import { getUniqueId } from 'react-native-device-info';
import Store from './store';
import EE from './eventEmit';
import RNConfig from 'react-native-config';

const { API_URL: apiUrlConfig } = RNConfig;
const json = 'application/json';

let cacheToken = null;
let cacheExpireTime = null;

const deviceId = getUniqueId();

const statusMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

// http status 校验
function checkStatus(response) {
  if (response.ok) {
    if (response.status === 204) {
      return response.text();
    }
    return response.json();
  }
  const errortext = statusMessage[response.status] || response.statusText;
  console.log(response.url, 'url_error');
  // console.log(typeof response.status, 'response.status');
  if (response.status === 403 || response.status === 401) {
    EE.emit('unlogin');
  } else {
    Alert.alert(`请求错误 ${response.status}: ${response.url}`, errortext);
  }
  const error = new Error(errortext);
  error.name = response.status;
  throw error;
}

// 业务 code 校验
function checkCode(data) {
  const result = data.result;
  const code = data.code;
  const message = data.message;
  if (result && result !== 'success') {
    // 998 未登录 40060003 请登录
    if (code === '998' || code === '40060003') {
      EE.emit('unlogin');
      console.log(code, message);
    } else {
      console.log(data, 'url_fail');
      Alert.alert('', message);
    }
  }
  return data;
}

EE.on('signOut', function () {
  cacheToken = null;
  cacheExpireTime = null;
});

EE.on('signIn', function ({ token, expireTime } = {}) {
  cacheToken = token;
  cacheExpireTime = expireTime;
});

type params = {
  url: string;
  method?: string;
  data?: any;
  isJSON?: boolean;
  headers?: object;
  apiUrl?: string;
};

const request = async ({
  url,
  data,
  method = 'GET',
  isJSON = true,
  headers = {},
  apiUrl = apiUrlConfig,
}: params): Promise<any> => {
  const [path, query] = url.split('?');

  if (!cacheToken) {
    const loginInfo = await Store.get('loginInfo');
    cacheToken = loginInfo?.token;
  }

  if (cacheExpireTime && cacheExpireTime - Date.now() < 1000 * 3600) {
    // 离过期1小时刷新 token
    EE.emit('refreshToken');
  }

  const isGet = method === 'GET';
  const params = {
    ...(isGet ? {} : { body: isJSON ? JSON.stringify(data) : data }),
    method,
    headers: {
      ...(isJSON
        ? {
            Accept: json,
            'Content-Type': json,
          }
        : { Accept: '*/*', 'Content-Type': 'multipart/form-data' }),
      'device-id': deviceId,
      token: cacheToken,
      ...headers,
    },
  };

  let _url = '';
  if (path.startsWith('https://') || url.startsWith('http://')) {
    apiUrl = `${url}`;
    _url = query
      ? `${apiUrl}?${query}`
      : isGet && data
      ? `${apiUrl}?${stringify(data)}`
      : `${apiUrl}`;
  } else {
    _url = query
      ? `${apiUrl}/${path}?${query}`
      : isGet && data
      ? `${apiUrl}/${path}?${stringify(data)}`
      : `${apiUrl}/${path}`;
  }
  console.log(_url, '_url');
  console.log(params, 'request params');
  return fetch(_url, params).then(checkStatus).then(checkCode);
};

export default request;

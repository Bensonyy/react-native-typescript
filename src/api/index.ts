import RNConfig from 'react-native-config';
import { request } from '../utils';
import { config } from '../config';
import { stringify } from 'qs';
const { WSAPI_URl } = RNConfig;

const method = 'POST';

// 获取用户信息
export const getUserInfo = {
  url: 'user-service/userPrimary/getUser',
  fetch: async (userId: string) => {
    return request({
      url: `${getUserInfo.url}/${userId}`,
    });
  },
};

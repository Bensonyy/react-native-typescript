import { request } from '../utils';
import { ampWebKey } from '../config';

const method = 'POST';

// 高德地图: 周边搜索
export const getAmapAround = {
  url: 'https://restapi.amap.com/v3/place/around',
  fetch: async (data) => {
    return request({
      url: getAmapAround.url,
      data: {
        key: ampWebKey,
        offset: 50,
        ...data,
      },
    });
  },
};

// 高德地图:关键字搜索
export const getAmapText = {
  url: 'https://restapi.amap.com/v3/place/text',
  fetch: async (data) => {
    return request({
      url: getAmapText.url,
      data: {
        key: ampWebKey,
        offset: 25,
        ...data,
      },
    });
  },
};

// 高德地图:关键字搜索
export const getPathTrack = {
  url: 'https://restapi.amap.com/v3/direction/driving',
  fetch: async (data) => {
    return request({
      url: getPathTrack.url,
      data: {
        key: ampWebKey,
        ...data,
      },
    });
  },
};

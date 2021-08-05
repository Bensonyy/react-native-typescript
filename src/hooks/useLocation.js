import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PermissionsAndroid } from 'react-native';
import {
  init,
  Geolocation,
  setInterval,
  setDistanceFilter,
  start,
  stop,
} from 'react-native-amap-geolocation';
import { Store } from '../utils';
import { ampAndroidKey } from '../config';

// 获取位置信息, 经维度
export default function useLocation({
  initLocation,
  useCache = false,
  isOnlocation = false, // 是否开启实时定位
} = {}) {
  const [curLocation, setCurrentLocation] = useState(initLocation || {});
  const watchIdRef = useRef(null);

  const getCurrentPosition = useCallback(async () => {
    // 如果使用缓存直接返回
    if (useCache) {
      const location = await Store.get('location');
      if (location?.longitude) {
        return setCurrentLocation(location);
      }
    }

    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ]);

    await init({
      android: ampAndroidKey,
      ios: '',
    });
    // setAllowsBackgroundLocationUpdates(true);
    if (isOnlocation) {
      // android 5 秒请求一次定位
      setInterval(5000);
      // ios，设备移动超过 10 米才会更新位置信息
      // setDistanceFilter(10);
      watchIdRef.current = Geolocation.watchPosition(({ coords }) => {
        console.log(coords, 'watchPosition');
        setCurrentLocation(coords);
      });
      // 开始连续定位
      start();
    } else {
      Geolocation.getCurrentPosition(
        ({ coords }) => {
          setCurrentLocation(coords);
          Store.set('location', coords);
        },
        (error) => {
          console.log(error, 'error');
        }
      );
    }
  }, []);

  useEffect(() => {
    if (!curLocation.longitude) {
      getCurrentPosition();
    }
    return () => {
      isOnlocation && stop();
    };
  }, []);

  return { curLocation, setCurrentLocation, watchIdRef };
}

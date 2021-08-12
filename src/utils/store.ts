import AsyncStorage from '@react-native-async-storage/async-storage';

const prefix = '@myapp:';

export default class Store {
  static async get(k: string | string[]) {
    try {
      if (typeof k === 'string') {
        const value = await AsyncStorage.getItem(`${prefix}${k}`);
        if (value === null) {
          return value;
        }
        return value.includes('{') || value.includes('[') ? JSON.parse(value) : value;
      }
      if (Array.isArray(k)) {
        const keys = k.map((key) => `${prefix}${key}`);

        const kvs = await AsyncStorage.multiGet(keys);

        return kvs.reduce((values, [, value]) => [...values, value], []);
      }
      throw new Error(`Unknown key type: ${typeof k}`);
    } catch (error) {
      console.error(error, 'store get');
    }
  }

  static async set(k: string | object, value?: string | object) {
    try {
      if (typeof k === 'string') {
        if (typeof value === 'object') {
          await AsyncStorage.setItem(`${prefix}${k}`, JSON.stringify(value));
        } else {
          await AsyncStorage.setItem(`${prefix}${k}`, value);
        }
        return value;
      }

      const kvs = Object.keys(k).reduce((kvs, key) => [...kvs, [`${prefix}${key}`, k[key]]], []);

      await AsyncStorage.multiSet(kvs);
      return k;
    } catch (error) {
      console.error(error, 'store set');
    }
  }

  // mergeItem 用于向缓存中的对象插入新值
  static async merge(k: string, value: object) {
    try {
      const _value = await Store.get(k);
      if (_value) {
        if (Object.prototype.toString.call(_value) === '[Object Object]') {
          await AsyncStorage.mergeItem(`${prefix}${k}`, JSON.stringify(value));
        } else {
          throw new Error(`there is no cached object ${k}`);
        }
      } else {
        await Store.set(k, value);
      }
    } catch (error) {
      console.error(error, 'store mergeItem');
    }
  }

  // 为已缓存的数组前面插入数据, value 是数组[]
  static async insert(k: string, value: any[] = []) {
    try {
      const _value = (await Store.get(k)) || [];
      if (Array.isArray(_value)) {
        const newValue = [...value, ..._value];
        await Store.set(k, newValue);
        return newValue;
      } else {
        throw new Error(`there is no cached array ${k}`);
      }
    } catch (error) {
      console.error(error, 'store mergeItem');
    }
  }

  // 为已缓存的数组更新某一条数据
  static async update(k: string, value: { id: string | number; [key: string]: any }) {
    try {
      const _value = await Store.get(k);
      if (Array.isArray(_value)) {
        const newValue = _value.reduce(
          (memo, cur) => (cur.id === value.id ? [...memo, { ...cur, ...value }] : [...memo, cur]),
          [],
        );
        await Store.set(k, newValue);
        return newValue;
      } else {
        throw new Error(`there is no cached array ${k}`);
      }
    } catch (error) {
      console.error(error, 'store mergeItem');
    }
  }

  static async remove(k: string | string[]) {
    try {
      if (typeof k === 'string') {
        await AsyncStorage.removeItem(`${prefix}${k}`);

        return k;
      }
      if (Array.isArray(k)) {
        const keys = k.map((key) => `${prefix}${key}`);
        await AsyncStorage.multiRemove(keys);

        return k;
      }
      throw new Error(
        `Unsupported type of parameter: ${typeof k}, please pass string or array of strings`,
      );
    } catch (error) {
      console.error(error, 'store remove');
    }
  }
}

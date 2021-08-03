import AsyncStorage from '@react-native-community/async-storage';

const prefix = '@myapp:';

export default class Store {
  static async get(k) {
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

  static async set(k, value) {
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

      const errors = await AsyncStorage.multiSet(kvs);

      return errors || k;
    } catch (error) {
      console.error(error, 'store set');
    }
  }

  // mergeItem，用于两个对象的字段合并
  static async merge(k, value) {
    if (typeof value !== 'object') {
      throw new Error(`value type is not object ${k}`);
    }
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
  static async insert(k, value = []) {
    if (!Array.isArray(value)) {
      throw new Error(`the second parameter is no array ${value}`);
    }
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
  static async update(k, value) {
    if (typeof value !== 'object') {
      throw new Error('value is not object');
    }
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

  static async remove(k) {
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

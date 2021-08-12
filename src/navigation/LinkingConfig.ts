/**
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */
import * as Linking from 'expo-linking';
import { config } from '../config';
export default {
  prefixes: [config.schemeUrl],
  config: {
    screens: {
      Root: {
        path: '/',
        initialRouteName: '/',
        screens: {
          Page1: '/page1',
          My: '/my',
        },
      },
      NotFound: '*',
    },
  },
};

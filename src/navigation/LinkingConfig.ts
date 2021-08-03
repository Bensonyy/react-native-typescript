/**
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */
import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Page1: {
            screens: {
              Page1: 'page1',
            },
          },
          My: {
            screens: {
              TabTwoScreen: 'my',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};

import * as React from 'react';
import useColorScheme from './useColorScheme';
import { EE, Store } from '../utils';
import { rootState } from '../reducers';
import { ROOT_CONST } from '../constants';

export default function useRootState() {
  const colorScheme = useColorScheme();
  const [themeName, setThemeName] = React.useState(colorScheme);

  const [userInfo, dispatch] = React.useReducer(rootState, {
    isLoading: true,
    isLogin: true,
    token: null,
  });

  const fns = React.useMemo(
    () => ({
      signIn: async (loginInfo) => {
        await Store.set('loginInfo', loginInfo);
        EE.emit(ROOT_CONST.SIGN_IN, loginInfo);
        dispatch({
          type: ROOT_CONST.SIGN_IN,
          payload: loginInfo,
        });
      },
      signOut: async () => {
        await Store.remove('loginInfo');
        EE.emit(ROOT_CONST.SIGN_OUT);
        dispatch({
          type: ROOT_CONST.SIGN_OUT,
          payload: {
            isLogin: false,
            token: null,
          },
        });
      },
      getLoginInfo: async () => {
        return await Store.get('loginInfo');
      },
      toggleTheme: () => {
        setThemeName(themeName === 'dark' ? 'light' : 'dark');
      },
    }),
    [],
  );

  return { themeName, ...userInfo, ...fns, dispatch };
}

import * as React from 'react';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { Colors, Sizes } from '../constants';

export default function useMyTheme(dark: boolean = false) {
  return React.useMemo(() => {
    const navThemeTheme = dark ? DarkTheme : DefaultTheme;
    const themeName = dark ? 'dark' : 'light';
    const configTheme = Colors[themeName];
    return {
      ...navThemeTheme,
      dark,
      colors: {
        ...navThemeTheme.colors,
        ...configTheme,
      },
      sizes: Sizes,
    };
  }, [dark]);
}

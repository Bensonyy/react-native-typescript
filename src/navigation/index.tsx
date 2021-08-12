import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { Loading } from '../components';
import StackNavs from './StackNavs';
import LinkingConfig from './LinkingConfig';
import { useMyTheme } from '../hooks';

function Navigation({ themeName }: { themeName: string }) {
  const { dark, colors } = useMyTheme(themeName === 'dark');

  return (
    <NavigationContainer
      fallback={<Loading />}
      linking={LinkingConfig}
      theme={{
        dark,
        colors,
      }}>
      <StackNavs themeName={themeName} />
    </NavigationContainer>
  );
}

export default Navigation;

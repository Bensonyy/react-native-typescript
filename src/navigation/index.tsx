import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { Text } from '../components';

import StackNavs from './StackNavs';
import LinkingConfig from './LinkingConfig';

function Navigation({ themeName }: { themeName: string }) {
  return (
    <NavigationContainer
      fallback={<Text>Loading…</Text>}
      linking={LinkingConfig}
      theme={themeName === 'dark' ? DarkTheme : DefaultTheme}>
      <StackNavs themeName={themeName} />
    </NavigationContainer>
  );
}

export default Navigation;

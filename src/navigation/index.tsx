import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { Text } from '../components';

import StackNavs from './StackNavs';
import LinkingConfig from './LinkingConfig';

function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      fallback={<Text>Loading…</Text>}
      linking={LinkingConfig}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StackNavs />
    </NavigationContainer>
  );
}

export default Navigation;

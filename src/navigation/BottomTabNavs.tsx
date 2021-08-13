import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabNavsConfig } from './NavConfig';
import { useMyTheme } from '../hooks';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavs({ themeName }: { themeName: string }) {
  const { colors } = useMyTheme(themeName === 'dark');
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: colors.tabIconSelected,
        labelStyle: {
          color: colors.tabIconDefault,
          marginTop: -3,
          paddingBottom: 3,
        },
      }}>
      {BottomTabNavsConfig.map((item) => (
        <BottomTab.Screen
          key={item.name}
          name={item.name}
          options={item.options}
          component={item.component}
        />
      ))}
    </BottomTab.Navigator>
  );
}

import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../constants';
import { BottomTabNavsConfig } from './NavConfig';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavs({ themeName }: { themeName: string }) {
  return (
    <BottomTab.Navigator
      initialRouteName="Page1"
      tabBarOptions={{ activeTintColor: Colors[themeName].tint }}>
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

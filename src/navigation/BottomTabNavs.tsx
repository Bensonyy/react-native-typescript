import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../constants';
import { useColorScheme } from '../hooks/useColorScheme';
import { BottomTabNavsConfig } from './NavConfig';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Page1"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
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

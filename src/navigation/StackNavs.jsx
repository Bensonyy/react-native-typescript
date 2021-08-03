import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NotFound from '../screens/NotFound';
import BottomTabNavs from './BottomTabNavs';
import { StackNavsConfig } from './NavConfig';

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavs} />
      {StackNavsConfig.map(({ name, component, options }) => {
        return (
          <Stack.Screen
            key={name}
            name={name}
            getComponent={component}
            options={({ route }) => ({
              ...options,
              title: route.params?.title || options.title,
            })}
          />
        );
      })}
      <Stack.Screen name="NotFound" component={NotFound} options={{ title: '404 not found' }} />
    </Stack.Navigator>
  );
}

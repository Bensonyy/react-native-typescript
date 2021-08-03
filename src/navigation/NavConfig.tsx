import * as React from 'react';
import { Icon } from 'react-native-elements';
import Page1 from '../screens/page1';
import My from '../screens/my';
import Login from '../screens/auth/Login';

const getTabBarIcon =
  ({ type, name }: { type: string; name: string }) =>
  ({ size, color }: { size: number; color: string }) => {
    return <Icon type={type} name={name} size={size} color={color} />;
  };

export const BottomTabNavsConfig = [
  {
    name: 'Page1',
    component: Page1,
    options: {
      tabBarLabel: '菜单',
      tabBarIcon: getTabBarIcon({
        type: 'material-community',
        name: 'book-plus-multiple',
      }),
    },
  },
  {
    name: 'My',
    component: My,
    options: {
      tabBarLabel: '我的',
      tabBarIcon: getTabBarIcon({
        type: 'material-community',
        name: 'account',
      }),
    },
  },
];

export const StackNavsConfig = [
  {
    name: 'Login',
    component: Login,
    options: {
      title: '登录',
    },
  },
];

import 'react-native-gesture-handler';
import './src/utils/errorHandler';
import * as React from 'react';
import { Assets } from '@react-navigation/elements';
import { registerRootComponent } from 'expo';
import { Asset } from 'expo-asset';
import Main from './src/index';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function App() {
  return (
    <RootSiblingParent>
      <Main />
    </RootSiblingParent>
  );
}

Asset.loadAsync(Assets);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

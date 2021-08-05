import 'react-native-gesture-handler';
import './src/utils/errorHandler';

import React from 'react';
import Main from './src/index';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function App() {
  return (
    <RootSiblingParent>
      <Main />
    </RootSiblingParent>
  );
}

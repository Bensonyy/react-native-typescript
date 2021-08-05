import * as React from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Navigation from './navigation';
import { RootContext } from './components';
import { useRootState } from './hooks';

export default function Main() {
  const { themeName, ...rootProps } = useRootState();

  return (
    <RootContext.Provider value={{ themeName, ...rootProps }}>
      <SafeAreaProvider>
        <Navigation themeName={themeName} />
        <StatusBar translucent={true} style="auto" />
      </SafeAreaProvider>
    </RootContext.Provider>
  );
}

const styles = StyleSheet.create({});

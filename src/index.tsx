import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'react-native-elements';
import Navigation from './navigation';
import { RootContext } from './components';
import { useRootState } from './hooks';
import { elementsTheme } from './constants';

export default function Main() {
  const { themeName, ...rootProps } = useRootState();

  return (
    <RootContext.Provider value={{ themeName, ...rootProps }}>
      <ThemeProvider useDark={themeName === 'dark'} theme={elementsTheme(themeName)}>
        <SafeAreaProvider>
          <Navigation themeName={themeName} />
          <StatusBar translucent={true} style="auto" />
        </SafeAreaProvider>
      </ThemeProvider>
    </RootContext.Provider>
  );
}

const styles = StyleSheet.create({});

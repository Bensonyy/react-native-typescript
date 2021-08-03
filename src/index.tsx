import * as React from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from './hooks/useColorScheme';
import Navigation from './navigation';

export default function Main() {
  const colorScheme = useColorScheme();
  return (
    <SafeAreaProvider>
      <Navigation colorScheme={colorScheme} />
      <StatusBar translucent={true} style="auto" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});

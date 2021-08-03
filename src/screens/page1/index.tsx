import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Text, View } from '../../components';

export default function Page1() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>首页</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
  },
});

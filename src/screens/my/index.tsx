import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../../components';

export default function My() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>页面2</Text>
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

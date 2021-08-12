import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HeaderSearchBar } from '../../components';

export default function HeaderSearch() {
  React.useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <HeaderSearchBar
        onSearchSubmit={(v) => console.log(v, 'onSearchSubmit')}
        onSearchChange={(v) => console.log(v, 'onSearchSubmit')}
      />
      <View style={styles.container}>
        <Text style={styles.title}>首页</Text>
      </View>
    </>
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

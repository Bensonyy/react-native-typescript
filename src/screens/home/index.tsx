import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useMyTheme } from '../../hooks';
import { Content } from '../../components';

export default function Home() {
  const { dark } = useTheme();
  const { sizes } = useMyTheme(dark);

  React.useEffect(() => {
    return () => {};
  }, []);

  return (
    <Content>
      <View>
        <Text style={{ fontSize: sizes.fontSize20 }}>架构中包含功能模块演示 demo</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>首页</Text>
      </View>
    </Content>
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

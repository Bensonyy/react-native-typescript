import * as React from 'react';
import { StyleSheet, View, Text, ActivityIndicator, StyleProp, ViewStyle } from 'react-native';
import { Colors } from '../../constants';
import { useColorScheme } from '../../hooks';

type Props = {
  type: 'absolute' | 'relative';
  color: string;
  backgroundColor: string;
  title: string;
  loadingContainerStyle: StyleProp<ViewStyle>;
};

export const Loading = (props: Partial<Props>) => {
  const themeName = useColorScheme();
  const {
    type = 'absolute',
    title,
    color = Colors[themeName].primary,
    backgroundColor = 'transparent',
    loadingContainerStyle,
  } = props;

  return (
    <View
      style={[
        type === 'absolute' ? styles.absolute : styles.relative,
        { backgroundColor },
        loadingContainerStyle,
      ]}>
      <ActivityIndicator size="large" color={color} />
      {title ? (
        <View style={styles.titleBox}>
          <Text style={styles.title}>{title}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  relative: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  absolute: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBox: {
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    color: '#fff',
  },
});

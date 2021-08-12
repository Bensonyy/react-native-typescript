import * as React from 'react';
import { ScrollView, StyleSheet, Text, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Loading } from '../Loading';
import { useMyTheme } from '../../hooks';
import { Header } from '../../components';

type Props = {
  children: React.ReactElement;
  containerStyle: StyleProp<ViewStyle>; // 最外层样式
  isScroll: boolean; // 是否上下滚动
  isLoading: boolean; // 是否显示 loading
  title: string; // 标题
  isShowHeader: boolean; // 是否显示头
  isShowLeftBtn: boolean; // 是否显示左上角返回按钮
  headerCenter(): React.ReactElement; // 自定义头中间信息
  headerHeight: number; // 滚动时切换头组件中间内容时才需要
};

export const Content: React.FC = (props: Partial<Props>) => {
  const { dark } = useTheme();
  const { colors, sizes } = useMyTheme(dark);
  const [opacity, setOpacity] = React.useState<boolean>(true);

  const {
    children,
    isScroll = true,
    isLoading = false,
    containerStyle = {
      paddingHorizontal: sizes.contentSpace,
      backgroundColor: colors.background,
    },
    isShowHeader = false,
    isShowLeftBtn = true,
    title,
    headerCenter,
    headerHeight = 0,
    ...rest
  } = props;

  const headerCenterComponent = (
    <Text style={{ color: colors.text, fontSize: sizes.fontSize16 }}>{title}</Text>
  );

  const onScroll = React.useCallback(
    (e) => {
      if (headerHeight <= 0) {
        return;
      }
      let offsetY = e.nativeEvent.contentOffset.y;
      let opacity = offsetY / headerHeight;
      setOpacity(opacity > 0.5);
    },
    [headerHeight],
  );

  return (
    <SafeAreaView style={[styles.container, containerStyle]}>
      {isShowHeader ? (
        <Header
          centerComponent={opacity ? headerCenterComponent : headerCenter()}
          isShowLeftBtn={isShowLeftBtn}
        />
      ) : null}

      <ScrollView
        scrollEnabled={isScroll}
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        contentContainerStyle={[styles.container]}
        {...rest}>
        {isLoading ? <Loading /> : children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Content;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

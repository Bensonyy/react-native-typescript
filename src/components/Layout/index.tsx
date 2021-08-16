import * as React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  StyleProp,
  ViewStyle,
  ImageBackground,
  ImageStyle,
  ImageSourcePropType,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Loading } from '../Loading';
import { useMyTheme } from '../../hooks';
import { Header } from '../Header';

type Props = {
  children: React.ReactElement;
  containerStyle: StyleProp<ViewStyle>; // 最外层样式
  isScroll: boolean; // 是否上下滚动
  isLoading: boolean; // 是否显示 loading
  title: string; // 标题
  isShowHeader: boolean; // 是否显示头
  isShowLeftBtn: boolean; // 是否显示左上角返回按钮
  headerCenter(): React.ReactElement; // 自定义头中间信息
  headerHeight: number; // 头部非规则设计背景图
  fixedHeader: number; // 头部吸顶内容切换高度
  type: undefined | 'fullScreen'; // 是否是全屏
  bgImgPath: ImageSourcePropType; // 是否有背景图片
  bgImgStyle: StyleProp<ImageStyle>; // 背景图样式控制
};

const HeaderCenterComponent = ({ colors, sizes, title }) => (
  <Text style={{ color: colors.text, fontSize: sizes.fontSize16 }}>{title}</Text>
);

export const Layout: React.FC = (props: Partial<Props>) => {
  const { dark } = useTheme();
  const { colors, sizes } = useMyTheme(dark);
  const [opacity, setOpacity] = React.useState<boolean>(true);

  const {
    children,
    isScroll = true,
    isLoading = false,
    type = undefined,
    containerStyle = {
      paddingHorizontal: type === 'fullScreen' ? 0 : sizes.contentSpace,
      backgroundColor: colors.background,
    },
    isShowHeader = false,
    isShowLeftBtn = true,
    title,
    headerCenter,
    headerHeight = 54,
    fixedHeader = 0,
    bgImgPath = '',
    bgImgStyle = undefined,
    ...rest
  } = props;

  const onScroll = React.useCallback(
    (e) => {
      if (fixedHeader <= 0) {
        return;
      }
      let offsetY = e.nativeEvent.contentOffset.y;
      let opacity = offsetY / fixedHeader;
      setOpacity(opacity > 0.5);
    },
    [fixedHeader],
  );

  return (
    <SafeAreaView style={[styles.container, containerStyle]}>
      {isShowHeader ? (
        <Header
          centerComponent={
            opacity ? HeaderCenterComponent({ colors, sizes, title }) : headerCenter()
          }
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
        {bgImgPath && !isLoading ? (
          <ImageBackground source={bgImgPath} style={styles.bgImage}>
            <View style={[{ height: headerHeight }, bgImgStyle]}></View>
          </ImageBackground>
        ) : null}
        {isLoading ? <Loading /> : children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    resizeMode: 'cover',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

import React, { useRef, useCallback, useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, Dimensions, Platform, BackHandler, ToastAndroid } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { Loading } from '../Loading';
import { onMessage } from './onMessage';
import onLoad from './onLoad';

import injectJavaScript from '../../utils/jsbridge.min';

const jsString = String(injectJavaScript);
const INJECTED_JAVASCRIPT = `;(${jsString})(window);true;`;

const WebViewCom = ({
  source,
  style = {},
  isTab,
  showsHorizontalScrollIndicator = false,
  ...rest
}) => {
  const [canGoBack, setCanGoBack] = useState(false);
  const navigation = useNavigation();
  let webviewRef = useRef(null);
  const isFocused = useIsFocused();
  const isFocusedCallback = useRef(null);

  const _onMessage = useCallback(
    ({ nativeEvent }) => {
      const data = JSON.parse(nativeEvent.data);
      if (data) {
        const { type, params, callbackId } = data;
        if (type === 'isFocused') {
          isFocusedCallback.current = {
            callbackId,
            params,
          };
        }
      }
      onMessage({ nativeEvent, navigation, webviewRef });
    },
    [navigation],
  );

  useEffect(() => {
    if (isFocusedCallback?.current) {
      const { callbackId, params } = isFocusedCallback.current;
      const cbData = { callbackId, params: { ...params, isFocused } };
      webviewRef?.injectJavaScript(
        `AppJSBridge.appCallback&&AppJSBridge.appCallback(${JSON.stringify(cbData)});true;`,
      );
    }
    return () => {};
  }, [isFocused, isFocusedCallback]);

  const _onLoad = useCallback((params) => {
    onLoad(params);
  }, []);

  const onNavigationStateChange = useCallback((navState) => {
    const { canGoBack } = navState;
    setCanGoBack(canGoBack);
  }, []);

  const _style = isTab
    ? {
        paddingTop: Constants.statusBarHeight,
      }
    : {};

  return (
    <View style={[{ flex: 1 }, _style]}>
      <WebView
        ref={(r) => (webviewRef = r)}
        source={source}
        useWebKit={true}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        onMessage={_onMessage}
        onLoad={(params) => _onLoad({ ...params, webviewRef, navigation })}
        onNavigationStateChange={onNavigationStateChange}
        startInLoadingState={true}
        javaScriptEnabled={true}
        renderLoading={() => <Loading type="absolute" />}
        renderError={() => (
          <View style={{ flex: 1 }}>
            <Text>加载 webview 出错了</Text>
          </View>
        )}
        originWhitelist={['*']}
        {...rest}
        showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
        // style={{
        //   width: WIDTH,
        //   height: isTab ? HEIGHT - tabHeight : HEIGHT,
        // }}
        style={{ width: '100%', height: '100%' }}
      />
    </View>
  );
};

export default WebViewCom;

# 对此项目的规划

出于兴趣把自己做 android、ios 开发过程中经验积累沉淀一下，此工程架构会定期更新升级依赖到最新版本，并不断的积累 App 中常用组件和基础页面功能，也会不断优化代码组织架构

# 此项目对以下情形会有帮助

- [x] 想用前端技术做 app 开发却无从下手
- [x] 想在项目中运用 typescript 进行开发的
- [x] 遇到 RN 本地环境运行或打包后报错及打包后 app 闪退等
- [x] 想了解学习 RN 跨三端开发的
- [x] 想快速上手开发一款 app 的

# 目录结构如下：

```
├── App.tsx
├── android
├── app.json
├── assets
│   ├── fonts
│   └── images
│       ├── adaptive-icon.png
│       ├── favicon.png
│       ├── icon.png
│       └── splash.png
├── babel.config.js
├── index.js
├── ios
├── metro.config.js
├── package.json
├── src
│   ├── api
│   │   ├── externalApi.ts
│   │   └── index.ts
│   ├── assets
│   ├── components
│   │   ├── Content
│   │   ├── Context
│   │   ├── Header
│   │   ├── Loading
│   │   ├── Restart
│   │   ├── Toast
│   │   ├── WebView
│   │   └── index.ts
│   ├── config
│   │   └── index.ts
│   ├── constants
│   │   ├── index.ts
│   │   └── rootConst.ts
│   ├── hooks
│   │   ├── index.ts
│   │   ├── useColorScheme.ts
│   │   ├── useLoadedAssets.ts
│   │   ├── useLocation.js
│   │   ├── useMyTheme.ts
│   │   ├── useRootState.ts
│   │   └── useUserInfo.ts
│   ├── index.tsx
│   ├── navigation
│   │   ├── BottomTabNavs.tsx
│   │   ├── LinkingConfig.ts
│   │   ├── NavConfig.tsx
│   │   ├── StackNavs.tsx
│   │   └── index.tsx
│   ├── reducers
│   │   ├── index.ts
│   │   └── rootState.ts
│   ├── screens
│   │   ├── NotFound.tsx
│   │   ├── auth
│   │   ├── demo
│   │   ├── home
│   │   └── my
│   ├── types
│   │   ├── index.tsx
│   │   └── types.tsx
│   └── utils
│       ├── CryptoJS.js
│       ├── checkIdCard.ts
│       ├── errorHandler.ts
│       ├── eventEmit.ts
│       ├── index.ts
│       ├── jsbridge.min.js
│       ├── jsbridge.ts
│       ├── request.ts
│       ├── smokesignals.js
│       ├── store.ts
│       └── websocket.ts
├── tsconfig.json
├── webpack.config.jsb.js
```

# App 打包以安卓平台为例

- yarn android 本地开发
- yarn android-test 内网测试包
- yarn android-prod 外网正式包

### 技术选型

- react-native 跨平台 app 框架
- react-navigation5 路由
- typescript
- react-native-elements UI 基础组件库
- expo 开发调试器

# 开发调试（两种方式）：

### Expo 快速模式

- 全局安装 expo-cli: npm install -g expo-cli
- 项目根目录执行 yarn web, 会自动打开浏览器 web 页出现二维码，手机需安装 Expo App 扫描二维码进行开发调试，代码改动保存后会实时更新视图

### React-Native-Cli 模式

- USB 连接真机，执行 yarn android 命令，会自动安装开发模式下生成的 apk 到手机安装，代码改动手机端能实时呈现

**注意需要先把本地基本环境安装好 如 Android SDK:**
 [官方文档开发环境安装](https://reactnative.dev/docs/environment-setup)

### 如何增加一个业务页面

- 在 screens 目录新建页面, 如: screens/my/My.tsx
- 页面 tsx 文件需包含以下基本结构：

```
import * as React from 'react';
import { View, Text } from 'react-native';
import { Content } from '../../components';

export default function Demo() {
  return (
    <Content>
      <View>
        <Text>新建业务页面</Text>
      </View>
    </Content>
  );
}

// Content 是封装好的主内容区布局组件，这个组件的设计主要负责处理所有页面共用逻辑及平台兼容性问题，目前已集成 SafeAreaView, ScrollView 功能;
// Content 的 props 支持传自定义属性
```

# 关于 webview 中 APP 与 H5 通信

App 端已经封装了 JSBridge 实现 App 与 H5 相互通信，把 JSBridge 类实例注入到了 H5 页面中的 window 对象下，所以 H5 中通过 window.AppJSBridge 可访问 JSBridge 的所有方法与属性，由于注入是异步的，在 window.AppJSBridgeOnReady 回调中才能调用实例方法和属性。

### H5 页面中通过 window.AppJSBridge.callNative 与 App 通信：

```
/**
* callNative(type, params, callback)
* @param {type} 调 RN 的服务标识
* @param {params 可选} 向 RN 传递参数
* @param {callback} RN 处理后回调 web
*/
window.AppJSBridgeOnReady = function() {
    alert(JSON.stringify(window.AppJSBridge.appInfo))
    window.AppJSBridge.callNative('getLoginInfo', {}, data => {
      alert(JSON.stringify(data))
    })
 }
```

# 代码规范

### 事件函数以 on 开头，如：

```
<BtnCom title="确认支付" onPress={onPay} />
```

### JSX 虚拟 DOM 结构分拆以 render 开头，如：

```
const renderForm = () => {
  return (
    <View style={styles.formBox}>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <FormInput
            inputStyle={[styles.input]}
            onBlur={onBlur}
            leftIcon={(style) => <Text style={[style]}>联系人</Text>}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="userName"
        rules={{ required: true }}
      />
    </View>
  );
};

return (
  <Content>
    <View style={styles.selectItem}>
      {groupProject.map((item, index) => (
        <Button
          containerStyle={[styles.selectItemButton]}
          key={index}
          title={item.projectName}
          onPress={() => setSelectedIndex(index)}
          type={selectIndex === index ? 'solid' : 'outline'}
        />
      ))}
    </View>
    {renderForm()}
  </Content>
);
```

# 最后

- 仅以此项目抛砖引玉，相互学习有所进步，如有问题请提 Issues, 我会第一时间解答
- 如果你觉得这个项目对你有所帮助，欢迎 Star 支持鼓励，谢谢

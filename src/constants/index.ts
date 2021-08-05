import ROOT_CONST from './rootConst';

// 颜色相关配置
const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};

export const Sizes = {
  fontSizeLg: 20, // 大小号
  fontSize: 16, // 正常字号
  fontSizeSmall: 14, // 小字号
  fontSizeTag: 12, // 标签字号
  contentSpace: 16, //内容距离屏幕边缘
  widgetSpace: 10, //组件之间距离
};

// elementsTheme 主题色
export const elementsTheme = (themeName: string) => {
  const tint = Colors[themeName].tint;
  return {
    Input: {
      inputStyle: {
        fontSize: Sizes.fontSize,
      },
    },

    Button: {
      buttonStyle: { borderRadius: 50, backgroundColor: tint },
      titleStyle: {
        color: '#fff',
        fontSize: Sizes.fontSize,
      },
    },
  };
};

export { ROOT_CONST };

import ROOT_CONST from './rootConst';

// 颜色相关配置
const primaryColorLight = '#2f95dc';
const primaryColorDark = '#fff';

export const Colors = {
  light: {
    text: '#000',
    background: '#fff',
    primary: primaryColorLight,
    tabIconDefault: 'rgb(28, 28, 30)',
    tabIconSelected: primaryColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    primary: primaryColorDark,
    tabIconDefault: 'rgb(28, 28, 30)',
    tabIconSelected: primaryColorDark,
  },
};

export const Sizes = {
  fontSize20: 20, // 大小号
  fontSize16: 16, // 正常字号
  fontSize14: 14, // 小字号
  fontSize12: 12, // 标签字号
  contentSpace: 16, //内容距离屏幕边缘
  widgetSpace: 10, //组件之间距离
};

// elementsTheme 主题色
export const elementsTheme = (themeName: string) => {
  const primary = Colors[themeName].primary;
  return {
    Input: {
      inputStyle: {
        fontSize: Sizes.fontSize16,
      },
    },

    Button: {
      buttonStyle: { borderRadius: 50, backgroundColor: primary },
      titleStyle: {
        color: '#fff',
        fontSize: Sizes.fontSize16,
      },
    },
  };
};

export { ROOT_CONST };

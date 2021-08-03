var path = require('path');
const _resolve = path.resolve;
const utilsPath = _resolve(__dirname, 'src/utils');

var entries = {
  jsbridge: _resolve(utilsPath, 'jsbridge.js'),
};

module.exports = {
  watch: true,
  entry: entries,
  output: {
    filename: '[name].min.js',
    path: utilsPath,
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: ['node_modules', utilsPath],
  },
  watchOptions: {
    ignored: ['files/**/*.js', 'node_modules/**'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            [
              '@babel/preset-env', // 将ES6语法转成ES5
              {
                // 低版本浏览器中只补充项目中使用到的ES6语法
                useBuiltIns: 'usage',
              },
            ],
          ],
        },
      },
    ],
  },
};

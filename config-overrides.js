const {
  override,
  addWebpackAlias,
} = require('customize-cra');

const PKG = require('./package.json');
const path = require('path');

if (process.env.NODE_ENV === 'production') {
  process.env.GENERATE_SOURCEMAP = 'false';
}

module.exports = override(
  //别名配置
  addWebpackAlias({
    '@': path.join(__dirname, './src'),
  }),
);
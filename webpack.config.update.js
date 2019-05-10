const path = require('path'); // eslint-disable-line
const webpack = require('webpack'); // eslint-disable-line
const IS_DEV = process.env.NODE_ENV !== 'production';

const currentPath = path.resolve(process.cwd(), './src');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line

module.exports = (config) => {  // eslint-disable-line
  if (IS_DEV) {
    config.entry = {
      ...config.entry,
      mock: currentPath + '/mock/index.js',
    };
  } else {
    const LimitChunkCountPlugin = new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 3, // 必须大于或等于 1
      // minChunkSize: 10000
    });
    config.plugins = config.plugins.concat(LimitChunkCountPlugin);
  }



  config.resolve = {
    ...config.resolve,
    alias: {
      api: currentPath + '/api',
      hoc: currentPath + '/hoc',
      components: currentPath + '/components',
      common: currentPath + '/common',
      hooks: currentPath + '/hooks',
      store: currentPath + '/store',
      pages: currentPath + '/pages',
      assets: currentPath + '/assets',
      layout: currentPath + '/layout',
      global: currentPath + '/global',
      router: currentPath + '/router',
    }
  };
  return config;
};

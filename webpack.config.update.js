const path = require('path');

const currentPath = path.resolve(process.cwd(), './src');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line

module.exports = (config) => {
  if (process.env.NODE_ENV !== 'production') {
    config.entry = {
      ...config.entry,
      mock: currentPath + '/mock/index.js',
      login: currentPath + '/login.js',
    };
  }


  const HtmlWebpack = new HtmlWebpackPlugin({
    inject: true,
    template: path.resolve(process.cwd(), './public/index.html'),
    excludeChunks: ['login'],
  });
  config.plugins = config.plugins.concat(HtmlWebpack);

  config.resolve = {
    ...config.resolve,
    alias: {
      components: currentPath + '/components',
      common: currentPath + '/common',
      store: currentPath + '/store',
      pages: currentPath + '/pages',
      assets: currentPath + '/assets',
    }
  };
  return config;
};

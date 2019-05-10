const path = require('path'); // eslint-disable-line

const currentPath = path.resolve(process.cwd(), './src');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line

module.exports = (config) => {  // eslint-disable-line
  if (process.env.NODE_ENV !== 'production') {
    config.entry = {
      ...config.entry,
      mock: currentPath + '/mock/index.js',
    };
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

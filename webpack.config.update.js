const path = require('path');

const currentPath = path.resolve(process.cwd(), './src');

module.exports = (config) => {
  if (process.env.NODE_ENV !== 'production') {
    config.entry = {
      ...config.entry,
      mock: currentPath + '/mock/index.js',
    };
  }
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

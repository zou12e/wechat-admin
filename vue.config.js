const path = require('path');

function resolve (pathName) {
  return path.resolve(__dirname, pathName);
}

module.exports = {
  // devServer: {
  //   port: 8080,
  //   proxy: {
  //     '/api': {
  //       target: 'http://winbitex.zourunze.com'
  //     }
  //   }
  // },
  chainWebpack (config) {
    config.resolve.alias
      .set('@common', resolve('src'));
  }
};

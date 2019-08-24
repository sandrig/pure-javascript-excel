const devConfig = require('./config/webpack.dev.config.js');
const prodConfig = require('./config/webpack.prod.config.js');

const environment = (process.env.NODE_ENV || 'development').trim();

if (environment === 'development') {
  module.exports = devConfig;
} else {
  module.exports = prodConfig;
}

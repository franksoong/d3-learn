import config from './webpack.config';
import webpack from 'webpack';
import path from 'path';


export default config({
  port: 3000,
  env: 'development',

  // http://webpack.github.io/docs/configuration.html#devtool
  devtool:'eval',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});

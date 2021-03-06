import config from './webpack.config';
import webpack from 'webpack';
import path from 'path';

//set sever port for dev
export const PORT = 3000;

export default config({
  port: PORT,
  env: 'development',

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),

    new webpack.HotModuleReplacementPlugin(),
  ],
});

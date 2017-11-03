/* global __dirname */
import webpack from 'webpack';
import config from './webpack.config';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// with stripped devtool, devServer and Hot Module Replacement configurations:
export default config({
    port: 8080,
    env: 'production',

    // http://webpack.github.io/docs/configuration.html#devtool
    // devtool: 'source-map',

    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
            noInfo: true, // set to false to see a list of every file being bundled.
        }),

        // Generate an external css file with a hash in the filename
        new ExtractTextPlugin('[name].[contenthash].css', {
            allChunks: false
        }),

        // Minify JS, https://github.com/mishoo/UglifyJS2#usage
        // http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
            },
            sourceMap: false,
            output: { comments: false },
        }),
    ]
});
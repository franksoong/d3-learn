/* global __dirname */
import webpack from 'webpack';
import config from './webpack.config';
import ExtractTextPlugin from 'extract-text-webpack-plugin';


//set sever port for dist
export const PORT = 8080;

export default config({
    port: PORT,
    env: 'production',

    //http://webpack.github.io/docs/configuration.html#devtool
    devtool: 'source-map',

    plugins: [

        //http://webpack.github.io/docs/list-of-plugins.html#defineplugin
        //The DefinePlugin allows you to create global constants which can be configured at compile time. This can be very useful for allowing different behaviour between development builds and release builds. For example, you might use a global constant to determine whether logging takes place; perhaps you perform logging in your development build but not in the release build. That’s the sort of scenario the DefinePlugin facilitates.
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),

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
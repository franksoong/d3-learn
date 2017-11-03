import config from './webpack.config';
import webpack from 'webpack';
import path from 'path';



// require option for postcss-loader,
// or will cause No PostCSS Config found error
// https://www.npmjs.com/package/postcss-loader
const postCssLoaderOptions = {
    plugins: (loader) => [
        require('postcss-import')({ root: loader.resourcePath, }),
        require('postcss-cssnext')({ warnForDuplicates: false, }),
    ],
    sourceMap: true,
};

export default config({
    port: 3000,
    env: 'development',

    // http://webpack.github.io/docs/configuration.html#devtool
    devtool: 'eval',

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],

    loaders: [{
            test: /(\.css|\.scss|\.sass)$/,
            exclude: /node_modules/,
            use: [
                { loader: 'style-loader' },
                { loader: 'css-loader?sourceMap' },
                { loader: 'postcss-loader', options: postCssLoaderOptions },
                { loader: 'sass-loader?sourceMap' },
            ]
        }
    ],
});
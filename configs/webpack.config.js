/* global __dirname */
import webpack from 'webpack';
import path from 'path';
import packageJson from '../package.json';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import cssLoader from './cssLoader.config';


const basePath = path.join(__dirname, '..', 'src');


export default ({
    plugins = [],
    resolve = {},

    env = process.env.NODE_ENV || 'development',
    devtool = 'eval',
    port = 3000,
}) => {
    return {
        context: basePath,
        entry: {
            app: path.join(basePath, 'index'),

            //load the third party modules, each module has the key as identifier
            //OPTIONAL, ignore this also work fine, TODO figure the reason
            vendor: Object.keys(packageJson.dependencies),
        },

        output: {
            path: path.join(basePath, '..', 'out'), //output path
            publicPath: env === 'development' ? '/' : '', //serve path
            filename: '[name].[hash].js',
        },
        //debugger;

        // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
        devtool,

        plugins: [
            // Generate HTML file that contains references to generated bundles. See here for how this works: https://github.com/ampedandwired/html-webpack-plugin#basic-usage
            // https://github.com/kangax/html-minifier#options-quick-reference
            new HtmlWebpackPlugin({
                template: path.join(basePath, 'index.html'),
                title: 'My Demo App',
                favicon: path.join(basePath, 'favicon.png'),
                minify: false,
                inject: true,
            }),

            //OPTIONAL
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                filename: '[name].[hash].js',
            }),

            new webpack.LoaderOptionsPlugin(),

            //http://webpack.github.io/docs/list-of-plugins.html#provideplugin
            //Automatically loaded modules. Module (value) is loaded when the identifier (key) is used as free variable in a module. The identifier is filled with the exports of the loaded module.
            new webpack.ProvidePlugin({
                // _ could be used as a gloable variable, because _ is automatically set to the exports of module "lodash"
                //_: 'lodash',
                //$: "jquery",
            }),

        ].concat(plugins),

        resolve: Object.assign({}, {
            extensions: ['*', '.js', '.jsx', '.json'],

            modules: [
                'node_modules',
                'app',
            ],

            alias: {},

        }, resolve),

        module: {
            loaders: [
                // Load ES6/JSX
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    include: [basePath],
                },

                // Load fonts
                {
                    test: /\.eot(\?v=\d+.\d+.\d+)?$/,
                    loader: 'url-loader?name=[name].[ext]',
                }, {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]',
                }, {
                    test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
                    loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=[name].[ext]',
                }, {
                    test: /\.svg(\?v=\d+.\d+.\d+)?$/,
                    loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=[name].[ext]',
                },

                // Load images
                // difference for url-loader and file-loader:
                // The url-loader works like the file-loader, but can return a DataURL if the file is smaller than a byte limit.
                {
                    test: /\.jpe?g/,
                    loader: 'url-loader?limit=10000&mimetype=image/jpg',
                }, {
                    test: /\.gif/,
                    loader: 'url-loader?limit=10000&mimetype=image/gif',
                }, {
                    test: /\.png/,
                    loader: 'url-loader?limit=10000&mimetype=image/png',
                }, {
                    test: /\.svg/,
                    loader: 'url-loader?limit=10000&mimetype=image/svg',
                }, {
                    test: /\.ico$/,
                    loader: 'url-loader?limit=10000',
                },

                // Load styles
                cssLoader(env),
            ]
        },

        // http://webpack.github.io/docs/webpack-dev-server.html
        // https://webpack.js.org/configuration/dev-server/#devserver
        devServer: {
            port: port,
            contentBase: path.join(basePath, 'assets'), //Content not from webpack is served from here
            proxy: {},
            //http://webpack.github.io/docs/webpack-dev-server.html#the-historyapifallback-option
            historyApiFallback: {
                rewrites: [
                    // for all requests
                    { from: /./, to: '/index.html' },

                    // for landing page
                    // { from: /^\/$/, to: '/views/landing.html' },
                    // for all routes starting with /subpage
                    // { from: /^\/subpage/, to: '/views/subpage.html' },
                    // for all other pages
                    //{ from: /./, to: '/views/404.html' },
                ],
            },
            compress: true,
            open: true,
            clientLogLevel: 'info',
            hot: true,
            headers: {
                "X-Custom-Foo": "bar"
            },
            watchOptions: {
                ignored: /node_modules/,
                aggregateTimeout: 300,
                poll: 1000
            },
            //Display no info to console (only warnings and errors)
            noInfo: true,
            //control compile output
            stats: {
                // Add children information
                children: true,
                // Add chunk information (setting this to `false` allows for a less verbose output)
                chunks: true,
                // Add built modules information to chunk information
                chunkModules: true,
                // Add the origins of chunks and chunk merging info
                chunkOrigins: true,
                // `webpack --colors` equivalent
                colors: true,
            },
            setup: function(app) {
                // Here you can access the Express app object and add your own custom middleware to it.
                // For example, to define custom handlers for some paths:
                // app.get('/some/path', function(req, res) {
                //   res.json({ custom: 'response' });
                // });
            },
        },
    };
};
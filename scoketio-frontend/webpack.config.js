var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './src/index.js',

    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },

    devServer: {
        inline: true,
        port: 7777,
        contentBase: __dirname + '/public/'
    },

    module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        cacheDirectory: true,
                        presets: ['es2015']
                    }
                },
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract({
                        fallbackLoader: 'style-loader',
                        loader: [
                            'css-loader',
                            {
                                loader: 'sass-loader',
                                query: {
                                    sourceMap: false,
                                }
                            }
                        ],
                    }),
                },
                // {
                //     test: /\.scss$/,
                //     use: [
                //         'style-loader',
                //         {
                //             loader: 'css-loader',
                //             options: {
                //                 importLoaders: 1
                //             }
                //         },
                //         'sass-loader',
                //     ]
                // },
            ]
        },
    plugins: [
        new ExtractTextPlugin('style.css'),
    ]
};
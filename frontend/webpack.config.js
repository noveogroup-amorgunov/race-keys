require('dotenv-extended').load();

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const publicFolder = path.resolve(__dirname, 'public');
const srcFolder = path.resolve(__dirname, 'src');

const plugins = process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
    })
] : [];

module.exports = {
    devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : false,
    entry: [
        'babel-polyfill',
        './src/index.js',
        './src/assets/styles.scss'
    ],
    output: {
        filename: process.env.NODE_ENV !== 'production' ? '[hash].bundle.js' : '[hash].bundle.min.js',
        publicPath: '/',
        path: publicFolder,
    },
    module: {
        loaders: [
            {
                test: /\.(mp3|gif|jpg|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                use: 'file-loader'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'react-hot-loader',
                }
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'es2015', 'react', 'stage-0'],
                        cacheDirectory: true
                    }
                }
            },
            {
                test: /\.s?css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader'
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }],
                })
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(srcFolder, 'index.html')
        }),
        new ExtractTextPlugin({
            filename: process.env.NODE_ENV !== 'production' ? '[hash].styles.css' : '[hash].style.min.css',
            allChunks: true,
            disable: process.env.NODE_ENV === 'development'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                API_URL: JSON.stringify(process.env.API_URL),
                SOCKET_URL: JSON.stringify(process.env.SOCKET_URL),
                HOST_URL: JSON.stringify(`http://${process.env.HOST}:${process.env.PORT}`),
            },
        }),

        ...plugins
    ],
    devServer: {
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 1234,
        // inline: false,
        contentBase: publicFolder,
        historyApiFallback: true,
        disableHostCheck: true,
    },
    resolve: {
        modules: ['src', 'node_modules'],
        extensions: ['*', '.js', '.jsx', '.json'],
        alias: {
            '@': srcFolder,
        }
    },
};

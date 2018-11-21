const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');


const srcPath = subPath => path.join(__dirname, '../src', subPath);

module.exports = {
    context: path.resolve('./src'),
    entry: './index.jsx',
    output: {
        path: path.join(__dirname, '..', '/public'),
        publicPath: '/',
        filename: 'static/js/[name].[hash].js',
        chunkFilename: 'static/js/[id].[hash].chunk.js'
    },
    resolve: {
        extensions:  ['.js', '.jsx', '.scss', '.css', '.html'],
        alias: {
            components: srcPath('components'),
            models: srcPath('models'),
            utils: srcPath('utils'),
            config: srcPath('config'),
        }
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            sourceMap: false,
                            localIdentName: '[local][hash:base64:10]',
                        }
                    },
                    {
                        loader: 'resolve-url-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer({ browsers: ['Safari >= 8', 'last 2 versions'] })]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            outputStyle: 'expanded',
                            sourceMap: false
                        }
                    }
                ],
                sideEffects: true
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                            importLoaders: 1,
                            sourceMap: false,
                            localIdentName: '[hash:base64:10]',
                        }
                    },
                    {
                        loader: 'resolve-url-loader'
                    },
                ],
                sideEffects: true
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                use: {
                    loader: 'file-loader',
                    query: {
                        name: 'static/images/[name].[ext]'
                    }
                }
            },
            {
                test: /\.js|.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: srcPath('index.html'),
            title: 'Durex Admin',
            appMountId: 'root',
            lang: 'ru',
            meta: [
                {
                    name: 'viewport',
                    content: 'width=device-width,initial-scale=1'
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name]-[hash].css'
        }),
    ]
};

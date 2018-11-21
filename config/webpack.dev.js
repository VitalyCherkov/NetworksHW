const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');

module.exports = webpackMerge(commonConfig, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        publicPath: '/',
        port: 3000,
        historyApiFallback: true,
        compress: true,
        overlay: {
            warnings: false,
            errors: true
        },
    },
});

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './js/index.html',
    filename: 'index.html',
    inject: 'body'
});


module.exports = {
    entry: './js/index.js',
    output: {
        path: path.resolve('.'),
        filename: 'index_bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.css$/, loader: 'style-loader'},
            { test: /\.css$/, loader: 'css-loader', query: {
                modules: true, localIdentName: '[name]__[local]___[hash:base64:5]'
                } },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: "file-loader" }
        ]
    },
    plugins: [HtmlWebpackPluginConfig]
};

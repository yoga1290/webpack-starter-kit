var glob = require("glob");
var path = require("path");
var webpack = require("webpack");

var configuration = {
    context: path.join(__dirname, "."),
    // https://github.com/webpack/webpack/issues/370
    entry: glob.sync("./js/*"),
    output: {
        path: './',
        filename: './bundle.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false }
        })],
    /*
        @see https://webpack.github.io/docs/configuration.html#module-loaders
        IMPORTANT:
            The loaders here are resolved relative to the resource which they are applied to.
            This means they are not resolved relative to the configuration file.
            If you have loaders installed from npm and your node_modules folder is not in a parent folder of all source files, webpack cannot find the loader.
            You need to add the node_modules folder as absolute path to the resolveLoader.root option.
            `(resolveLoader: { root: path.join(__dirname, "node_modules") })`
    */
    resolveLoader: { root: path.join(__dirname, "node_modules") },
    module: {
        //http://webpack.github.io/docs/using-loaders.html#configuration
        loaders: [
           {
                test: /\.css$/,
                loader: 'style-loader!css-loader?root=.'},
                // https://github.com/webpack/css-loader#root-relative-urls
            {
                test: /\.html$/,
                loader: 'raw-loader'},
            {
                test: /\.(svg|ttf|eot|png|woff)$/,
                loader: 'url-loader?limit=100000'}
        ]
    }
};

//http://webpack.github.io/docs/configuration.html#cli
module.exports = configuration;
var glob = require("glob");
var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var webpackEntries = [];
// see https://github.com/isaacs/node-glob
var webpackEntries = glob.sync("./js/**/*.js");
for(var i=0;i<webpackEntries.length;i++)
    webpackEntries[i] = webpackEntries[i].split('.js').join('');

var configuration = {
    context: path.join(__dirname, "."),
    entry: {
        js: webpackEntries,
        css: glob.sync("./css/**/*.css")
    },
    output: {
        path: './',
        filename: './app.js'
    },
    plugins: [
        new ExtractTextPlugin("style.css"),
        new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false }
        })
    ],
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
           // Extract css files
            // see https://webpack.github.io/docs/stylesheets.html#separate-css-bundle
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            }
        ]
    }
};

//http://webpack.github.io/docs/configuration.html#cli
module.exports = configuration;
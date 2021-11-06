const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    target: "web",
    mode: "development",
    devtool: "source-map",
    stats: "minimal",
    context: __dirname,

    entry: path.join(__dirname, "src", "client.tsx"),
    output: {
        path: path.join(__dirname, "dist"),
        filename: "client.js",
        publicPath: "/static/"
    },
    resolve: {
        extensions: [".js", ".json", ".ts", ".tsx"]
    },
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: "ts-loader"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "source-map-loader",
                enforce: "pre"
            },
            {
                test: /\.less$/,
                use: "null-loader"
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {from: path.join(__dirname, "assets"), to: path.join(__dirname, "dist")}
            ]
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "template.ejs")
        })
    ]
};

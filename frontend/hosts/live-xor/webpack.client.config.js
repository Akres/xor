const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    target: "web",
    mode: "development",
    devtool: "source-map",
    stats: "minimal",
    context: __dirname,

    entry: path.join(__dirname, "src", "client.ts"),
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
                test: /\.(le|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    "css-loader" ,
                    "less-loader"
                ]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {from: path.join(__dirname, "assets"), to: path.join(__dirname, "dist")}
            ]
        }),
        new MiniCssExtractPlugin({
            filename: "styles.css"
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "template.ejs"),
            filename: path.join(__dirname, "dist", "index.html")
        })
    ]
};

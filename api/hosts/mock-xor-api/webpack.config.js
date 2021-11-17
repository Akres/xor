const path = require("path");
const StartServerPlugin = require("start-server-webpack-plugin");
const {HotModuleReplacementPlugin} = require("webpack");

module.exports = {
    target: "node",
    mode: "development",
    devtool: "source-map",
    stats: "minimal",
    context: __dirname,

    entry: [
        "webpack/hot/poll?300",
        path.join(__dirname, "./src/index.ts")
    ],
    output: {
        path: path.join(__dirname, "lib"),
        filename: "server.js",
        libraryTarget: "commonjs2"
    },
    resolve: {
        extensions: [".js", ".json", ".ts"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/

            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "source-map-loader",
                enforce: "pre"
            },
            {
                test: /\.node$/,
                use: "node-loader"
            }
        ]
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new StartServerPlugin({
            name: "server.js"
        })
    ]
};

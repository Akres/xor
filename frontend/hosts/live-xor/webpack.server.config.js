const path = require("path");

module.exports = {
    target: "node",
    mode: "production",
    devtool: "source-map",
    stats: "minimal",
    context: __dirname,

    entry: path.join(__dirname, "./src/index.ts"),
    output: {
        path: path.join(__dirname, "dist"),
        filename: "server.js",
        libraryTarget: "commonjs2"
    },
    resolve: {
        extensions: [".js", ".json", ".ts", ".tsx"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
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
    }
};

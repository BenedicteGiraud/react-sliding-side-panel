const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const env = process.env.WEBPACK_ENV;

const plugins = [
    new MiniCssExtractPlugin({
        filename: '[name].css',
    }),
];

const config = {
    entry: [
        path.resolve(__dirname, 'src', 'index.jsx'),
        path.resolve(__dirname, 'src', 'index.css'),
    ],
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: "[name].js",
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-env", "@babel/preset-react"],
            },
        }, {
            test: /\.css$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: env === 'development',
                    },
                },
                {
                    loader: 'css-loader',
                    options: { importLoaders: 1 },
                },
            ],
        }],
    },
    resolve: {
        modules: [
            "node_modules",
        ],
    },
    plugins: plugins,
    optimization: {
        minimize: env === 'production',
    },
};

module.exports = config;

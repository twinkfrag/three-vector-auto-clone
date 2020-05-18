const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const threeVectorCloneTransformerFactory = require('./threeVectorCloneTransformer').default;

/**
 * @type import('webpack').Configuration
 */
module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js',
        chunkFilename: 'vendor.js',
    },
    resolve: {
        extensions: ['.js', '.ts'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    getCustomTransformers: (program) => ({
                        before: [threeVectorCloneTransformerFactory(program)]
                    }),
                }
            },
        ],
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
    plugins: [
        new HtmlWebpackPlugin(),
    ],
    devtool: "inline-source-map",
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 8080,
    },
}

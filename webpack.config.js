const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;



// Main
module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: './scripts/index.js',
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },


    // Plugins
    plugins: [
        // Clean
        new CleanWebpackPlugin(),

        // HTML
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
        }),

        // Styles
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),

        // Copy
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets/images/webpack-logo.png'),
                    to: path.resolve(__dirname, 'dist'),
                }],
        }),

        // Analyzer
        new BundleAnalyzerPlugin(),
    ],


    // Loaders
    module: {
        rules: [
            {   // Styles-loader
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    "autoprefixer",
                                ]
                            }
                        }
                    },
                    "sass-loader",],
            },
            {
                // Images-loader
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset/resource',
            },
            {
                // Fonts-loader
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                // Babel-loader
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
            },
        ],
    },

    // Optimization
    optimization: {
        minimize: true,
        minimizer: [
          // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
          // `...`,

          new CssMinimizerPlugin(),
          new TerserPlugin()
        ],
    },

    // Server
    devServer: {
        static: {
            directory: path.join(__dirname, 'src'),
        },
        port: 9000,
    }
};

/* eslint-disable */
const merge = require('webpack-merge');
// Plugins
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
//const MinifyPlugin = require("babel-minify-webpack-plugin");
const MinifyPlugin = require("uglifyjs-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// Configs
const baseConfig = require('./webpack.base.config');

const prodConfiguration = env => {
  return merge([
    {
      entry: {
        index: "./src/index.js",
        projects: "./src/components/Projects.js",
        resume: "./src/components/Resume.js",
        contact: "./src/components/Contact.js",
        upload: "./src/components/Upload.js",
        app: "./src/components/App.js"
      },
      output: {
        filename: "./dist/[name].bundle.js"
      },
      optimization: {
        minimize: true,
        splitChunks: { chunks: 'all' }
      },
      plugins: [
        new MiniCssExtractPlugin(),
        new OptimizeCssAssetsPlugin(),
        new Visualizer({ filename: './statistics.html' }),
        new webpack.IgnorePlugin({ resourceRegExp: /^\.\/locale$/, contextRegExp: /moment$/ })
      ],
    },
  ]);
}

module.exports = env => {
  return merge(baseConfig(env), prodConfiguration(env));
}

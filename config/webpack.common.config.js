const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[chunkhash].js',
  },

  module: {
    rules: [
      {
        test: /\.(js)$/,
        include: path.resolve(__dirname, '../src'),
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        },
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: [/.css$|.scss$/],
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },

  resolve: {
    alias: {
      '@scss': path.resolve(__dirname, '../src/scss'),
      '@': path.resolve(__dirname, '../src'),
    },
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    extensions: ['.js'],
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['dist'],
    }),
    new HtmlWebpackPlugin({
      title: 'Pure JavaScript Excel',
      template: './src/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'style.[chunkhash].css',
    }),
  ],

  devServer: {
    open: true,
  },
};

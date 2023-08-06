const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devServer: {
    open: true,
    host: 'localhost',
    hot: true,
    watchFiles: ["./src/**/*"],
    proxy: {
      '*': {
        target: "http://localhost:8888/Webpack/project/src/",
      },
    },
    static: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  devtool: 'source-map',
  entry: './src/assets/javascripts/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: './assets/javascripts/[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { 'targets': '> 0.25%, not dead' }],
              ],
            },
          },
        ],
      },
      {
        test: /\.(css|sass|scss)$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: false,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  "postcss-preset-env",
                  require("autoprefixer")({
                    grid: true,
                  })
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: '[path][name][ext]',
        },
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 85,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './assets/stylesheets/main.css',
    }),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      plugins: [
        ImageminMozjpeg({
          quality: 85,
          progressive: true,
        }),
      ],
      pngquant: {
        quality: '70-85',
      },
      gifsicle: {
        interlaced: false,
        optimizationLevel: 10,
        colors: 256,
      },
      svgo: {}
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/images'),
          to: path.resolve(__dirname, 'dist/assets/images')
        },
      ],
    }),
    new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //   template: './src/index.php',
    //   filename: 'index.php'
    // }),
  ],
  watchOptions: {
    ignored: /node_modules/,
  },
}

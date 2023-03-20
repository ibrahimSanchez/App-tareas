const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { loader } = require('mini-css-extract-plugin'); 
const CssMinimizer = require('css-minimizer-webpack-plugin')
const Terser = require('terser-webpack-plugin')
module.exports = {

  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
    },
  },

    mode: 'production',
    output: {
        clean: true,
        filename:'main.[contenthash].js',
        assetModuleFilename: 'assets/[hash][ext][query]'
    },
    optimization:{
      minimize:true,
      minimizer:[
        new CssMinimizer(),
        new Terser()
      ]
    },
    module: {
        rules: [
          {
            test: /\.html$/i,
            loader: "html-loader",
            options: {minimize: false}
          },
          {
            test: /\.css$/i,
            exclude: /style.css$/,
            use: ['style-loader','css-loader']
          },
          {
            test:/style.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/,
            type: 'asset/resource'

          },
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ],
      },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
          filename: '[name].[fullhash].css',
          ignoreOrder:false
        }),
    ]
}
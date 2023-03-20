const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { loader } = require('mini-css-extract-plugin');  
module.exports = {

  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
    },
  },

    mode: 'development',
    output: {
        clean: true,
        assetModuleFilename: 'assets/[hash][ext][query]'
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

          }
        ],
      },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
          filename: '[name].css',
          ignoreOrder:false
        }),
    ]
}
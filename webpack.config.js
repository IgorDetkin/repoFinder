
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 

module.exports = {
    entry: { main: './src/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
            publicPath: ''
      },
    mode: 'development',
    devServer: {
        static: path.resolve(__dirname, './dist'), 
        open: true,
        compress: true,
        port: 8080 // порт, чтобы открывать сайт по адресу localhost:8080. Можно поменять!!
        
      },
    module: {
        rules: [ 
          {
            test: /\.js$/, // искать js файлы
            use: 'babel-loader',
            exclude: '/node_modules/' // НЕ включая папку node_modules
          },
          {
            test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
            type: 'asset/resource'
          },
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, {
              loader: 'css-loader',
              options: { importLoaders: 1 }
              },
              'postcss-loader'
            ]
          }
        ]
      },
    plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html'
        }),
        // new HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin()
      ] 
}
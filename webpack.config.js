const webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  path = require('path'),
  { version } = require('./package')

const mode = process.env.NODE_ENV || 'development'

module.exports = {
  mode,

  entry: {
    bundle: './src/components/main/index.ts'
  },
  output: {
    path: `${__dirname}/build`,
    filename: 'bundle.js',
    publicPath: '/',
  },

  devtool: mode === 'production' ? false : 'source-map',

  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      'site-api': path.resolve(__dirname, 'src/site-api/'),
      'api': path.resolve(__dirname, 'src/api/'),
      'components': path.resolve(__dirname, 'src/components/'),
      'utils': path.resolve(__dirname, 'src/utils/'),
    }
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: ['ts-loader']
      },
      {
        test: /.pug$/,
        loader: ['pug-loader']
      },
      {
        test: /\.css$/,
        use: ['text-loader']
      },
      {
        test: /\.(ico|svg|png|jpg)$/,
        loader: 'file-loader',
        options: {
          name: '[hash].[ext]',
          outputPath: 'assets/',
        },
      },
    ]
  },

  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.DefinePlugin({
      'appVersion': JSON.stringify(version),
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.pug',
    }),
    new webpack.IgnorePlugin(/vertx/),
  ],

  devServer: {
    host: '0.0.0.0',
    historyApiFallback: true,
  },
}

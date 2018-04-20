const webpack = require('webpack'),
  BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
  { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  { spawn } = require('child_process'),
  path = require('path')

const env = process.env.NODE_ENV,
  plugins = []

env === 'development' &&
  plugins.push(
    // http://localhost:3000
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      open: false,
      // Proxing poliserve
      proxy: 'localhost:8128'
    }),
    // http://localhost:8888
    new BundleAnalyzerPlugin({
      openAnalyzer: false
    }),
    // Run poliserve for resolve app-route url's
  ) && spawn('node', ['node_modules/polyserve/bin/polyserve', '--port', '8128', '--root', './build'])

module.exports = {
  entry: {
    bundle: './src/components/main/index.ts'
  },
  output: {
    path: `${__dirname}/build`,
    filename: 'bundle.js',
  },

  devtool: env === 'production' ? false : 'source-map',

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
    rules: [{
      test: /\.ts?$/,
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
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.APP_ENV': JSON.stringify(env),
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.pug',
    }),
    ...plugins,
  ]
}

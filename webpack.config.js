const webpack = require('webpack'),
  BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
  {
    BundleAnalyzerPlugin
  } = require('webpack-bundle-analyzer'),
  {
    spawn
  } = require('child_process'),
  path = require('path')

// Run poliserve for resolve app-route url's
spawn('node', ['node_modules/polyserve/bin/polyserve', '--port', '8128'])

const env = process.env.NODE_ENV,
  plugins = []

env === 'production' &&
  plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        sequences: true,
        booleans: true,
        dead_code: true,
        loops: true,
        unused: true,
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
  )

module.exports = {
  entry: {
    bundle: './src/components/main/index.ts'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/build'
  },

  devtool: 'source-map',

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
        use: [{
          loader: 'pug-loader',
          options: {}
        }]
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'text-loader'
        }]
      },
    ]
  },

  plugins: [
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
    ...plugins
  ]
}

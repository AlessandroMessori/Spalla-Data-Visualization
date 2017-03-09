'use strict'

const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
const url = require('url')
const paths = require('./paths')
const getClientEnvironment = require('./env')
const nodeExternals = require('webpack-node-externals')
const path = require('path')
const glob = require('glob')
const baseConfig = require('./webpack.base')

function ensureSlash(path, needsSlash) {
  const hasSlash = path.endsWith('/')
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1)
  } else if (!hasSlash && needsSlash) {
    return path + '/'
  } else {
    return path
  }
}

const homepagePath = require(paths.appPackageJson).homepage
const homepagePathname = homepagePath ? url.parse(homepagePath).pathname : '/'
const publicPath = ensureSlash(homepagePathname, true)
const publicUrl = ensureSlash(homepagePathname, false)
const env = getClientEnvironment(publicUrl)

if (env['process.env'].NODE_ENV !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.')
}


const clientConfig = {
  name: 'client',
  bail: true,
  devtool: 'source-map',
  entry: [
    require.resolve('./polyfills'),
    paths.appIndexJs
  ],
  output: {
    path: paths.appBuild,
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    publicPath: publicPath
  },
  module: {
    loaders: [
      {
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'resolve-url-loader', 'sass-loader?sourceMap'])
      },
    ]
  },
  plugins: [
    new InterpolateHtmlPlugin({PUBLIC_URL: publicUrl}),
    new webpack.DefinePlugin(env),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    new ExtractTextPlugin('static/css/[name].[contenthash:8].css'),
    new ManifestPlugin({
      fileName: 'asset-manifest.json'
    })
  ]
}


const serverConfig = {
  name: 'server',
  bail: true,
  entry: [
    './src/server.js'
  ],
  target: 'node',
  node: {
    __filename: false,
    __dirname: false
  },
  output: {
    path: paths.appBuild,
    filename: 'server.js',
    publicPath: publicPath,
    libraryTarget: 'commonjs2'
  },
  externals: /^[a-z\-0-9]+$/,
  module: {
    loaders: [
      {
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'resolve-url-loader', 'sass-loader?sourceMap'])
      },
    ]
  },

  plugins: [
    new webpack.DefinePlugin(env),
    new webpack.BannerPlugin("const manifest = require('./asset-manifest');", {raw: true, entryOnly: true}),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    new ExtractTextPlugin('static/css/[name].[contenthash:8].css')
  ]
}

module.exports = [merge(baseConfig, clientConfig), merge(baseConfig, serverConfig)]

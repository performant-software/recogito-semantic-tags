const path = require('path');
const fs = require('fs');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const APP_DIR = fs.realpathSync(process.cwd());

const resolveAppPath = relativePath => path.resolve(APP_DIR, relativePath);

module.exports = {
  entry: resolveAppPath('src'),
  output: {
    filename: 'recogito-semantic-tags.min.js',
    library: ['recogito', 'SemanticTags'],
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  performance: {
    hints: false
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat'
    }
  },
  module: {
    rules: [
      { 
        test: /\.(js|jsx)$/, 
        use: { 
          loader: 'babel-loader' ,
          options: {
            "presets": [
              "@babel/preset-env",
              "@babel/preset-react"
            ],
            "plugins": [
              [
                "@babel/plugin-proposal-class-properties"
              ]
            ]
          }
        }
      },
      { test: /\.css$/,  use: [ 'style-loader', 'css-loader'] },
      { test: /\.scss$/, use: [ 'style-loader', 'css-loader', 'sass-loader' ] }
    ]
  },
  devServer: {
    contentBase: resolveAppPath('public'),
    compress: true,
    hot: true,
    host: process.env.HOST || 'localhost',
    port: 3000,
    publicPath: '/',
    proxy: {
      '/viaf': {
        target: 'http://www.viaf.org/',
        secure: false,
        changeOrigin: true
      },
      '/SRU': {
        target: 'https://catalogue.bnf.fr/api/',
        secure: false,
        changeOrigin: true
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin ({
      template: resolveAppPath('public/index.html')
    })
  ]
}
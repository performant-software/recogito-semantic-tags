const path = require('path');
const fs = require('fs');

const HtmlWebpackPlugin = require('html-webpack-plugin');

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
  devtool: 'source-map',
  optimization: {
    minimize: true
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat'
    },
    fallback: {
      'buffer': false,
      'querystring': false
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
    compress: true,
    hot: true,
    host: process.env.HOST || 'localhost',
    port: 3000,
    static: {
      directory: resolveAppPath('public'),
      publicPath: '/'
    },
    proxy: {
      '/viaf': {
        target: 'http://www.viaf.org/',
        secure: false,
        changeOrigin: true
      },
      '/jisc': {
        target: 'https://discover.libraryhub.jisc.ac.uk/',
        pathRewrite: { '^/jisc' : '' },
        secure: true,
        changeOrigin: true
      },
      '/bnf': {
        target: 'https://catalogue.bnf.fr/api/SRU',
        pathRewrite: { '^/bnf' : '' },
        secure: true,
        changeOrigin: true
      },
      '/dpla': {
        target: 'https://api.dp.la/v2/items',
        pathRewrite: { '^/dpla' : '' },
        secure: true,
        changeOrigin: true
      },
    }
  },
  plugins: [
    new HtmlWebpackPlugin ({
      template: resolveAppPath('public/index.html')
    })
  ]
}
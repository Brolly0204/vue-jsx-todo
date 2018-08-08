const path = require('path');
const webpack = require('webpack');
// const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// webpack3
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// webpack4  mini-css-extract-plugin


const isDev = process.env.NODE_ENV === 'development';

function resolve(dir) {
  return path.join(__dirname, dir)
}

const config = {
  entry: './src/index.js',
  output: {
    filename: "[name].[hash:8].js",
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
      // {
      //   test: /\.css$/,
      //   loader: ExtractTextPlugin.extract({
      //     use: ['css-loader', {
      //       loader: 'postcss-loader',
      //       options: {
      //         sourceMap: true
      //       }
      //     }],
      //     fallback: 'vue-style-loader'
      //   })
      // },
      // {
      //   test: /\.styl(us)?$/,
      //   loader: ExtractTextPlugin.extract({
      //     use: ['css-loader', {
      //       loader: 'postcss-loader',
      //       options: {
      //         sourceMap: true
      //       }
      //     }, 'stylus-loader'],
      //     fallback: 'vue-style-loader'
      //   })
      // },
      // {
      //   test: /\.css$/,
      //   use: [
      //     'vue-style-loader',
      //     'css-loader',
      //     {
      //       loader: 'postcss-loader',
      //       options: {
      //         sourceMap: true
      //       }
      //     }
      //   ]
      // },
      // {
      //   test: /\.styl(us)?$/,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     {
      //       loader: 'postcss-loader',
      //       options: {
      //         sourceMap: true
      //       }
      //     },
      //     'stylus-loader'
      //   ]
      // },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024,
              name: '[name]-aaa.[ext]'
            }
          }
        ]
      },
      {
        test: /\.pug$/,
        use: 'pug-plain-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': resolve('src')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin()
  ]
};

if (isDev) {
  config.devtool = '#cheap-module-eval-source-map';
  config.module.rules.push(
    {
      test: /\.css$/,
      use: [
        'vue-style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        }
      ]
    },
    {
      test: /\.styl(us)?$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        'stylus-loader'
      ]
    }
  );
  config.devServer = {
    port: 7002,
    host: '0.0.0.0',
    hot: true,
    compress: true,
    overlay: {
      errors: true
    },
    historyApiFallback: true
  };
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} else {
  config.entry = {
    app: './src/index.js',
    vendor: 'vue'
  };
  config.output.filename = '[name].[chunkhash:8].js';
  config.plugins.push(
    new ExtractTextPlugin("style.[contenthash:8].css"),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest']
    })
  );
  config.module.rules.push(
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        use: ['css-loader', {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        }],
        fallback: 'vue-style-loader'
      })
    },
    {
      test: /\.styl(us)?$/,
      loader: ExtractTextPlugin.extract({
        use: ['css-loader', {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        }, 'stylus-loader'],
        fallback: 'vue-style-loader'
      })
    },
  )
}

module.exports = config;
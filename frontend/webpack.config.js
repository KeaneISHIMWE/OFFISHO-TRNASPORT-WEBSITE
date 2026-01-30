const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config();

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    mode: argv.mode || 'development',
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? 'bundle.[contenthash].js' : 'bundle.js',
      clean: true,
      publicPath: '/',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: false,
              compilerOptions: {
                noEmit: false,
              },
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/logo.png',
        inject: true,
        scriptLoading: 'blocking',
        minify: isProduction ? {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
        } : false,
      }),
      new webpack.DefinePlugin({
        'process.env.REACT_APP_API_URL': JSON.stringify(
          process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
        ),
        'process.env.REACT_APP_HERO_CAR_IMAGE': JSON.stringify(
          process.env.REACT_APP_HERO_CAR_IMAGE || ''
        ),
        // NODE_ENV is automatically set by webpack based on mode, don't override
      }),
    ],
    devServer: {
      port: 3000,
      hot: true,
      liveReload: true,
      historyApiFallback: true,
      open: false,
      compress: false,
      static: {
        directory: path.join(__dirname, 'public'),
        publicPath: '/',
        watch: true,
      },
      client: {
        overlay: {
          errors: true,
          warnings: true,
        },
        logging: 'warn',
        progress: true,
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store',
      },
      devMiddleware: {
        publicPath: '/',
        writeToDisk: false,
        stats: 'minimal',
      },
      onListening: (devServer) => {
        if (!devServer) {
          throw new Error('webpack-dev-server is not defined');
        }
        const port = devServer.server.address().port;
        console.log(`\n✅ Frontend dev server running on http://localhost:${port}\n`);
        console.log(`📦 Bundle.js available at: http://localhost:${port}/bundle.js\n`);
      },
    },
    stats: {
      errorDetails: true,
    },
    performance: {
      hints: isProduction ? 'warning' : false,
      maxEntrypointSize: 1000000, // 1MB
      maxAssetSize: 1000000, // 1MB
    },
  };
};

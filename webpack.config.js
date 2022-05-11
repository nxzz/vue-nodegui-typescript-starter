const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')
const { compilerOptions } = require('@nodegui/vue-nodegui/dist/vueLoader');

module.exports = (env = {}) => ({
  mode: env.prod ? 'production' : 'development',
  devtool: 'inline-source-map',
  entry: path.resolve(__dirname, './src/index.ts'),
  target: 'node',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      vue: path.resolve(__dirname, './node_modules/@nodegui/vue-nodegui/dist'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [{
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        }]
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            compilerOptions,
          },
        },
      },
      {
        test: /\.node$/,
        use: [{ loader: 'node-loader' }, { loader: 'file-loader' }],
      },
      {
        test: /\.(png|jpe?g|gif|svg|bmp)$/i,
        use: [{ loader: 'file-loader' }],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
});

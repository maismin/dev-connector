const path = require('path')

module.exports = () => ({
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
    historyApiFallback: true,
    proxy: {
      context: ['/api', '/profiles/api', '/posts/api'],
      target: 'http://localhost:5000',
    },
  },
  output: {
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
})

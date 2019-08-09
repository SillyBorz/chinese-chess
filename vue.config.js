// vue.config.js
module.exports = {
  // 选项...
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.1.211:8848',
        changeOrigin: true,
        ws: true // proxy websockets
        /* pathRewrite: {
          '^/api': ''
        } */
      }
    }
  }
};

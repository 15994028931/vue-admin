module.exports = {
  devServer: {
    open: false,
    host: "localhost",
    port: 8080,
    https: false,
    hotOnly: false
    /*proxy: {
      '/api': {
        target: 'http://localhost:3000/api',
        ws: true,
        changeOrigin: true,
        pathRewrite:{
          '^/api':''
        }
      }
    }*/
  }
};

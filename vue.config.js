const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  lintOnSave: true,
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
      'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    },
    proxy: 'http://localhost:8201/pjobac/api'
   /*proxy: {
      "/api": {
        target: 'http://localhost:8201/pjobac/api',
        ws: true,
        changeOrigin: true,
        pathRewrite: {'^/api': ''}
      }
    }*/
  }
})

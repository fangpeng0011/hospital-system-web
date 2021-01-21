module.exports =
  {

    '/restful/api':{
      target:'http://localhost:8088',
      changeOrigin:true,
      pathRewrite: {
        '^/restful/api': '/apidata'
      }
    },
  }

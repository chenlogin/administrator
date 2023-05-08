const cors = require('koa2-cors')

const handlerCors = () => {
  return cors({
    origin: function (ctx) {
      const whiteList = ['http://localhost:3001', 'http://saasmanager.net']
      if (!ctx.header.referer) {
        return false
      }
      let url = ctx.header.referer.substring(0, ctx.header.referer.length - 1)
      if (ctx.url.indexOf('/api') > -1 && whiteList.includes(url)) {
        return url
      }
      return 'http://saasmanager.net'
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'x-show-msg'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With', 'Access-Control-Allow-Origin-Type'],
  })
}

module.exports = handlerCors

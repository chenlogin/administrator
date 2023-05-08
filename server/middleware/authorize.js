const { ssoLogin } = require('../sso')

const authorize = async (ctx, next) => {
  const host = ctx.header.host
  const sso = ssoLogin(`http://${host}/api/login`)
  //'/api/login'直接调用接口,其他情况，先登录判断
  if (ctx.url && ctx.url.includes('/api/login')) {
    return await next()
  }
  //先判断cookie是否存在
  //若存在则已登陆，直接调用接口
  //不存在，则返回401错误码，前端跳转sso登录
  const cookie = ctx.cookies.get('SaasManager')
  if (!cookie) {
    // ctx.status = 900
    // ctx.redirect(sso) // 后端302会出现跨域
    // 接口返回401错误码，axios中拦截reponse，统一处理跳转
    ctx.type = 'application/json'
    ctx.status = 401
    ctx.body = {
      success: false,
      code: 401,
      message: '请使用域账号登录',
      url: sso,
    }
    return null
  }
  await next()
}

module.exports = authorize

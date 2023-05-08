/**
 * 遵循模块化思想，业务逻辑不在 router 中处理
 * 将路由的回调函数单独抽离在controllers文件中
 *
 * controllers 中只做业务处理，对于数据库的操作放在services文件中
 */

const services = require('./services')
const axios = require('axios')
const { ssoValidate } = require('./sso')

const getCurrentUser = ctx => {
  return ctx.cookies.get('SaasManager')
}

const login = async (ctx, next) => {
  const userName = getCurrentUser(ctx)
  const host = ctx.header.host
  const ticket = ctx.query['ticket']

  if (userName) {
    ctx.result = `已登录: ${userName}`

    return await next()
  } else if (!ticket) {
    ctx.status = 412
    ctx.result = '未获取到ticket参数,请先登录sso获取凭证'

    return await next()
  }

  const sso = ssoValidate(`http://${host}/api/login`, ticket)
  //const response = await axios.get(sso)
  if (sso.status == '200') {
    const enName = sso.data
    const millisecond = new Date().getTime()
    const expires = new Date(millisecond + 60 * 1000 * 60 * 24 * 3)
    ctx.cookies.set('SaasManager', enName, {
      httpOnly: true, //不允许js获取cookie
      expires,
    })
    ctx.status = 302
    ctx.redirect(host.includes('localhost') ? 'http://localhost:3001' : 'http://saasmanager.net/')
  }
  await next()
}

const getDevelopersInfo = async (ctx, next) => {
  const result = await services.getJsonData()
  result.userName = getCurrentUser(ctx)
  ctx.result = result

  await next()
}

const setDeveloper = async (ctx, next) => {
  let { componentName } = ctx.request.body
  let result = await services.setDeveloper(componentName, getCurrentUser(ctx))
  ctx.result = result

  await next()
}

const addComponent = async (ctx, next) => {
  let { componentName, componentDesc } = ctx.request.body
  let result = await services.addComponent(componentName, componentDesc)
  ctx.result = result

  await next()
}

const editComponent = async (ctx, next) => {
  let data = ctx.request.body
  let result = await services.editComponent(data)
  ctx.result = result

  await next()
}

const delComponent = async (ctx, next) => {
  let { developerName, componentName } = ctx.query
  let result = await services.deleteComponent(developerName, componentName)

  ctx.result = result
  await await next()
}

module.exports = {
  login,
  getDevelopersInfo,
  setDeveloper,
  addComponent,
  editComponent,
  delComponent,
}

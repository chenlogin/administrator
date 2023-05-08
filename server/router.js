/**
 * router.js
 * 路由回调函数单独抽出,不在router中操作业务逻辑，方便维护
 *
 * login, 登录
 * getDevelopersInfo，获取开发信息
 * setDeveloper，设置开发者
 * addComponent，添加、编辑组件信息
 * delComponent，删除组件
 */
const Router = require('koa-router')
const router = new Router()
const controllers = require('./controllers')

router
  .get('/', async (ctx, next) => {
    ctx.result = 'hello world'
    await next()
  })
  .get('/api/login', controllers.login)
  .get('/api/getDevelopersInfo', controllers.getDevelopersInfo)
  .post('/api/setDeveloper', controllers.setDeveloper)
  .post('/api/addComponent', controllers.addComponent)
  .post('/api/editComponent', controllers.editComponent)
  .get('/api/delComponent', controllers.delComponent)

module.exports = router

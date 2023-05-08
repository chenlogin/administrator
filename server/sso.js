/**
 * 单点登录
 * ssoLogin，ssoValidate传入url必须一致
 * 详细过程查看readme
 */
//const loginUrl = 'http://saasmanagerserver.net/api/login'
const loginUrl = 'http://localhost:3010/api/login'
const ssoLogin = backup => {
  let url = backup ? backup : loginUrl
  //return `https://sso.xx.com/cas/login?service=${encodeURIComponent(url)}`
  return `http://localhost:3001/#/login?service=${encodeURIComponent(url)}`
}

const ssoValidate = (backup, ticket) => {
  //let url = backup ? backup : loginUrl
  //return `https://sso.xx.com/cas/validate?service=${encodeURIComponent(url)}&ticket=${ticket}`
  return { status: 200, data: 'name.a' }
}

module.exports = {
  ssoLogin,
  ssoValidate,
}

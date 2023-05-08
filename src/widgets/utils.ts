/**
 * 开发人员列表
 * maintainer，创建组件，领取任务，编辑组件，删除组件
 * developer，创建组件，领取任务，编辑自己负责的组件组件
 * guest，查看
 */
const list = {
  'name.a': { name: '同学A', role: 'maintainer' },
  'name.b': { name: '同学B', role: 'developer' },
  'name.c': { name: '同学C', role: 'developer' },
  'name.d': { name: '同学D', role: 'developer' },
  'name.e': { name: '同学D', role: 'guest' },
}
export const getUserChName = (enName: string) => {
  return list[enName as keyof typeof list] ? list[enName as keyof typeof list] : { name: enName, role: 'guest' }
}
export const getUserEnName = (chName: string) => {
  let enName = ''
  for (const key in list) {
    if (list[key as keyof typeof list].name == chName) {
      enName = key
      break
    }
  }
  return enName
}

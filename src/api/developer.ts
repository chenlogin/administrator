/**
 * 接口封装
 */
import { get, post } from '../widgets/request'
import { developerInfo, componentTable } from '@/pages/home/model/index'
import { getUserEnName } from '@/widgets/utils'

const URL = {
  getDevelopersInfo: '/api/getDevelopersInfo',
  setDeveloper: '/api/setDeveloper',
  addComponent: '/api/addComponent',
  editComponent: '/api/editComponent',
  delComponent: '/api/delComponent',
}

export const getDevelopersInfo = async () => {
  const res = (await get({
    url: URL.getDevelopersInfo,
  })) as { code: number; data: developerInfo }

  if (res.code === 200) {
    return res.data
  }
}

export const setDeveloper = async (componentName: string) => {
  const res = await post({
    url: URL.setDeveloper,
    data: { componentName },
  })

  return res
}

export const addComponent = async (componentName: string, componentDesc: string) => {
  const res = await post({
    url: URL.addComponent,
    data: { componentName, componentDesc },
  })

  return res
}

export const editComponent = async (item: componentTable) => {
  const res = await post({
    url: URL.editComponent,
    data: {
      developerName: getUserEnName(item.developerName as string),
      componentName: item.componentName,
      componentDesc: item.componentDesc,
      componentstatus: item.componentstatus,
      componentDocument: item.componentDocument,
    },
  })

  return res
}

export const delComponent = async (item: componentTable) => {
  const res = await get({
    url: URL.delComponent,
    params: { developerName: getUserEnName(item.developerName as string), componentName: item.componentName },
  })

  return res
}

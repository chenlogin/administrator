export interface GuiderItem {
  name: string
  style: string
  detail: Array<{ title: string; link: string; value: Array<string> }>
  icon: string
}

export interface ProjectItem {
  name: string
  desc: string
  link: string
}
export interface componentTable {
  developerName?: string
  componentName: string
  componentDesc: string
  componentstatus: string
  componentDocument?: string
}

export interface developerInfo {
  developer: Array<{
    developerName: string
    components: Array<componentTable>
  }>
  todoList: Array<componentTable>
  userName: string
}

/**
 * 获取本地数据
 */

function getJsonData() {
  return new Promise(function (resolve) {
    import('./db/index.mjs').then(async res => {
      const db = res.default
      // Read data from JSON file
      await db.read()
      // If index.json doesn't exist, db.data will be null
      if (!db.data) {
        const defaultData = require('./db/default.json')
        db.data ||= defaultData // For Node >= 15.x
        // Finally write db.data content to file
        await db.write()
      }
      resolve(db.data)
    })
  })
}

function setDeveloper(componentName, developerName) {
  return new Promise(function (resolve) {
    import('./db/index.mjs').then(async res => {
      const db = res.default
      let isNewDeveloper = true
      let desc = ''
      await db.read()
      if (db.data) {
        let { developer, todoList } = db.data
        for (let i = 0; i < todoList.length; i++) {
          if (todoList[i].componentName == componentName) {
            todoList[i].componentstatus = 'doing'
            todoList[i].developerName = developerName
            desc = todoList[i].componentDesc
            break
          }
        }
        for (let i = 0; i < developer.length; i++) {
          if (developer[i].developerName == developerName) {
            developer[i].components.push({
              componentName,
              componentDesc: desc,
              componentstatus: 'doing',
              componentDocument: '',
            })
            isNewDeveloper = false
            break
          }
        }
        if (isNewDeveloper) {
          developer.push({
            developerName,
            components: [
              {
                componentName,
                componentDesc: desc,
                componentstatus: 'doing',
                componentDocument: '',
              },
            ],
          })
        }
        await db.write()
        resolve(true)
      }
      resolve(false)
    })
  })
}

function addComponent(componentName, componentDesc) {
  return new Promise(function (resolve) {
    import('./db/index.mjs').then(async res => {
      const db = res.default
      await db.read()
      if (db.data) {
        let { todoList } = db.data
        todoList.push({
          componentName,
          componentDesc,
          componentstatus: 'todo',
          developerName: '-',
        })
        await db.write()
        resolve(true)
      }
      resolve(false)
    })
  })
}

function editComponent(data) {
  return new Promise(function (resolve) {
    import('./db/index.mjs').then(async res => {
      const db = res.default
      let isNewDeveloper = true
      let isNewComponent = true
      await db.read()
      if (db.data) {
        let { developer, todoList } = db.data
        //处理 todolist
        for (let i = 0; i < todoList.length; i++) {
          if (todoList[i].componentName == data.componentName) {
            if (data.componentstatus != 'done') {
              todoList[i].componentName = data.componentName
              todoList[i].componentDesc = data.componentDesc
              todoList[i].componentstatus = data.componentstatus
              todoList[i].developerName = data.developerName
            } else {
              todoList.splice(i, 1)
            }
            isNewComponent = false
            break
          }
        }
        if (isNewComponent && data.componentstatus != 'done') {
          todoList.push({
            componentName: data.componentName,
            componentDesc: data.componentDesc,
            componentstatus: data.componentstatus,
            developerName: data.developerName,
          })
        }
        //处理 developer
        isNewComponent = true
        for (let i = 0; i < developer.length; i++) {
          if (developer[i].developerName == data.developerName) {
            for (let j = 0; j < developer[i].components.length; j++) {
              if (developer[i].components[j].componentName == data.componentName) {
                developer[i].components[j].componentName = data.componentName
                developer[i].components[j].componentDesc = data.componentDesc
                developer[i].components[j].componentstatus = data.componentstatus
                developer[i].components[j].componentDocument = data.componentDocument

                isNewComponent = false
                break
              }
            }
            if (isNewComponent) {
              developer[i].components.push({
                componentName: data.componentName,
                componentDesc: data.componentDesc,
                componentstatus: data.componentstatus,
                componentDocument: data.componentDocument,
              })
            }
            isNewDeveloper = false
            break
          }
        }
        if (isNewDeveloper) {
          developer.push({
            developerName: data.developerName,
            components: [
              {
                componentName: data.componentName,
                componentDesc: data.componentDesc,
                componentstatus: data.componentstatus,
                componentDocument: data.componentDocument,
              },
            ],
          })
        }
        await db.write()
        resolve(true)
      }
      resolve(false)
    })
  })
}

function deleteComponent(developerName, componentName) {
  return new Promise(function (resolve) {
    import('./db/index.mjs').then(async res => {
      const db = res.default
      await db.read()
      if (db.data) {
        let { developer, todoList } = db.data
        for (let i = 0; i < todoList.length; i++) {
          if (todoList[i].componentName == componentName) {
            todoList.splice(i, 1)
            break
          }
        }
        for (let i = 0; i < developer.length; i++) {
          if (developer[i].developerName == developerName) {
            for (let j = 0; j < developer[i].components.length; j++) {
              if (developer[i].components[j].componentName == componentName) {
                developer[i].components.splice(j, 1)
                break
              }
            }
            if (developer[i].components.length == 0) {
              developer.splice(i, 1)
            }
            break
          }
        }
        await db.write()
        resolve(true)
      }
      resolve(false)
    })
  })
}

module.exports = {
  getJsonData,
  setDeveloper,
  addComponent,
  editComponent,
  deleteComponent,
}

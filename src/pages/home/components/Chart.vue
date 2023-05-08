<template>
  <div id="chartDom"></div>
  <el-table :data="todoListTable.rows">
    <el-table-column prop="componentName" label="组件名称" width="160" />
    <el-table-column prop="componentDesc" label="功能说明" width="320" />
    <el-table-column prop="developerName" label="维护人" align="center" width="90" />
    <el-table-column label="任务状态" align="center" width="105">
      <template #default="scope">
        <el-button v-if="scope.row.componentstatus == 'todo'" link type="primary" @click="claimAlert(scope.row)">
          领取
        </el-button>
        <el-button v-if="scope.row.componentstatus == 'doing'" text type="info" disabled>开发中</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="more-components">
    <el-button v-if="nameCh.role != 'guest'" type="primary" @click="addAlert">创建组件任务</el-button>
    <el-button type="secondary" @click="showAllComponents">查看全部组件</el-button>
  </div>
  <el-drawer
    v-model="allComponentsDrawer"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    :show-close="false"
    :lock-scroll="true"
    size="90%">
    <template #header="{ close }">
      <h4>组件信息</h4>
      <el-select v-model="temporaryTaskItem.componentstatus" placeholder="请选择" @change="onFilterDeveloperChange">
        <el-option
          v-for="item in filterDeveloper.names"
          :key="item.value"
          :label="item.label"
          :value="item.value"></el-option>
      </el-select>
      <el-button type="primary" style="margin-left: 20px" @click="close">关闭</el-button>
    </template>
    <el-table :data="allComponentsTable.rows">
      <el-table-column prop="componentName" label="组件名称" width="160" />
      <el-table-column prop="componentDesc" label="功能说明" />
      <el-table-column prop="developerName" label="维护人" align="center" width="90" />
      <el-table-column label="操作" align="center" width="215">
        <template #default="scope">
          <el-button v-if="scope.row.componentstatus == 'todo'" link type="primary" @click="claimAlert(scope.row)">
            领取
          </el-button>
          <el-button v-if="scope.row.componentstatus == 'doing'" text type="info" disabled>开发中</el-button>
          <el-button v-if="scope.row.componentstatus == 'done'" link type="primary" @click="openDocument(scope.row)">
            文档
          </el-button>
          <el-button
            v-if="
              scope.row.componentstatus != 'todo' &&
              (nameCh.role == 'maintainer' || scope.row.developerName == nameCh.name)
            "
            link
            type="primary"
            @click="editAlert(scope.row)"
            >编辑</el-button
          >
          <el-button v-if="nameCh.role == 'maintainer'" link type="primary" @click="delAlert(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-drawer>
  <el-dialog v-model="claimModalVisible">
    确认领取该组件？
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetTask">取消</el-button>
        <el-button type="primary" @click="claimTask">确认领取</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="editModalVisible" title="编辑组件信息" :show-close="false">
    <el-input v-model="temporaryTaskItem.componentName" placeholder="请输入姓名"></el-input>
    <el-divider style="margin: 24px 0" border-style="dashed" />
    <el-input v-model="temporaryTaskItem.componentDesc" type="textarea" placeholder="请输入功能说明"></el-input>
    <el-divider style="margin: 24px 0" border-style="dashed" />
    <el-select v-model="temporaryTaskItem.componentstatus" placeholder="请选择" @change="onComponentStatusChange">
      <el-option
        v-for="item in componentStatusOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"></el-option>
    </el-select>
    <el-divider style="margin: 24px 0" border-style="dashed" />
    <el-input v-model="temporaryTaskItem.componentDocument" placeholder="请输入文档地址"></el-input>
    <el-divider style="margin: 24px 0" border-style="dashed" />
    <p v-if="nameCh.role == 'maintainer'">
      <el-input v-model="temporaryTaskItem.developerName" placeholder="请输入维护人"></el-input>
    </p>
    <p v-else>
      <el-input v-model="temporaryTaskItem.developerName" placeholder="请输入维护人" disabled></el-input>
    </p>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetTask">取消</el-button>
        <el-button type="primary" @click="editTask">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="addComponentModalVisible" title="创建组件任务" :show-close="false">
    <el-input v-model="temporaryTaskItem.componentName" size="large" placeholder="请输入组件名称" />
    <el-divider style="margin: 24px 0" border-style="dashed" />
    <el-input v-model="temporaryTaskItem.componentDesc" type="textarea" placeholder="请输入功能说明" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetTask">取消</el-button>
        <el-button type="primary" @click="addTask">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="delModalVisible">
    确认删除组件？
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetTask">取消</el-button>
        <el-button type="primary" @click="deleteTask">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="authorityModalVisible">
    请联系维护人员，添加开发白名单
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="authorityModalVisible = false">知道了</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { nextTick, ref, reactive } from 'vue'
import * as echarts from 'echarts'
import { getDevelopersInfo, setDeveloper, addComponent, editComponent, delComponent } from '@/api/developer'
import { componentTable, developerInfo } from '../model/index'
import { storeToRefs } from 'pinia'
import { userInfoStore } from '@/store/index'
import { getUserChName } from '@/widgets/utils'

const userInfo = userInfoStore()
const { nameEn, nameCh } = storeToRefs(userInfo)
const todoListTable = reactive({
  rows: [] as Array<componentTable>,
})
const allComponentsTable = reactive({
  rows: [] as Array<componentTable>,
})
const claimModalVisible = ref(false)
const editModalVisible = ref(false)
const delModalVisible = ref(false)
const addComponentModalVisible = ref(false)
const allComponentsDrawer = ref(false)
const authorityModalVisible = ref(false)
const temporaryTaskItem = reactive({
  developerName: '',
  componentName: '',
  componentDesc: '',
  componentstatus: '',
  componentDocument: '',
})
const componentStatusOptions = [
  {
    value: 'todo',
    label: '待开始',
  },
  {
    value: 'doing',
    label: '进行中',
  },
  {
    value: 'done',
    label: '已完成',
  },
]
const filterDeveloper = reactive({
  names: [] as Array<{ label: string; value: string }>,
})
let currentComponent = {} as componentTable

const claimAlert = (item: componentTable) => {
  if (nameCh.value.role == 'guest') {
    authorityModalVisible.value = true
    return
  }
  currentComponent = item
  claimModalVisible.value = true
}
const editAlert = (item: componentTable) => {
  temporaryTaskItem.developerName = item.developerName as string
  temporaryTaskItem.componentName = item.componentName
  temporaryTaskItem.componentDesc = item.componentDesc
  temporaryTaskItem.componentstatus = item.componentstatus
  temporaryTaskItem.componentDocument = item.componentDocument as string

  editModalVisible.value = true
}
const onComponentStatusChange = (value: string) => {
  temporaryTaskItem.componentstatus = value
}
const onFilterDeveloperChange = (value: string) => {
  resetHomeTable(value)
}
const delAlert = (item: componentTable) => {
  currentComponent = item
  delModalVisible.value = true
}
const addAlert = () => {
  addComponentModalVisible.value = true
}
const claimTask = async () => {
  await setDeveloper(currentComponent.componentName)
  await resetHomeTable()
  resetTask()
}
const editTask = async () => {
  await editComponent(temporaryTaskItem)
  await resetHomeTable()
  resetTask()
}
const resetTask = () => {
  claimModalVisible.value = false
  editModalVisible.value = false
  addComponentModalVisible.value = false
  delModalVisible.value = false

  temporaryTaskItem.developerName = ''
  temporaryTaskItem.componentName = ''
  temporaryTaskItem.componentDesc = ''
  temporaryTaskItem.componentstatus = ''
  temporaryTaskItem.componentDocument = ''
}
const deleteTask = async () => {
  await delComponent(currentComponent)
  await resetHomeTable()
  resetTask()
}
const addTask = async () => {
  await addComponent(temporaryTaskItem.componentName, temporaryTaskItem.componentDesc)
  await resetHomeTable()
  resetTask()
}
const showAllComponents = () => {
  allComponentsDrawer.value = true
}
const resetHomeTable = async (filterDeveloperName?: string) => {
  const DevelopersData = (await getDevelopersInfo().catch(e => {
    console.error('getDevelopersInfo 接口异常', e)
  })) as developerInfo
  type EChartsOption = echarts.EChartsOption
  const chartDom = document.getElementById('chartDom') as HTMLElement
  const myChart = echarts.init(chartDom)
  let option: EChartsOption
  let xdata = []
  let ydata = []
  let todoListTableRows = []
  let allComponentsTableRows = []
  let name = [
    {
      value: '',
      label: '全部',
    },
  ]
  for (let i = 0; i < DevelopersData.todoList.length; i++) {
    let item = DevelopersData.todoList[i]
    todoListTableRows.push({
      developerName: getUserChName(item.developerName as string).name,
      componentName: item.componentName,
      componentDesc: item.componentDesc,
      componentstatus: item.componentstatus,
    })
    if (item.componentstatus == 'todo' && !filterDeveloperName) {
      //todolist展示在前面
      allComponentsTableRows.push(item)
    }
  }
  for (let i = 0; i < DevelopersData.developer.length; i++) {
    let item = DevelopersData.developer[i]
    xdata.push(getUserChName(item.developerName).name)
    ydata.push(item.components.length)
    name.push({
      value: item.developerName,
      label: getUserChName(item.developerName).name,
    })
    for (let j = 0; j < item.components.length; j++) {
      if (!filterDeveloperName || (filterDeveloperName && item.developerName == filterDeveloperName)) {
        allComponentsTableRows.push({
          developerName: getUserChName(item.developerName).name,
          componentName: item.components[j].componentName,
          componentDesc: item.components[j].componentDesc,
          componentstatus: item.components[j].componentstatus,
          componentDocument: item.components[j].componentDocument,
        })
      }
    }
  }
  option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      top: '5%',
      left: '0',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: xdata,
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        minInterval: 1,
        min: 0,
      },
    ],
    color: ['#78D3F8'],
    series: [
      {
        name: '完成组件',
        type: 'bar',
        barWidth: '60%',
        data: ydata,
      },
    ],
  }
  myChart.setOption(option)
  nameEn.value = DevelopersData.userName
  todoListTable.rows = todoListTableRows
  allComponentsTable.rows = allComponentsTableRows as Array<componentTable>
  filterDeveloper.names = name
}
const openDocument = (item: componentTable) => {
  window.open(item.document)
}

nextTick(async () => {
  await resetHomeTable()
})
</script>

<style lang="scss" scoped>
#chartDom {
  width: 100%;
  height: 240px;
}
.more-components {
  float: right;
  margin-top: 20px;
}
</style>

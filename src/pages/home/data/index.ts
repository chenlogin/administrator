export const beginner = [
  {
    name: '代码规范',
    style: 'blue',
    detail: [
      {
        title: '命名规范',
        link: '',
        value: [
          '1. node层文件名使用中划线分割命名 hello-world.ts，render层使用驼峰命名testVue.ts',
          '2. 文件夹名：驼峰',
          '3. 文件名: 驼峰(components下组件使用帕斯卡命名)',
          '4. 属性、方法、实例等用驼峰命名 lowerCamelCase',
          '5. 类、接口、枚举等用帕斯卡命名 UpperCamelCase',
          '6. 常量、枚举值等采用全大写 CONST_VAR',
          '7. css建议使用BEM命名规范，模块名 + 元素名 + 修饰器名，block-name__element-name--modifier-name',
        ],
      },
    ],
    icon: 'code',
  },
  {
    name: '提交规范',
    style: 'green',
    detail: [
      {
        title: '提交规范',
        link: '',
        value: [
          'feat:     新功能',
          'fix:      修复Bug',
          'docs:     文档变更',
          'style:    代码格式（不影响代码运行的变动',
          'refactor: 重构(既不是增加feature),也不是修复bug',
          'pref:     性能优化',
          'test:     增加测试',
          'chore:    构建过程或辅助工具的变动',
          'revert:   回退',
          'build:    打包',
        ],
      },
    ],
    icon: 'commit',
  },
  {
    name: '分支规范',
    style: 'yellow',
    detail: [
      {
        title: '分支规范',
        link: '',
        value: [
          '1、环境分支: test,staging,master(release,staging,master)',
          '2、master(release): 永远是可用的稳定版本，不能直接在该分支上开发，功能分支永远从此分支拉取',
          '3、功能分支:',
          'feature/[开发时间_功能模块名]，功能开发分支',
          'feature/[开发时间_功能模块名_fix]，功能上线后bug修复',
          'hotfix/[修复时间_修复问题]，紧急bug修改分支',
          'issue/[开发时间_issueId]，问题修改分支',
        ],
      },
    ],
    icon: 'branch',
  },
  {
    name: '打点规范',
    style: 'red',
    detail: [
      {
        title: '打点规范',
        link: '',
        value: [
          'ERROR 级别表示一个必须处理的严重问题。它指定了可能仍然允许应用程序继续运行的错误事件。',
          'INFO 这个日志级别记录了一个已经发生的事件。这些警报通常可以被忽略，假设系统的其他部分继续正常运行。它基本上表明了信息性的消息，在一个细微的层面上突出了应用程序的进展。',
          'DEBUG 日志级别包含的信息只在调试阶段有用，在生产阶段可能没有什么价值。它们基本上是信息性事件，在调试应用程序时最有用。',
          'WARN 日志级别比错误情况略低，因为它们表示潜在的有害情况。该信息表明在一个应用程序中发生了一个意外事件，可能会扰乱或延迟其他进程。',
          'FATAL 这个日志级别表示非常严重的错误事件，估计会导致应用程序中止。',
          '格式：{"level":"error","message":"Error message","timestamp":"2022-09-20T11:39:33.953Z"}',
        ],
      },
    ],
    icon: 'sendlog',
  },
]

export const quickEntry = [
  {
    name: 'UI组件库',
    style: 'right',
    detail: [
      {
        title: 'UI组件库',
        link: 'https://element-plus.gitee.io/zh-CN/',
        value: [],
      },
    ],
    icon: 'zujian',
  },
  {
    name: 'PC客户端',
    style: 'right',
    detail: [
      {
        title: '机房考试、一教一学客户端下载',
        link: '',
        value: [],
      },
    ],
    icon: 'client',
  },
  {
    name: '业务工具库',
    style: 'right',
    detail: [
      {
        title: '业务工具库',
        link: '',
        value: [],
      },
    ],
    icon: 'tools',
  },
  {
    name: '富文本编辑器',
    style: 'right',
    detail: [
      {
        title: '富文本编辑器',
        link: '',
        value: ['更新中，敬请期待'],
      },
    ],
    icon: 'editor',
  },
  {
    name: '作业',
    style: 'right',
    detail: [
      {
        title: '作业',
        link: '',
        value: ['更新中，敬请期待'],
      },
    ],
    icon: 'zuoye',
  },
  {
    name: '资源平台',
    style: 'right',
    detail: [
      {
        title: '资源平台',
        link: '',
        value: [],
      },
    ],
    icon: 'ziyuan',
  },
  {
    name: '题库',
    style: 'right',
    detail: [
      {
        title: '题库',
        link: '',
        value: [],
      },
    ],
    icon: 'kaoyue',
  },
  {
    name: '质量分析',
    style: 'right',
    detail: [
      {
        title: '质量分析',
        link: '',
        value: ['更新中，敬请期待'],
      },
    ],
    icon: 'zhiliang',
  },
]

export const projectInfo = [
  {
    name: '项目A',
    desc: '描述文案',
    link: '',
  },
  {
    name: '项目B',
    desc: '校级教务系统',
    link: '',
  },
  {
    name: '项目C',
    desc: '描述文案',
    link: '',
  },
  {
    name: '项目D',
    desc: '描述文案',
    link: '',
  },
  {
    name: '项目E',
    desc: '描述文案',
    link: '',
  },
  {
    name: '项目F',
    desc: '描述文案',
    link: '',
  },
  {
    name: '项目G',
    desc: '描述文案',
    link: '',
  },
  {
    name: '项目H',
    desc: '描述文案',
    link: '',
  },
  {
    name: '项目I',
    desc: '描述文案',
    link: '',
  },
]

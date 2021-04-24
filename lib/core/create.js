// 创建项目命令的封装
const program = require('commander')
const {
  createProjectAction,
  addComponentAction,
  addPageAndRoute,
  addStoreAction
} = require('./actions')

const createCommands = () => {
  // 创建项目指令
  program
    // 设置终端命令
    .command('create <project> [others...]')
    // 设置描述
    .description('clone a repository into a folder')
    // 执行相关操作
    .action(createProjectAction)

  // 创建组件指令
  program
    .command('addcpn <name>')
    .description('add vue component, e.g.Thriven addcpn HelloWorld [-d src/components]')
    .action((name) => {
      // 终端中输入的dest会添加到program里
      addComponentAction(name, program.dest || 'src/components')
    })

  // 创建页面指令  
  program
    .command('addpage <page>')
    .description('add vue page and router config, e.g.Thriven addpage Home [-d src/pages]')
    .action((page) => {
      // 终端中输入的dest会添加到program里
      addPageAndRoute(page, program.dest || 'src/pages')
    })

  program
    .command('addstore <store>')
    .description('add vue page and router config, e.g.Thriven addpage Home [-d src/pages]')
    .action((store) => {
      // 终端中输入的dest会添加到program里
      addStoreAction(store, program.dest || 'src/store/modules')
    })
}
module.exports = createCommands
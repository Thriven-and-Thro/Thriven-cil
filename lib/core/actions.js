// 封装 create.js 里的 action
// 使用node里自带的模块 util 里的 promisify方法 将其转成promise
const { promisify } = require('util')
// 导入download-git-repo
const download = promisify(require('download-git-repo'))
// 导入浏览器打开模块
const open = require('open')
const path = require('path')

// 导入地址的封装
const { vueRepo } = require('../config/repo-config')
// 导入执行终端命令的封装
const { commandSpawn } = require('../utils/terminal')
const { compile, writeToFile, creatDirSync } = require('../utils/utils')

const createProjectAction = async (project) => {
  console.log('Thriven is creating project...');
  // 1.clone项目
  await download(vueRepo, project, { clone: true })
  // 不同平台执行的主体不一样
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  // 2.执行npm install：传递三个参数，固定
  await commandSpawn(command, ['install'], { cwd: `./${project}` })
  // 3.运行npm run serve 
  commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` })
  // 4.打开浏览器
  open("http://localhost:8080/")
}

// 添加组件的action
const addComponentAction = async (name, dest) => {
  // 1.编译模板（通过封装的profile）
  const result = await compile("vue-component.ejs", { name, lowerName: name.toLowerCase() })
  // 2.将result写入到.vue文件（通过封装的writeToFile）
  const targetPath = path.resolve(dest, `${name}.vue`)
  writeToFile(targetPath, result)
}

// 添加组件和路由的action
const addPageAndRoute = async (name, dest) => {
  const data = { name, lowerName: name.toLowerCase() }
  const pageResult = await compile("vue-component.ejs", data)
  const routeResult = await compile("vue-router.ejs", data)

  // 递归创建文件夹后执行操作
  const targetDest = path.resolve(dest, name)
  if (creatDirSync(targetDest)) {
    const targetPagePath = path.resolve(targetDest, `${name}.vue`)
    const targetRoutePath = path.resolve(targetDest, 'router,js')
    writeToFile(targetPagePath, pageResult)
    writeToFile(targetRoutePath, routeResult)
  }
}

// 添加Vuex的action
const addStoreAction = async (name, dest) => {
  const storeResult = await compile("vue-store.ejs", {})
  const typesResult = await compile("vue-types.ejs", {})
  const targetDest = path.resolve(dest, name)
  if (creatDirSync(targetDest)) {
    const targetPagePath = path.resolve(targetDest, `${name}.js`)
    const targetRoutePath = path.resolve(targetDest, 'types.js')
    writeToFile(targetPagePath, storeResult)
    writeToFile(targetRoutePath, typesResult)
  }
}

module.exports = {
  createProjectAction,
  addComponentAction,
  addPageAndRoute,
  addStoreAction
}
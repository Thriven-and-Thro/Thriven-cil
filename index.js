#!/usr/bin/env node
// 添加指令：寻找环境变量

// 使用第三方工具
const program = require('commander')
// 导入帮助和可选信息
const helpOprions = require('./lib/core/help')
// 导入创建项目命令
const createCommands = require('./lib/core/create')

// 获得版本号
program.version(require('./package.json').version)

helpOprions()
createCommands()


// 解析终端命令：应放在所有命令的最下方
program.parse(process.argv)
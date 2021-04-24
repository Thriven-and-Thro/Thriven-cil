// 封装执行终端命令的代码
// 导入开启子线程的模块
const { spawn } = require('child_process')

// 该对象接受三个参数：运行的主体，运行代码，其他属性
const commandSpawn = (...args) => {
  return new Promise((resolve, reject) => {
    // 开启一个进程，返回进程对象
    const childProcess = spawn(...args)
    // 将执行过程中的安装信息显示通过调用 pipe 方法传到全局的安装信息显示
    childProcess.stdout.pipe(process.stdout)
    // ...错误信息...
    childProcess.stderr.pipe(process.stderr)
    // 监听子线程关闭返回一个promise对象
    childProcess.on("close", () => {
      resolve()
    })
  })
}
module.exports = {
  commandSpawn
}
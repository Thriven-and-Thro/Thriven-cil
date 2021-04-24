// 编译模板
// 导入ejs
const ejs = require('ejs')
const path = require('path')
const fs = require('fs')

// 拼接路径
const compile = (templateName, data) => {
  const templatePosition = `../templates/${templateName}`
  const templatePath = path.resolve(__dirname, templatePosition)

  return new Promise((resolve, rejects) => {
    // 使用ejs读取模板文件
    ejs.renderFile(templatePath, { data }, {}, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
        return
      }
      resolve(result)
    })
  })
}

// 递归创建文件夹
const creatDirSync = (pathName) => {
  if (fs.existsSync(pathName)) {
    return true
  } else {
    if (creatDirSync(path.dirname(pathName))) {
      fs.mkdirSync(pathName)
      return true
    }
  }
}

// 写入文件封装
const writeToFile = (path, content) => {
  return fs.promises.writeFile(path, content)
}

module.exports = {
  compile,
  writeToFile,
  creatDirSync
}
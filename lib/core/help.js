// 其他选项、修改帮助选项的封装
const program = require('commander')

const helpOprions = () => {
  // 添加options：其他选项
  program.option('-th --thriven', 'a Thriven cli')
  program.option('-d --dext <dest>', 'a destination folder, e.g. -d /src/components')
  program.option('-f --framework <framework>', 'your framework')

  // 添加帮助
  program.on('--help', function () {
    console.log('');
    console.log('Other:');
    console.log('  other options~');
  })
}

module.exports = helpOprions
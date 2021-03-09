module.exports = {
  webpackBarName: 'vue-admin-beautiful',
  webpackBanner:
    ' build: vue-admin-beautiful \n copyright: chuzhixin 1204505056@qq.com \n time: ',
  donationConsole() {
    const chalk = require('chalk')
    console.log(
      chalk.green(
        `> 欢迎使用vue-admin-beautiful（开源地址：https://github.com/chuzhixin/vue-admin-beautiful）`
      )
    )
    console.log(
      chalk.green(
        `> vue2.x演示地址（保留MIT协议免费商用）（http://chu1204505056.gitee.io/vue-admin-beautiful-element）`
      )
    )
    console.log(
      chalk.green(
        `> vue3.X版演示地址（保留MIT协议免费商用）（http://chu1204505056.gitee.io/vue-admin-beautiful-antdv）`
      )
    )
    console.log(
      chalk.green(
        `> pro版演示地址（付费版本）（http://chu1204505056.gitee.io/vue-admin-beautiful-pro）`
      )
    )
    console.log(
      chalk.green(
        `> 使用中出现任何问题可加QQ群反馈（群号：972435319，1139183756）获取文档`
      )
    )
    console.log(chalk.green(`> 如果您不希望显示以上信息，可在设置中配置关闭`))
    console.log('\n')
  },
}

import Vue from 'vue'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
//自定义全局样式
import '@/styles/vxeTable-variables.scss'

VXETable.setup({
  size: 'small',
  zIndex: 1000,
  table: {
    border: true,
  },
  icon: {
    // modal
    MODAL_ZOOM_IN: 'iconfont iconquanping',
    MODAL_ZOOM_OUT: 'iconfont iconsuofang',
  },
})

Vue.use(VXETable)

// 给 vue 实例挂载内部对象，例如：
Vue.prototype.$XModal = VXETable.modal
Vue.prototype.$XPrint = VXETable.print
Vue.prototype.$XSaveFile = VXETable.saveFile
Vue.prototype.$XReadFile = VXETable.readFile

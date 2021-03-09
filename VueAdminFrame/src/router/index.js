/**
 * @copyright chuzhixin 1204505056@qq.com
 * @description router全局配置，如有必要可分文件抽离
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layouts'
import EmptyLayout from '@/layouts/EmptyLayout'
import { publicPath, routerMode } from '@/config'

Vue.use(VueRouter)

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true,
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/401'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true,
  },
]

/*当settings.js里authentication配置的是intelligence时，views引入交给前端配置*/
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/index/index'),
        meta: {
          title: '项目概括',
          icon: 'home',
          affix: true,
          noKeepAlive: true,
        },
      },
    ],
  },
  {
    path: '/laborManagement',
    component: Layout,
    redirect: 'noRedirect',
    name: 'LaborManagement',
    // alwaysShow: true,
    meta: {
      title: '劳务管理',
      icon: 'balance-scale',
      permissions: [
        'BIMPlatform.Attendance.Manage',
        'BIMPlatform.Attendance.Leave.Default',
        'BIMPlatform.Attendance.SheWolf.Manage',
      ],
    },
    children: [
      {
        path: 'attendance',
        name: 'Attendance',
        component: () => import('@/views/laborManagement/attendance'),
        meta: {
          title: '考勤管理',
          permissions: ['BIMPlatform.Attendance.Manage'],
        },
      },
      {
        path: 'left',
        name: 'Left',
        component: () => import('@/views/laborManagement/left'),
        meta: {
          title: '请假管理',
          permissions: ['BIMPlatform.Attendance.Leave.Default'],
        },
      },
      {
        path: 'realName',
        name: 'RealName',
        component: () => import('@/views/laborManagement/realName'),
        meta: {
          title: '实名制管理',
          permissions: ['BIMPlatform.Attendance.SheWolf.Manage'],
        },
      },
    ],
  },
  {
    path: '/equipmentManagement',
    component: Layout,
    redirect: 'noRedirect',
    name: 'EquipmentManagement',
    // alwaysShow: true,
    meta: {
      title: '设备管理',
      icon: 'diagnoses',
      permissions: ['BIMPlatform.Equipment.Manage'],
    },
    children: [
      {
        path: 'video',
        name: 'Video',
        component: () => import('@/views/equipmentManagement/video'),
        meta: {
          title: '视频监控',
          permissions: ['BIMPlatform.Equipment.Video.Default'],
        },
      },
      {
        path: 'environment',
        name: 'Environment',
        component: () => import('@/views/equipmentManagement/environment'),
        meta: {
          title: '环境监控',
          permissions: ['BIMPlatform.Equipment.Environment.Default'],
        },
      },
      {
        path: 'car',
        name: 'Car',
        component: () => import('@/views/equipmentManagement/car'),
        meta: {
          title: '车辆监控',
          permissions: ['BIMPlatform.Equipment.Car.Default'],
        },
      },
      {
        path: 'towerCrane',
        name: 'TowerCrane',
        component: () => import('@/views/equipmentManagement/towerCrane'),
        meta: {
          title: '吊塔监控',
          permissions: ['BIMPlatform.Equipment.TowerCrane.Default'],
        },
      },
      {
        path: 'weighBridge',
        name: 'WeighBridge',
        component: () => import('@/views/equipmentManagement/weighBridge'),
        meta: {
          title: '地磅检测',
          permissions: ['BIMPlatform.Equipment.Loadometer.Default'],
        },
      },
      {
        path: 'elevator',
        name: 'Elevator',
        component: () => import('@/views/equipmentManagement/elevator'),
        meta: {
          title: '升降机监控',
          permissions: ['BIMPlatform.Equipment.Elevator.Default'],
        },
      },
      {
        path: 'highModulus',
        name: 'HighModulus',
        component: () => import('@/views/equipmentManagement/highModulus'),
        meta: {
          title: '高支模检测',
          permissions: ['BIMPlatform.Equipment.HighModulus.Default'],
        },
      },
      {
        path: 'deepExcavation',
        name: 'DeepExcavation',
        component: () => import('@/views/equipmentManagement/deepExcavation'),
        meta: {
          title: '深基坑检测',
          permissions: ['BIMPlatform.Equipment.DeepExcavation.Default'],
        },
      },
    ],
  },
  {
    path: '/workOrderManagement',
    component: Layout,
    redirect: 'noRedirect',
    name: 'WorkOrderManagement',
    // alwaysShow: true,
    meta: {
      title: '工单管理',
      icon: 'file-signature',
      permissions: [
        'BIMPlatform.QualityIssue.Manage',
        'BIMPlatform.SafetyIssue.Manage',
        'BIMPlatform.SupervisorLog.Manage',
      ],
    },
    children: [
      {
        path: 'supervisionLog',
        name: 'SupervisionLog',
        component: () => import('@/views/workOrderManagement/supervisionLog'),
        meta: {
          title: '工程监理报告',
          permissions: ['BIMPlatform.SupervisorLog.Manage'],
        },
      },
      {
        path: 'materials',
        name: 'Materials',
        component: () => import('@/views/workOrderManagement/materials'),
        meta: {
          title: '建材质量管理',
          permissions: [],
        },
      },
      {
        path: 'hse',
        name: 'HSE',
        component: () => import('@/views/workOrderManagement/hse'),
        meta: {
          title: '工程安全问题',
          permissions: ['BIMPlatform.SafetyIssue.Manage'],
        },
      },
      {
        path: 'quality',
        name: 'Quality',
        component: () => import('@/views/workOrderManagement/quality'),
        meta: {
          title: '工程质量问题',
          permissions: ['BIMPlatform.QualityIssue.Manage'],
        },
      },
      {
        path: 'qualityDetection',
        name: 'QualityDetection',
        component: () => import('@/views/workOrderManagement/qualityDetection'),
        meta: {
          title: '工程质量检测管理',
          permissions: [],
        },
      },
      {
        path: 'qualityCheck',
        name: 'QualityCheck',
        component: () => import('@/views/workOrderManagement/qualityCheck'),
        meta: {
          title: '工程质量验收管理',
          permissions: [],
        },
      },
    ],
  },
  {
    path: '/productionManagement',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ProductionManagement',
    alwaysShow: true,
    meta: {
      title: '生产力管理',
      icon: 'id-card',
      permissions: ['BIMPlatform.EfficiencyAnalysis.Manage'],
    },
    children: [
      {
        path: 'efficiencyAnalysis',
        name: 'EfficiencyAnalysis',
        component: () =>
          import('@/views/productionManagement/efficiencyAnalysis'),
        meta: {
          title: '工效管理',
          permissions: ['BIMPlatform.EfficiencyAnalysis.Default'],
        },
      },
    ],
  },
  {
    path: '/bimManagement',
    component: Layout,
    redirect: '/bimManagement/index',
    children: [
      {
        path: '/bimManagement/index',
        name: 'BimManagement',
        component: () => import('@/views/bimManagement/index'),
        meta: {
          title: 'BIM管理',
          icon: 'hockey-puck',
          permissions: ['BIMPlatform'],
        },
      },
    ],
  },
  {
    path: '/salaryAccountManagement',
    component: Layout,
    redirect: '/salaryAccountManagement/index',
    children: [
      {
        path: '/salaryAccountManagement/index',
        name: 'SalaryAccountManagement',
        component: () => import('@/views/salaryAccountManagement/index'),
        meta: {
          title: '工资专用账户管理',
          icon: 'landmark',
          permissions: ['BIMPlatform'],
        },
      },
    ],
  },
  {
    path: '/knowledgeLibrary',
    component: Layout,
    redirect: 'noRedirect',
    name: 'KnowledgeLibrary',
    // alwaysShow: true,
    meta: {
      title: '知识库',
      icon: 'space-shuttle',
      permissions: ['BIMPlatform.KnowledgeBase.Manage'],
    },
    children: [
      {
        path: 'addressList',
        name: 'AddressList',
        component: () => import('@/views/knowledgeLibrary/addressList'),
        meta: {
          title: '通讯录',
          permissions: ['BIMPlatform'],
        },
      },
      {
        path: 'qA',
        name: 'QA',
        component: () => import('@/views/knowledgeLibrary/qA'),
        meta: {
          title: '常见问题',
          permissions: ['BIMPlatform.KnowledgeBase.QA.Default'],
        },
      },
      {
        path: 'regulation',
        name: 'Regulation',
        component: () => import('@/views/knowledgeLibrary/regulation'),
        meta: {
          title: '管理办法',
          permissions: ['BIMPlatform.KnowledgeBase.Regulation.Default'],
        },
      },
    ],
  },
  {
    path: '/docManagement',
    component: Layout,
    redirect: '/docManagement/index',
    children: [
      {
        path: '/docManagement/index',
        name: 'DocManagement',
        component: () => import('@/views/docManagement/index'),
        meta: {
          title: '文档管理',
          icon: 'scroll',
          permissions: ['BIMPlatform.Document.Manage'],
        },
      },
    ],
  },
  {
    path: '/companySetup',
    component: Layout,
    redirect: 'noRedirect',
    name: 'CompanySetup',
    // alwaysShow: true,
    meta: {
      title: '公司设置',
      icon: 'monument',
      permissions: ['AbpTenantManagement.Tenants.ManageFeatures'],
    },
    children: [
      {
        path: 'groupView',
        name: 'GroupView',
        component: () => import('@/views/companySetup/groupView'),
        meta: {
          title: '组织管理',
          permissions: ['BIMPlatform'],
        },
      },
      {
        path: 'companyMembers',
        name: 'CompanyMembers',
        component: () => import('@/views/companySetup/companyMembers'),
        meta: {
          title: '公司成员',
          permissions: ['BIMPlatform'],
        },
      },
      {
        path: 'companyRole',
        name: 'CompanyRole',
        component: () => import('@/views/companySetup/companyRole'),
        meta: {
          title: '公司角色',
          permissions: ['BIMPlatform'],
        },
      },
      {
        path: 'companyManage',
        name: 'CompanyManage',
        component: () => import('@/views/companySetup/companyManage'),
        meta: {
          title: '管理公司',
          permissions: ['AbpTenantManagement.Tenants.ManageFeatures'],
        },
      },
      {
        path: 'allAccounts',
        name: 'AllAccounts',
        component: () => import('@/views/companySetup/allAccounts'),
        meta: {
          title: '所有账户',
          permissions: ['AbpTenantManagement.Tenants.ManageFeatures'],
        },
      },
    ],
  },
  {
    path: '/projectSetup',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ProjectSetup',
    // alwaysShow: true,
    meta: {
      title: '项目设置',
      icon: 'handshake',
      permissions: ['BIMPlatform.Project.Delete', 'BIMPlatform.Project.Manage'],
    },
    children: [
      {
        path: 'projectManage',
        name: 'ProjectManage',
        component: () => import('@/views/projectSetup/projectManage'),
        meta: {
          title: '项目管理',
          permissions: ['BIMPlatform.Project.Manage'],
        },
      },
      {
        path: 'projectMembers',
        name: 'ProjectMembers',
        component: () => import('@/views/projectSetup/projectMembers'),
        meta: {
          title: '项目成员',
          permissions: ['BIMPlatform.Project.Manage'],
        },
      },
      {
        path: 'projectRole',
        name: 'ProjectRole',
        component: () => import('@/views/projectSetup/projectRole'),
        meta: {
          title: '项目角色',
          permissions: ['BIMPlatform.Project.Manage'],
        },
      },
    ],
  },

  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
]

const router = new VueRouter({
  base: routerMode === 'history' ? publicPath : '',
  mode: routerMode,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRoutes,
})
//注释的地方是允许路由重复点击，如果你觉得框架路由跳转规范太过严格可选择放开
/* const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
}; */

export function resetRouter() {
  router.matcher = new VueRouter({
    base: routerMode === 'history' ? publicPath : '',
    mode: routerMode,
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes,
  }).matcher
}

export default router

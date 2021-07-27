/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description 登录、获取用户信息、退出登录、清除accessToken逻辑，不建议修改
 */

import Vue from 'vue'
import { getUserInfo, login, logout, switchTenant } from '@/api/user'
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from '@/utils/accessToken'
import { resetRouter } from '@/router'
import { title, tokenName } from '@/config'

const state = {
  accessToken: getAccessToken(),
  username: '',
  avatar: '',
  permissions: [],
  tenantId: '',
  tenantName: '上海比程',
}
const getters = {
  accessToken: (state) => state.accessToken,
  username: (state) => state.username,
  avatar: (state) => state.avatar,
  permissions: (state) => state.permissions,
  tenantId: (state) => state.tenantId,
}
const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken
    setAccessToken(accessToken)
  },
  setUsername(state, username) {
    state.username = username
  },
  setAvatar(state, avatar) {
    state.avatar = avatar
  },
  setPermissions(state, permissions) {
    state.permissions = permissions
  },
  setTenant(state, response) {
    state.tenantId = response.tenantId
    state.tenantName = response.name
  },
}
const actions = {
  setPermissions({ commit }, permissions) {
    commit('setPermissions', permissions)
  },
  async login({ commit }, userInfo) {
    const data = await login(userInfo)
    const accessToken = data.access_token
    if (accessToken) {
      commit('setAccessToken', accessToken)
      const hour = new Date().getHours()
      const thisTime =
        hour < 8
          ? '早上好'
          : hour <= 11
          ? '上午好'
          : hour <= 13
          ? '中午好'
          : hour < 18
          ? '下午好'
          : '晚上好'
      Vue.prototype.$baseNotify(`欢迎登录${title}`, `${thisTime}！`)
    } else {
      Vue.prototype.$baseMessage(
        `登录接口异常，未正确返回${tokenName}...`,
        'error'
      )
    }
  },
  async getUserInfo({ commit, state }) {
    const data = await getUserInfo()
    if (!data) {
      Vue.prototype.$baseMessage('验证失败，请重新登录...', 'error')
      return false
    }
    let { auth, currentUser, currentTenant } = data
    let permissions = []
    let avatar = 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif'
    for (var role in auth.grantedPolicies) {
      permissions.push(role)
    }
    if (permissions && currentUser.userName) {
      commit('setPermissions', permissions)
      commit('setUsername', currentUser.userName)
      commit('setAvatar', avatar)
      return permissions
    } else {
      Vue.prototype.$baseMessage('用户信息接口异常', 'error')
      return false
    }
  },
  async logout({ dispatch }) {
    await logout(state.accessToken)
    await dispatch('resetAccessToken')
    await resetRouter()
  },
  resetAccessToken({ commit }) {
    commit('setPermissions', [])
    commit('setAccessToken', '')
    removeAccessToken()
  },
  async switchTenant({ commit }, data) {
    var response = await switchTenant(data)
    if (response.tenantId) {
      commit('setTenant', response)
      Vue.prototype.$baseNotify(`验证成功，请登录！`, '租户验证')
    } else {
      Vue.prototype.$baseNotify(`该租户未注册！`, '租户验证', 'error')
    }
  },
}
export default { state, getters, mutations, actions }

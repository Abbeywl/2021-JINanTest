import request from '@/utils/request'
import { encryptedData } from '@/utils/encrypt'
import { loginRSA, tokenName, contentFormType } from '@/config'

export async function login(data) {
  if (loginRSA) {
    data = await encryptedData(data)
  }
  return request({
    url: '/connect/token',
    method: 'post',
    headers: {
      'Content-Type': contentFormType,
    },
    data,
  })
}

export function getUserInfo() {
  return request({
    url: '/api/abp/application-configuration',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post',
  })
}

export function register() {
  return request({
    url: '/register',
    method: 'post',
  })
}

export function switchTenant(params) {
  return request({
    url: '/api/abp/multi-tenancy/tenants/by-name/' + params,
    method: 'get',
  })
}

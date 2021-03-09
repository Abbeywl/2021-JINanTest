import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/GetOrganization/getList',
    method: 'get',
    params,
  })
}

export function doEdit(data) {
  return request({
    url: '/GetOrganization/doEdit',
    method: 'post',
    data,
  })
}

export function doDelete(data) {
  return request({
    url: '/GetOrganization/doDelete',
    method: 'post',
    data,
  })
}

export function getMenuTemplates() {
  return request({
    url: '/GetOrganization/GetMenuTemplates',
    method: 'get',
  })
}

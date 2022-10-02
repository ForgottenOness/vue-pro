import request from '@/service'

// 管理员登录的post接口
export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

// 获取管理员列表
export function getManagerList() {
  return request({
    url: '/admin/list',
    method: 'get'
  })
}

// 删除管理员操作
export function deleteManager(data) {
  return request({
    url: '/admin/delete',
    method: 'post',
    data
  })
}

// 删除管理员操作
export function addManagerAdd(data) {
  return request({
    url: '/admin/add',
    method: 'post',
    data
  })
}

// 更新管理员信息
export function updateManagerupdate(data) {
  return request({
    url: '/admin/update',
    method: 'post',
    data
  })
}

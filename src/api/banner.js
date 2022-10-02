import request from '@/service'
// 请求轮播图
export function getBannerList() {
  return request({
    url: '/banner/list',
    method: 'get'
  })
}

// 删除轮播操作
export function deleteBannerList(data) {
  return request({
    url: '/banner/delete',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 添加轮播图
export function addBanner(data) {
  return request({
    url: '/banner/add',
    method: 'post',
    data
  })
}

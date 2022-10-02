import request from '@/service'
// 获取商品列表
export function getProList(data) {
  return request({
    url: '/pro/list',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 修改商品是否推荐或者秒杀
export function updateProductionFlag(data) {
  return request({
    url: '/pro/updateFlag',
    method: 'post',
    data
  })
}

// 获取秒杀或者推荐的列表
export function showdata(data) {
  return request({
    url: '/pro/showdata',
    method: 'post',
    data
  })
}

// 获取所有商品的分类
export function getCategoryAll() {
  return request({
    url: '/pro/getCategory',
    method: 'get'
  })
}

// 筛选商品
export function getCategoryOne(data) {
  return request({
    url: 'pro/searchPro',
    method: 'post',
    data
  })
}

import request from '@/service'
// 获取图表数据
export function getEchartsData() {
  return request({
    url: '/data/simpleData',
    method: 'get'
  })
}

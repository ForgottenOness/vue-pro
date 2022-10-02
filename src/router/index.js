import { ElMessage } from 'element-plus'
import { createRouter, createWebHashHistory } from 'vue-router'

export const routes = [
  {
    label: '首页',
    path: '/',
    name: 'home',
    component: () => import('@/views/homeView.vue'),
    children: [
      {
        label: '轮播图管理',
        path: 'banner',
        name: 'banner',
        component: () => import('@/views/banner/bannerIndexView.vue'),
        children: [
          {
            label: '轮播图管理列表',
            path: 'bannerlist',
            name: 'bannerlist',
            component: () => import('@/views/banner/bannerListView.vue')
          },
          {
            label: '添加轮播图',
            path: 'banneradd',
            name: 'banneradd',
            component: () => import('@/views/banner/bannerAddView.vue')
          }
        ]
      },
      {
        label: '用户管理',
        path: 'manager',
        name: 'manager',
        component: () => import('@/views/manager/managerIndexView.vue'),
        children: [
          {
            label: '管理员列表',
            path: 'managerlist',
            name: 'managerlist',
            component: () => import('@/views/manager/managerListView.vue')
          }
        ]
      },
      {
        path: 'production',
        name: 'production',
        label: '产品管理',
        component: () => import('@/views/production/productionIndexView.vue'),
        children: [
          {
            path: 'productionlist',
            name: 'productionlist',
            label: '产品列表',
            component: () => import('@/views/production/productionListView.vue')
          },
          {
            path: 'secskilllist',
            name: 'secskilllist',
            label: '秒杀列表',
            component: () => import('@/views/production/productionSecView.vue')
          },
          {
            path: 'recommendlist',
            name: 'recommendlist',
            label: '推荐列表',
            component: () => import('@/views/production/productionRecView.vue')
          },
          {
            path: 'categorylist',
            name: 'categorylist',
            label: '筛选列表',
            component: () =>
              import('@/views/production/productionCategoryListView.vue')
          }
        ]
      },
      {
        label: '地图管理',
        path: 'map',
        name: 'map',
        component: () => import('@/views/Map/MapIndexView.vue'),
        children: [
          {
            label: '地图',
            path: 'maplist',
            name: 'maplist',
            component: () => import('@/views/Map/MapListView.vue')
          }
        ]
      },
      {
        label: '图表管理',
        path: 'echarts',
        name: 'echarts',
        component: () => import('@/views/Echarts/EchartsIndexView.vue'),
        children: [
          {
            label: '图表',
            path: 'echartslist',
            name: 'echartslist',
            component: () => import('@/views/Echarts/EchartsListView.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    label: '登录',
    component: () => import('@/views/loginView.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 添加全局路由守卫拦截
const isLogin = () => {
  return !!localStorage.getItem('token')
}
// 如果用户登录，在访问的时候返回首页
router.beforeEach((to) => {
  if (to.name === 'login') {
    if (isLogin()) {
      ElMessage('登录状态有效，不用重复登录')
      return { name: 'home' }
    }
  } else if (to.name === 'home') {
    // 清空token之后，需要返回登录页面
    if (!isLogin()) {
      return { name: 'login' }
    }
  }
})
export default router

<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item
      v-for="item in crumbList"
      :key="item.name"
      :to="{ name: item.name }"
      >{{ item.label }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>

<script>
import { defineComponent } from 'vue'
import { routes } from '@/router/index.js'
import { mapMutations } from 'vuex'
export default defineComponent({
  data() {
    this.routesMap = new Map() //初始化key-value的map
    this.initRouteMap(routes)
    return {
      crumbList: []
    }
  },
  methods: {
    ...mapMutations(['updateCurrentPath']),
    initRouteMap(routes) {
      routes.forEach((route) => {
        this.routesMap.set(route.name, route.label)
        if (route.children) {
          this.initRouteMap(route.children)
        }
      })
      //   console.log('this.routeMap.......', this.routesMap)
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        // console.log('route数据.....', route)
        this.updateCurrentPath(route.path)
        this.crumbList = route.matched.map((item) => {
          return {
            name: item.name,
            label: this.routesMap.get(item.name)
          }
        })
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  margin-bottom: 10px;
}
</style>

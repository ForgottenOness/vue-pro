<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#2d3436"
    :default-active="currentPath"
    text-color="#fff"
    :collapse="isCollapse"
    router
  >
    <el-menu-item index="/">
      <el-icon><icon-menu /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-sub-menu
      v-for="item in userInfo.checkedkeys"
      :key="item.path"
      :index="'/' + item.path"
    >
      <template #title>
        <el-icon><location /></el-icon>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item
        :key="child.path"
        v-for="child in item.children"
        :index="`/${item.path}/${child.path}`"
        >{{ child.label }}</el-menu-item
      >
    </el-sub-menu>
  </el-menu>
</template>

<script>
// 添加router设置，添加之后就可以用index来进行跳转
import { defineComponent } from 'vue'
import { Location, Menu as IconMenu } from '@element-plus/icons-vue'
import { mapState } from 'vuex'
export default defineComponent({
  computed: {
    ...mapState(['userInfo', 'currentPath'])
  },
  components: {
    Location,
    IconMenu
  },
  props: {
    isCollapse: {
      type: Boolean,
      required: true
    }
  }
})
</script>

<style lang="scss">
.el-menu {
  border-right: none;
}
</style>

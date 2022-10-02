<template>
  <el-container>
    <el-aside width="200px">
      <div class="aside-logo">
        <img style="width: 32px; height: 32px" :src="imgUrl" alt="" />
        <h2 v-show="!flag">嗨购管理系统</h2>
      </div>
      <MenuComp :isCollapse="flag"></MenuComp>
    </el-aside>
    <el-container>
      <el-header>
        <el-icon @click="flag = !flag" :size="30">
          <component :is="flag ? 'Expand' : 'Fold'"></component>
        </el-icon>
        <div class="avator">
          <el-space>
            <span style="margin-right: 16px"
              >欢迎您： {{ userInfo.adminname }}</span
            >
            <el-dropdown>
              <el-avatar :size="30" :src="circleUrl" />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="$router.push('/set')"
                    >设置</el-dropdown-item
                  >
                  <el-dropdown-item @click="handlerLoginOut"
                    >退出</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-space>
        </div>
      </el-header>
      <el-main>
        <BreadcrumbCom />
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { defineComponent } from 'vue'
import { Expand, Fold } from '@element-plus/icons-vue'
import MenuComp from '../components/MenuComp.vue'
import imgUrl from '@/assets/logo.jpeg'
import { mapMutations, mapState } from 'vuex'
import BreadcrumbCom from '../components/BreadcrumbCom.vue'
export default defineComponent({
  components: {
    Expand,
    Fold,
    MenuComp,
    BreadcrumbCom
  },
  data() {
    return {
      flag: false,
      imgUrl,
      circleUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  },
  computed: {
    ...mapState(['userInfo']),
    asideWidth() {
      return !this.flag ? '200px' : '64px'
    }
  },
  methods: {
    ...mapMutations(['updateUserInfo']),
    handlerLoginOut() {
      localStorage.removeItem('token')
      this.updateUserInfo({})
      this.$router.push({ name: 'login' })
    }
  }
})
</script>

<style lang="scss">
.el-container {
  height: 100%;
  background-color: #dfe6e9;
  .el-aside {
    width: v-bind(asideWidth);
    background-color: #2d3436;
    transition: 0.25s;
    .aside-logo {
      display: flex;
      width: 100%;
      height: 60px;
      align-items: center;
      padding: 0 20px;
      img {
        margin-right: 10px;
        border-radius: 50%;
      }
      h2 {
        color: #fff;
        font-size: 20px;
        white-space: nowrap;
      }
    }
  }
  .el-header {
    background-color: #7f8fa6;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>

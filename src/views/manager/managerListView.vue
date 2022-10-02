<template>
  <div class="managerlist-container">
    <div class="header">
      <el-button @click="clearManager" type="primary">
        添加管理员 <el-icon class="el-icon--right"><Plus /></el-icon>
      </el-button>
    </div>
    <el-table
      :data="computedTableDate"
      style="width: 100%"
      :header-cell-style="headerCellStyle"
      :cell-style="{ textAlign: 'center' }"
      max-height="440"
    >
      <el-table-column type="index" label="序号" width="180" />
      <el-table-column prop="adminname" label="账户" />
      <el-table-column prop="role" label="权限">
        <template #default="scoped">
          <el-tag :type="scoped.row.role === 2 ? 'success' : ''">{{
            scoped.row.role === 2 ? '超级管理员' : '管理员'
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button size="small" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 此处是分页器 -->
    <el-pagination
      background
      layout="total,prev, pager, next"
      :total="tableData.length"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
    />
    <!-- 右侧抽屉 -->
    <el-drawer
      v-model="showDrawer"
      :title="interfaceType === 1 ? '请添加管理员' : '请编辑管理员'"
    >
      <template #default>
        <el-form label-width="80px" :model="formData" style="max-width: 460px">
          <el-form-item label="账户">
            <el-input v-model="formData.adminname" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="formData.password" />
          </el-form-item>
          <el-form-item label="角色">
            <el-select
              v-model="formData.role"
              class="m-2"
              placeholder="请选择角色"
            >
              <el-option label="管理员" value="1"></el-option>
              <el-option label="超级管理员" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="权限">
            <el-tree
              ref="treeRef"
              :data="menus"
              show-checkbox
              node-key="path"
              default-expand-all
              :default-checked-keys="defaultCheckedKeys"
            />
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button
            v-if="interfaceType === 1"
            type="primary"
            @click="confirmClick"
            >添加</el-button
          >
          <el-button v-else type="primary" @click="updateClick">更新</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import {
  getManagerList,
  deleteManager,
  addManagerAdd,
  updateManagerupdate
} from '../../api/user.js'
import { Plus } from '@element-plus/icons-vue'
import { routes } from '@/router/index.js'
import { mapState } from 'vuex'
import _ from 'lodash'
export default defineComponent({
  data() {
    return {
      interfaceType: 1,
      defaultCheckedKeys: [], //默认选中的keys
      menus: routes[0].children,
      formData: {
        adminname: '',
        password: '',
        role: '1',
        checkedKeys: []
      },
      showDrawer: false,
      currentPage: 1,
      pageSize: 12,
      tableData: [],
      headerCellStyle: {
        color: 'rgba(0,0,0,0.85)',
        fontWeight: '700',
        fontSize: '14px',
        textAlign: 'center',
        background: '#f8f8f8',
        height: '60px',
        borderRight: '1px solid #f0f0f0',
        transition: 'background .3s ease'
      }
    }
  },
  components: {
    Plus
  },
  created() {
    this.initMenus()
    this.getTableList()
  },
  methods: {
    cancelClick() {
      console.log('取消了')
    },
    // 打开管理员增加界面，清空内容
    clearManager() {
      this.formData = {
        adminname: '',
        password: '',
        role: '1',
        checkedKeys: []
      }
      this.interfaceType = 1
      this.showDrawer = true
      this.$refs.treeRef?.setCheckedNodes([])
    },
    // 添加管理员方法
    addManager() {
      addManagerAdd(this.formData).then((res) => {
        console.log(res)
        this.currentPage = 1
        this.getTableList()
        this.showDrawer = false
      })
    },
    confirmClick() {
      this.setCheckedkeys()
      this.addManager()
    },
    setCheckedkeys() {
      let list = this.$refs.treeRef.getCheckedNodes(true)
      console.log(list)
      const tempList = []
      const result = []
      list.forEach((item) => {
        let parent = this.menus.find((mitem) => {
          return mitem.children.some((child) => child.label === item.label)
        })
        if (!tempList.includes(parent.label)) {
          tempList.push(parent.label)
          result.push({
            label: parent.label,
            path: parent.path,
            children: [item]
          })
        } else {
          result.find((item) => item.label === parent.label).children.push(item)
        }
      })
      this.formData.checkedKeys = result
    },
    // 更新用户信息
    updateClick() {
      this.setCheckedkeys()
      updateManagerupdate(this.formData).then(() => {
        this.getTableList()
        this.showDrawer = false
        // 如果修改的用户信息时，需要实时更改数据
        if (this.formData.adminname === this.userInfo.adminname) {
          this.userInfo.checkedkeys = this.formData.checkedKeys
        }
      })
    },
    handleEdit(row) {
      console.log(row.checkedKeys)
      this.showDrawer = true
      this.interfaceType = 2
      this.formData = {
        adminname: row.adminname,
        password: row.password,
        role: row.role.toString()
      }
      // 设置默认的tree选中
      const checkedKeys = []
      row.checkedKeys.forEach((parent) => {
        parent.children.forEach((child) => {
          checkedKeys.push(child.path)
        })
      })
      this.defaultCheckedKeys = checkedKeys
      if (this.$refs.treeRef) {
        // 后续每次点击编辑按钮的时候，重置为之前的样子
        this.$refs.treeRef.setCheckedNodes(checkedKeys)
      }
    },
    // 删除管理员
    handleDelete(row) {
      if (row.adminname === 'zfy') {
        alert('瞎删什么，有人在用不知道吗？')
        return
      }
      deleteManager({ adminid: row.adminid }).then((res) => {
        console.log(res)
        this.currentPage = 1 //删除后返回到第一页
        this.getTableList() //重新请求后台管理员列表数据进行展示
      })
    },
    getTableList() {
      getManagerList().then((res) => {
        console.log(res)
        this.tableData = res.data || []
      })
    },
    initMenus() {
      const cloneRoutes = _.cloneDeep(this.menus)
      cloneRoutes[0].children.pop()
      this.menus = cloneRoutes
    }
  },
  computed: {
    ...mapState(['userInfo']),
    computedTableDate() {
      return this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        (this.currentPage - 1) * this.pageSize + this.pageSize
      )
    }
  }
})
</script>

<style lang="scss">
.managerlist-container {
  height: 100%;
  background: #fff;
  padding: 24px;
}
.el-pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
.header {
  margin-bottom: 20px;
}
</style>

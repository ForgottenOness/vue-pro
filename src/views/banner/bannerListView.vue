<template>
  <div class="bannerlist-container">
    <div class="header">
      <el-button @click="$router.push({ name: 'banneradd' })" type="primary">
        添加轮播图<el-icon class="el-icon--right"><Plus /></el-icon>
      </el-button>
    </div>
    <el-table
      :header-cell-style="headerCellStyle"
      :cell-style="{ textAlign: 'center' }"
      :data="computedTableDate"
      style="width: 100%"
      max-height="440"
    >
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column prop="img" label="图片">
        <template #default="scope">
          <el-image :src="scope.row.img"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="link" label="链接" />
      <el-table-column prop="alt" label="提示" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row.bannerid)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      background
      layout="total,prev, pager, next"
      :total="tableData.length"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { getBannerList, deleteBannerList } from '@/api/banner.js'
import { Plus } from '@element-plus/icons-vue'
export default defineComponent({
  components: {
    Plus
  },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 6,
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
  methods: {
    getBannerListData() {
      getBannerList().then((res) => {
        console.log(res)
        this.tableData = res.data
      })
    },
    handleDelete(bannerid) {
      deleteBannerList({ bannerid }).then(() => {
        this.getBannerListData()
        console.log('删除成功')
      })
    }
  },
  computed: {
    computedTableDate() {
      return this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        (this.currentPage - 1) * this.pageSize + this.pageSize
      )
    }
  },
  created() {
    this.getBannerListData()
  }
})
</script>

<style lang="scss">
.bannerlist-container {
  height: 100%;
  padding: 24px;
  background: #fff;
}
.el-pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
}
.header {
  margin-bottom: 20px;
}
</style>

<template>
  <div class="search-content">
    <el-space :size="16">
      <el-select
        v-model="initial"
        class="m-2"
        placeholder="Select"
        size="small"
      >
        <el-option label="全部" value=""></el-option>
        <el-option
          v-for="item in categoryAll"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-input
        placeholder="请输入搜索的内容..."
        v-model="categoryContent"
      ></el-input>
      <el-button type="success" @click="getCategory">筛选</el-button>
    </el-space>
  </div>
  <div class="production-container">
    <el-table
      :data="computedTableDate"
      style="width: 100%"
      :header-cell-style="headerCellStyle"
      :cell-style="{ textAlign: 'center' }"
      max-height="440"
    >
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column label="图片">
        <template #default="scope">
          <el-image
            :src="scope.row.img1"
            preview-teleported
            :preview-src-list="[
              scope.row.img1,
              scope.row.img2,
              scope.row.img3,
              scope.row.img4
            ]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="proname" label="名称"></el-table-column>
      <el-table-column prop="brand" label="品牌"></el-table-column>
      <el-table-column
        prop="category"
        :filters="filters"
        :filter-method="filterHandler"
        label="分类"
      ></el-table-column>
      <el-table-column
        prop="originprice"
        sortable
        label="原价"
      ></el-table-column>
      <el-table-column prop="discount" sortable label="折扣"></el-table-column>
      <el-table-column prop="sales" sortable label="销量"></el-table-column>
      <el-table-column prop="issale" label="是否售卖">
        <template #default="scope">
          <el-switch
            v-model="scope.row.issale"
            :active-value="1"
            :inactive-value="0"
            :disabled="disabled"
            @change="changeSwitch(scope.row.proid, 'issale', scope.row.issale)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="isseckill" label="是否秒杀">
        <template #default="scope">
          <el-switch
            v-model="scope.row.isseckill"
            :active-value="1"
            :inactive-value="0"
            :disabled="disabled"
            @change="
              changeSwitch(scope.row.proid, 'isseckill', scope.row.isseckill)
            "
          />
        </template>
      </el-table-column>
      <el-table-column prop="isrecommend" label="是否推荐">
        <template #default="scope">
          <el-switch
            v-model="scope.row.isrecommend"
            :active-value="1"
            :inactive-value="0"
            :disabled="disabled"
            @change="
              changeSwitch(
                scope.row.proid,
                'isrecommend',
                scope.row.isrecommend
              )
            "
          />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-popconfirm
            title="确认要删除吗?"
            @confirm="handleDelete(scope.row.proid)"
          >
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
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
      @current-change="changeCurrent"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import {
  getProList,
  updateProductionFlag,
  getCategoryAll,
  getCategoryOne
} from '@/api/production'
export default defineComponent({
  data() {
    return {
      categoryAll: [], //select下拉框
      categoryContent: '', //筛选的初始内容
      initial: '', //筛选商品的初始内容
      total: 1,
      value1: true,
      currentPage: 1,
      disabled: false,
      pageSize: 10,
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
  computed: {
    filters() {
      let arr = this.tableData.map((item) => item.category)
      arr = [...new Set(arr)]
      return arr.map((item) => {
        return {
          text: item,
          value: item
        }
      })
    },
    computedTableDate() {
      return this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        (this.currentPage - 1) * this.pageSize + this.pageSize
      )
    }
  },
  methods: {
    getCategory() {
      getCategoryOne({
        category: this.initial,
        search: this.categoryContent
      }).then((res) => {
        console.log(res.data)
        this.tableData = res.data
      })
    },
    handleDelete(proid) {
      console.log(proid)
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    getProListData() {
      getProList({
        count: this.currentPage,
        limitNum: this.pageSize
      }).then((res) => {
        console.log(res)
        this.tableData = res.data
      })
    },
    changeCurrent() {
      this.getProListData()
    },
    changeSwitch(proid, type, flag) {
      this.disabled = true
      updateProductionFlag({
        proid,
        type,
        flag: !!flag
      }).then(() => {
        this.getProListData()
        this.disabled = false
      })
    }
  },
  created() {
    this.getProListData()
    getCategoryAll().then((res) => {
      this.categoryAll = res.data
    })
  }
})
</script>

<style lang="scss" scoped>
.search-content {
  margin-bottom: 10px;
}
:deep .el-input--small .el-input__wrapper {
  padding: 4px 7px;
}
.production-container {
  height: 100%;
  padding: 24px;
  background: #fff;
}
.el-pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
}
</style>

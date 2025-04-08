<template>
  <div class="tableBody">

    <!-- 表单 -->
    <div class="table">
      <el-button @click="resetDateFilter">清除日期过滤器</el-button>
      <el-button @click="clearFilter">清除所有过滤器</el-button>
      <el-table ref="tableRef" row-key="date" :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" sortable width="180" column-key="date" :filters="[
          { text: '2016-05-01', value: '2016-05-01' },
          { text: '2016-05-02', value: '2016-05-02' },
          { text: '2016-05-03', value: '2016-05-03' },
          { text: '2016-05-04', value: '2016-05-04' },
        ]" :filter-method="filterHandler" />
        <el-table-column prop="articleName" label="文章名称" width="180" />
        <el-table-column prop="articleContent" label="文章内容" :formatter="formatterContent" />
        <el-table-column prop="articleAuthor" label="文章作者" :formatter="formatterAuthor" />

        <el-table-column prop="articleGroup" label="文章分类" width="100" :filters="[
          { text: '小说', value: '小说' },
          { text: '趣事', value: '趣事' },
        ]" :filter-method="filterTag" filter-placement="bottom-end">
          <template #default="scope">
            <el-tag :type="scope.row.articleGroup === '小说' ? 'primary' : 'success'" disable-transitions>{{
              scope.row.articleGroup
            }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>


    <!-- 分页 -->
    <div class="demo-pagination-block">
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 20, 50, 100]"
        :size="size" :disabled="disabled" :background="background" layout="prev, pager, next, jumper,->,sizes,total"
        :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>

  </div>
</template>


<script lang="ts" setup>

// 表格
import { ref } from 'vue'
import type { TableColumnCtx, TableInstance } from 'element-plus'
interface User {
  date: string
  id: number
  articleName: string
  articleContent: string
  articleAuthor: string
  articleGroup: string
}

const tableRef = ref<TableInstance>()

const resetDateFilter = () => {
  tableRef.value!.clearFilter(['date'])
}
const clearFilter = () => {
  tableRef.value!.clearFilter()
}
const formatterContent = (row: User, column: TableColumnCtx<User>) => {
  return row.articleContent
}
const formatterAuthor = (row: User, column: TableColumnCtx<User>) => {
  return row.articleAuthor
}
const filterTag = (value: string, row: User) => {
  return row.articleGroup === value
}
const filterHandler = (
  value: string,
  row: User,
  column: TableColumnCtx<User>
) => {
  const property = column['property']
  return row[property] === value
}

const tableData = ref(
  [
    {
      date: '2016-05-03',
      id: 1,
      articleName: 'Tom',
      articleContent: 'hahahahahahahah',
      articleAuthor: '李典',
      articleGroup: '小说'
    },
    {
      articleAuthor: "fghjkl",
      articleContent: "sdfghjklkjhgfdsasdfghklkjhgfdsdfghjklkjhgfdsasdfghjkjhgfd",
      articleGroup: "小说",
      articleName: "fghjk",
      date: null,
      id: 1
    }
  ]
)

// 分页
import type { ComponentSize } from 'element-plus'
import { articleStore } from '@/stores'

const article = articleStore()
const currentPage = ref(1)
const pageSize = ref(5)
const total = ref(50)
const size = ref<ComponentSize>('default')
const background = ref(false)
const disabled = ref(false)

//页面刷新的数据渲染
const render = async (curentPage) => {
  tableData.value = await article.getArticles(curentPage, pageSize.value)
  total.value = article.getTotal()
}
render(currentPage.value)

const handleSizeChange = (val: number) => {
  pageSize.value = val
}
const handleCurrentChange = async (val: number) => {
  tableData.value = await article.getArticles(val, pageSize.value)
  total.value = article.getTotal()
}
</script>


<style scoped>
.tableBody {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
}


.demo-pagination-block {
  width: 800px;
  margin: 0 auto;
  /* margin-left: 100px; */
}

.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>
<template>
  <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
    <el-table-column prop="classify" label="分类" width="180">
    </el-table-column>
    <el-table-column prop="hot" label="热度" width="180">
    </el-table-column>
    <el-table-column prop="count" label="数量">
    </el-table-column>
  </el-table>
</template>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>

<script setup>
import { ref } from 'vue';
import { getArticleCount } from '@/api/article'

const tableData = ref([{
  classify: '趣事',
  hot: 500,
  count: 800,
},
{
  classify: '小说',
  hot: 1,
  count: 1
}
])

const tableRowClassName = ({ row, rowIndex }) => {
  if (rowIndex === 1) {
    return 'warning-row';
  } else if (rowIndex === 3) {
    return 'success-row';
  }
  return '';
}

const render = async () => {
  const data = await getArticleCount()
  tableData.value[0].hot = data.data.data.funnyCount
  tableData.value[0].count = data.data.data.story

  tableData.value[1].hot = data.data.data.funnyCount
  tableData.value[1].count = data.data.data.story

}
render()
</script>
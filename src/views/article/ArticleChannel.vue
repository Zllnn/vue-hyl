<template>
  <el-table v-if="tableData.length>0" :data="tableData" stripe style="width: 100%">
    <el-table-column prop="index" label="序号" width="180" />
    <el-table-column prop="name" label="分类名称" width="180" />
    <el-table-column prop="count" label="文章数量" />
  </el-table>
    <el-empty v-else description="空空如也" />
</template>

<script lang="ts" setup>
const tableData = []
</script>
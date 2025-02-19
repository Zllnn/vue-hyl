<template>
  <el-table v-if="1" :data="tableData" style="width: 100%">
    <el-table-column label="Date" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon><timer /></el-icon>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Name" width="180">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #default>
            <div>name: {{ scope.row.name }}</div>
            <div>address: {{ scope.row.address }}</div>
          </template>
          <template #reference>
            <el-tag>{{ scope.row.name }}</el-tag>
          </template>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="Operations">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
          Edit
        </el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
        >
          Delete
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-empty v-else description="空空如也" />
</template>

<!-- <script lang="ts" setup>
import { getArticle } from '@/api/article';
import { Timer } from '@element-plus/icons-vue'

interface User {
  id:Int16Array
  articleContent: string
  articleName: string
  articleGroup: string
  articleAuthor:string
}

const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}
const getData=async (page,size)=>{
return (await getArticle(page,size)).data.data.rows
}
const tableData:User =getData(1,10)
// const tableData: User[] =getData(1,10)
</script> -->
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { getArticle } from '@/api/article';
import { Timer } from '@element-plus/icons-vue'

interface User {
  id: number
  articleContent: string
  articleName: string
  articleGroup: string
  articleAuthor: string
}

const tableData = ref<User[]>([]); // 使用 ref 存储响应式数据

const handleEdit = (index: number, row: User) => {
  console.log(index, row);
}

const handleDelete = (index: number, row: User) => {
  console.log(index, row);
}

const getData = async (page: number, size: number) => {
  const response = await getArticle(page, size);
  return response.data.data.rows;
}

onMounted(async () => {
  tableData.value = await getData(1, 10); // 在组件挂载时获取数据
});
</script>

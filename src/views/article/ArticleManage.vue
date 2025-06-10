<template>
  <div class="tableBody">

    <!-- 表单 -->
    <div class="table">
      <el-button @click="resetDateFilter">清除日期过滤器</el-button>
      <el-button @click="clearFilter">清除所有过滤器</el-button>
      <el-button style="width: 140px;height:31px" @click="addArticle">
        增加文章
      </el-button>
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
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
              删除
            </el-button>
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
  <!-- dialog -->
  <!-- 增加 -->
  <el-dialog v-model="addArticleDialogControl" title="增加文章" width="1000px" height="1000px">
    <el-form :model="form">
      <el-form-item label="文章名称:" :label-width="labelWidth">
        <el-input v-model="form.articleName" autocomplete="off" />
      </el-form-item>
      <!-- <el-form-item label="文章作者" :label-width="labelWidth">
        <el-input v-model="form.articleAuthor" autocomplete="off" />
      </el-form-item> -->
      <el-form-item label="文章分类:" :label-width="labelWidth">
        <el-select v-model="form.articleGroup" placeholder="请选择文章分类">
          <el-option label="趣事" value="小说" />
          <el-option label="小说" value="趣事" />
        </el-select>
      </el-form-item>
      <el-form-item label="文章内容:" :label-width="labelWidth">
        <el-input type="textarea" v-model="form.articleContent" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="addArticleDialogControl = false">取消</el-button>
        <el-button type="primary" @click="saveArticle">
          保存
        </el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 编辑 -->
  <el-dialog v-model="editDialogControl" title="编辑文章" width="1000px" height="1000px">
    <el-form :model="form">
      <el-form-item label="文章名称:" :label-width="labelWidth">
        <el-input v-model="form.articleName" autocomplete="off" />
      </el-form-item>
      <!-- <el-form-item label="文章作者" :label-width="labelWidth">
        <el-input v-model="form.articleAuthor" autocomplete="off" />
      </el-form-item> -->
      <el-form-item label="文章分类:" :label-width="labelWidth">
        <el-select v-model="form.articleGroup" placeholder="请选择文章分类">
          <el-option label="趣事" value="小说" />
          <el-option label="小说" value="趣事" />
        </el-select>
      </el-form-item>
      <el-form-item label="文章内容:" :label-width="labelWidth">
        <el-input type="textarea" v-model="form.articleContent" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="editDialogControl = false">取消</el-button>
        <el-button @click="saveEditArticle">
          保存
        </el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 删除文章 -->
  <el-dialog v-model="deleteDialogControl" title="提示" width="500" draggable>
    <span>是否要删除该文章？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="deleteDialogControl = false">取消</el-button>
        <el-button @click="saveDeleteArticle">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>


<script lang="ts" setup>

// 表格
import { ref, watch } from 'vue'
import type { TableColumnCtx, TableInstance } from 'element-plus'
interface User {
  date: string
  id: number
  articleName: string
  articleContent: string
  articleAuthor: string
  articleGroup: string
}
//对话框标签长度
const labelWidth = 100 + 'px'
//对话框数据，用于接收用户输入的中间件
const form = ref({
  id: 1,
  articleName: '',
  articleContent: '',
  articleAuthor: '',
  articleGroup: '',
  date: ''
})

//按钮显示隐藏
const tableRef = ref<TableInstance>()
const addArticleDialogControl = ref(false)
const editDialogControl = ref(false)
const deleteDialogControl = ref(false)

//按钮
const handleEdit = (index: number, row: User) => {
  form.value = row
  editDialogControl.value = true
  console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
  form.value = row
  deleteDialogControl.value = true
  console.log(index, row)
}
const addArticle = () => {
  addArticleDialogControl.value = true
  form.value = {
    id: 1,
    articleName: '',
    articleContent: '',
    articleAuthor: '',
    articleGroup: '',
    date: ''
  }
}

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
import { articleStore, userUserStore } from '@/stores'
import { deleteArticle, uploadArticle } from '@/api/article'
import { editArticle } from '@/api/article'
import { userLoginService } from '@/api/user'

const article = articleStore()
const currentPage = ref(1)
const pageSize = ref(20)
const total = ref(50)
const size = ref<ComponentSize>('default')
const background = ref(false)
const disabled = ref(false)

//对pageSize的监听
watch(pageSize, (newValue, oldValue) => {
  render(currentPage.value)
})

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

// 保存文章
const saveArticle = async () => {
  const User = userUserStore()
  // form.value.articleAuthor = (await User.getUserData()).userName
  //为减少请求用另外一个函数
  form.value.articleAuthor = User.getUserData_test().userName
  const result = await uploadArticle(form.value)
  addArticleDialogControl.value = false
  if (result.data.code == 1) {
    ElMessage({
      message: result.data.message,
      grouping: true,
      type: 'success',
    })
  } else {
    ElMessage({
      message: result.data.message,
      grouping: true,
      type: 'error',
    })
  }

  render(currentPage.value)
}
//编辑文章
const saveEditArticle = async () => {
  const result = await editArticle(form.value)
  editDialogControl.value = false
  if (result.data.code == 1) {
    ElMessage({
      message: result.data.message,
      grouping: true,
      type: 'success',
    })
  } else {
    ElMessage({
      message: result.data.message,
      grouping: true,
      type: 'error',
    })
  }
  render(currentPage.value)
}
//删除文章
const saveDeleteArticle = async () => {
  const result = await deleteArticle(form.value.id)
  deleteDialogControl.value = false
  if (result.data.code == 1) {
    ElMessage({
      message: result.data.message,
      grouping: true,
      type: 'success',
    })
  } else {
    ElMessage({
      message: result.data.message,
      grouping: true,
      type: 'error',
    })
  }
  render(currentPage.value)
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
<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { upUserDataService } from '@/api/user';
import { userUserStore } from '@/stores';
import router from '@/router';
const formRef = ref(null)

const { user: { id, userName, loginName, email, code, studentId }, getUserData } = userUserStore()

const form = ref({
  id,
  userName,
  loginName,
  email,
  code,
  studentId
})

const dialogVisible = ref(true)

const rules = ref({
  loginName: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    {
      pattern: /^\S{2,10}/,
      message: '昵称长度在2-10个非空字符',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    {
      type: 'email',
      message: '请输入正确的邮箱格式',
      trigger: ['blur', 'change']
    }
  ],
  code: [
    { required: true, message: '请输入统一认证码', trigger: 'blur' },
    {
      //统一认证码要求
    }
  ],
  studentId: [
    { required: true, message: '请输入学号', trigger: 'blur' },
    {
      //学号要求
    }
  ]
})

const submitForm = async () => {
  dialogVisible.value = false
  await formRef.value.validate()
  // 提交修改
  await upUserDataService(form.value)
  // 通知 user 模块，进行数据的更新， 并获取User数据
  form.value = await getUserData()


  ElMessage.success('修改成功')
  router.back()
}
// const handleClose = (done: () => void) => {
//   ElMessageBox.confirm('是否关闭?')
//     .then(() => {
//       done()
//     })
//     .catch(() => {
//       // catch error
//     })
// }
const handleClose = () => {
  router.back()
}
const handleCancle = () => {
  dialogVisible.value = false
  router.back()
}

</script>
<template>
  <el-dialog v-model="dialogVisible" title="基本资料" width="650" :before-close="handleClose">
    <!-- 表单部分 -->
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" style="max-width: 600px">
      <el-form-item label="登录名称">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="loginName">
        <el-input v-model="form.loginName"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="统一认证码" prop="code">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="学号" prop="studentId">
        <el-input v-model="form.studentId"></el-input>
      </el-form-item>
      <!-- <el-form-item>
        <el-button type="primary" @click="submitForm">提交修改</el-button>
      </el-form-item> -->
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleCancle">取消</el-button>
        <el-button type="primary" @click="submitForm">
          提交
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
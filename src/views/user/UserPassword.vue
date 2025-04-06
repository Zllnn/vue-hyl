<script setup>
import { ref } from 'vue'
import { userUserStore } from '@/stores';

const ruleForm = ref({
  password: '',
  newpassword: '',
  renewpassword: ''
})
const rules = ref({
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    }
  ],
  newpassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    }
  ],
  renewpassword: [
    { required: true, message: '请再输入新密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== ruleForm.value.newpassword) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      }, trigger: 'blur'
    },
  ]
})

//提交修改密码
const submitForm = (newpassword) => {
  const userData = userUserStore()
  if (ruleForm.value.password === userData.getPassword()) {
    const id = userData.getUserData().id
    userData.changePassword(newpassword, id)
    ElMessage.success('密码修改成功')
    resetForm()
  }
  else if (ruleForm.value.password === '') {
    ElMessage.error('密码不能为空')
  }
  else {
    ElMessage.error('旧密码输入错误')
  }
}
//重置表单
const resetForm = () => {
  ruleForm.value = {
    password: '',
    newpassword: '',
    renewpassword: ''
  }
}
</script>

<template>
  <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" status-icon :rules="rules" label-width="auto">
    <el-form-item label="旧密码" prop="password">
      <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item label="新密码" prop="newpassword">
      <el-input v-model="ruleForm.newpassword" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item label="确认新密码" prop="renewpassword">
      <el-input v-model="ruleForm.renewpassword" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleForm.newpassword)">
        提交修改
      </el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

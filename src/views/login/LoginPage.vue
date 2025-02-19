<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import {ref,watch} from 'vue'
import { userRegisterService,userLoginService ,getUserIdByToken} from "@/api/user";
import router from '@/router';
import { userUserStore } from '@/stores';

const isRegister=ref(false)
const form =ref(null)
const userStore = userUserStore()

//表单校验
const validatePass =(rule, value, callback)=>{
  if(value!==fromModel.value.password){
    callback(new Error('两次输入密码不一致'))
  }else{
    callback()
  }
}
const fromModel = ref({
  username:'',
  password:'',
  repassword:''
})
//校验规则
const rules = ref({
  username:[
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max:10, message: '用户名必须是5-10位的字符', trigger: 'blur' },
  ],
  password:[
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern:/^\S{6,15}$/,
      message:'密码必须是6-15位的非空字符',
      trigger:'blur'
    }
  ],
  repassword:[
   { required: true, message: '请再次输入密码', trigger: 'blur' },
   { validator: validatePass, trigger: 'blur' },
  ]
})

//注册
const Regist=async ()=>{
  await form.value.validate()
  
  if((await userRegisterService(fromModel.value)).data.message==='success'){
   ElMessage.success('注册成功')
   isRegister.value=false
  }else{
    ElMessage.error('注册失败，用户名已存在')
  }
}

//登录
const login=async ()=>{
  await form.value.validate()//等待表单验证
  //验证用户是否存在
  // fromModel.value.password==='123456'&&fromModel.value.username==='test111'
  const res= await userLoginService(fromModel.value)
  if(res.data.data){
  ElMessage.success('登录成功')
  userStore.setToken(res.data.data)
  const idData=await getUserIdByToken(fromModel.value.username)
  const id =idData.data.data.id
  userStore.setUserData(id)
  router.push('/')
  }else{
  ElMessage.error('账号或密码错误')
  }
}

watch(isRegister,()=>{
  fromModel.value={
    username:'',
    password:'',
    repassword:''
  }
})
</script>

<template>
    <el-row class="login-page">
      <el-col :span="14" :offset="5" class="form">
        <div class="inner">
         <div class="innerbgc">
          <img src="@/assets/login_back_.jpg" alt="" style= "max-width: 100%; height: auto;">
         </div>
         <div class="innerlogin">
           <!-- 注册相关表单 -->
        <el-form
          :model="fromModel"
          :rules="rules"
          ref="form"
          size="large"
          autocomplete="off"
          v-if="isRegister"
        >
          <el-form-item>
            <h1 style="color: white; margin: 0 auto;">注册</h1>
          </el-form-item>
          <el-form-item prop="username">
            <el-input
              v-model="fromModel.username"
              :prefix-icon="User"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="fromModel.password"
              :prefix-icon="Lock"
              type="password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="repassword">
            <el-input
              v-model="fromModel.repassword"
              :prefix-icon="Lock"
              type="password"
              placeholder="请输入再次密码"
            ></el-input>
          </el-form-item>
          <el-form-item >
            <el-button @click="Regist" class="button" type="primary"  >
              注  册
            </el-button>
          </el-form-item>
          <el-form-item class="flex">
            <el-link type="info" :underline="false" @click="isRegister = false">
              去登录
            </el-link>
          </el-form-item>
        </el-form>

        <!-- 登录相关表单 -->
        <el-form
          :model="fromModel"
          :rules="rules"
          ref="form"
          size="large"
          autocomplete="off"
          v-else
        >
          <el-form-item>
            <h1 style="color: white;margin: 0 auto;">登录</h1>
          </el-form-item>
          <el-form-item prop="username">
            <el-input
              v-model="fromModel.username"
              :prefix-icon="User"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="fromModel.password"
              name="password"
              :prefix-icon="Lock"
              type="password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item class="flex">
            <div class="flex">
              <el-checkbox>记住我</el-checkbox>
              <el-link type="primary" :underline="false">忘记密码？</el-link>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button @click="login" class="button" type="primary" auto-insert-space>
              登录
            </el-button>
          </el-form-item>
          <el-form-item class="flex">
            <el-link type="info"  :underline="false" @click="isRegister = true">
              注册
            </el-link>
          </el-form-item>
        </el-form>
         </div>
        </div>
      </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.1); // 修改背景颜色为半透明的白色
  background-image: url("@/assets/login_back_.jpg");
 .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
   .title {
      margin: 0 auto;
    }
   .button {
      width: 100%;
      border-radius: 20px;
    }
   .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
.inner{
  display: flex;
  justify-content: space-between;
  background-color:black;
  opacity:0.7;
  box-shadow:  10px 10px 15px rgba(0, 0, 0, 1);
}
.innerbgc{
  width: 70%;
  margin: 20px;
}
.innerlogin{
  height: auto;
  width: 30%;
  margin: 20px;
}
</style>